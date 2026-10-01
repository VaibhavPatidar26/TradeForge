import { Worker } from "bullmq";
import prisma from "../lib/prisma.js";
import { redisConnection } from "../redis/client.js";
import { broadcastExecution } from "../websockets/sendToFront.js";
export const orderWorker = new Worker("OrderExecutionQueue", async (job) => {
    const { id, price, limitprice, quantity } = job.data;
    const orderId = id;
    const execPrice = price || limitprice || 0;
    if (!orderId)
        return;
    const executedOrder = await prisma.$transaction(async (tx) => {
        // 1. IDEMPOTENCY CHECK: Fetch order and verify it is still OPEN
        const order = await tx.order.findUnique({
            where: { id: orderId }
        });
        if (!order || order.status !== "OPEN") {
            // Order was already executed or cancelled by user — skip cleanly!
            return;
        }
        const orderQty = Number(order.quantity || quantity);
        const totalAmount = execPrice * orderQty;
        // =========================================================================
        // 1. BUY LIMIT ORDER EXECUTION (Long Purchase OR Short Cover)
        // =========================================================================
        if (order.side === "BUY") {
            const lockedPrice = Number(order.limitPrice || execPrice);
            const lockedAmount = lockedPrice * orderQty;
            const refund = lockedAmount - totalAmount;
            // Refund difference if filled cheaper
            if (refund > 0) {
                await tx.user.update({
                    where: { id: order.userId },
                    data: { balance: { increment: refund } }
                });
            }
            const existingHolding = await tx.holding.findUnique({
                where: {
                    userId_stockId: {
                        userId: order.userId,
                        stockId: order.stockId
                    }
                }
            });
            const currentHoldingQty = existingHolding ? Number(existingHolding.quantity) : 0;
            // CASE A: Covering an existing Short Position (currentHoldingQty < 0)
            if (currentHoldingQty < 0) {
                const shortQty = Math.abs(currentHoldingQty);
                const coverQty = Math.min(shortQty, orderQty);
                const remainingLongQty = orderQty - coverQty;
                const shortPrice = Number(existingHolding.avgPrice);
                // PnL on short = (Short Price - Buy Back Price) * Qty
                const pnl = (shortPrice - execPrice) * coverQty;
                const returnedMarginAndPnl = (shortPrice * coverQty) + pnl;
                await tx.user.update({
                    where: { id: order.userId },
                    data: { balance: { increment: returnedMarginAndPnl } }
                });
                // If buying more than short qty, deduct for extra long portion
                if (remainingLongQty > 0) {
                    const extraLongCost = remainingLongQty * execPrice;
                    await tx.user.update({
                        where: { id: order.userId },
                        data: { balance: { decrement: extraLongCost } }
                    });
                }
                const newHoldingQty = currentHoldingQty + orderQty;
                if (newHoldingQty === 0) {
                    await tx.holding.delete({ where: { id: existingHolding.id } });
                }
                else if (newHoldingQty > 0) {
                    await tx.holding.update({
                        where: { id: existingHolding.id },
                        data: { quantity: newHoldingQty, avgPrice: execPrice }
                    });
                }
                else {
                    await tx.holding.update({
                        where: { id: existingHolding.id },
                        data: { quantity: newHoldingQty }
                    });
                }
            }
            // CASE B: Standard Long Purchase (currentHoldingQty >= 0)
            else {
                if (existingHolding) {
                    const oldQty = Number(existingHolding.quantity);
                    const oldAvg = Number(existingHolding.avgPrice);
                    const newQty = oldQty + orderQty;
                    const newAvgPrice = ((oldAvg * oldQty) + totalAmount) / newQty;
                    await tx.holding.update({
                        where: { id: existingHolding.id },
                        data: {
                            quantity: newQty,
                            avgPrice: newAvgPrice
                        }
                    });
                }
                else {
                    await tx.holding.create({
                        data: {
                            userId: order.userId,
                            stockId: order.stockId,
                            quantity: orderQty,
                            avgPrice: execPrice
                        }
                    });
                }
            }
        }
        // =========================================================================
        // 2. SELL LIMIT ORDER EXECUTION (Long Exit OR Short Sell Entry)
        // =========================================================================
        if (order.side === "SELL") {
            const holding = await tx.holding.findUnique({
                where: {
                    userId_stockId: {
                        userId: order.userId,
                        stockId: order.stockId
                    }
                }
            });
            const currentQty = holding ? Number(holding.quantity) : 0;
            // Determine how much of this order is a long exit vs short entry
            const longExitQty = currentQty > 0 ? Math.min(currentQty, orderQty) : 0;
            const excessShortQty = orderQty - longExitQty;
            // CASE A: Has long shares to sell — credit proceeds
            if (longExitQty > 0) {
                const exitProceeds = longExitQty * execPrice;
                await tx.user.update({
                    where: { id: order.userId },
                    data: { balance: { increment: exitProceeds } }
                });
            }
            // Update holding after long exit portion
            const newQty = currentQty - orderQty;
            if (newQty === 0) {
                if (holding) {
                    await tx.holding.delete({ where: { id: holding.id } });
                }
            }
            else if (newQty > 0) {
                // Still long, just reduced
                await tx.holding.update({
                    where: { id: holding.id },
                    data: { quantity: newQty }
                });
            }
            else {
                // Flips into short (or deepens existing short).
                // Margin for the short portion was already locked at order creation time.
                if (holding) {
                    const prevAbsQty = currentQty < 0 ? Math.abs(currentQty) : 0;
                    const prevAvg = currentQty < 0 ? Number(holding.avgPrice) : execPrice;
                    const newAbsQty = Math.abs(newQty);
                    const newAvg = prevAbsQty > 0
                        ? ((prevAbsQty * prevAvg) + (excessShortQty * execPrice)) / newAbsQty
                        : execPrice;
                    await tx.holding.update({
                        where: { id: holding.id },
                        data: { quantity: newQty, avgPrice: newAvg }
                    });
                }
                else {
                    // Net new short position (no previous holding)
                    await tx.holding.create({
                        data: {
                            userId: order.userId,
                            stockId: order.stockId,
                            quantity: newQty,
                            avgPrice: execPrice
                        }
                    });
                }
            }
        }
        // =========================================================================
        // 3. ATOMICALLY UPDATE ORDER TO COMPLETED
        // =========================================================================
        await tx.order.update({
            where: { id: orderId },
            data: {
                status: "COMPLETED",
                executedPrice: execPrice,
                total: totalAmount
            }
        });
        // =========================================================================
        // 4. CREATE TRANSACTION AUDIT RECORD
        // =========================================================================
        await tx.transaction.create({
            data: {
                userId: order.userId,
                stockId: order.stockId,
                orderId: order.id,
                type: order.side,
                quantity: orderQty,
                price: execPrice,
                total: totalAmount
            }
        });
        console.log(`[OrderWorker] ✅ Executed limit order: ${order.side} ${order.id} @ ₹${execPrice}`);
        return {
            userId: order.userId,
            side: order.side,
            stockId: order.stockId,
            quantity: orderQty,
            price: execPrice,
            orderId: order.id
        };
    });
    if (executedOrder) {
        broadcastExecution(executedOrder.userId, {
            side: executedOrder.side,
            stockId: executedOrder.stockId,
            quantity: executedOrder.quantity,
            price: executedOrder.price,
            orderId: executedOrder.orderId
        });
    }
}, {
    connection: redisConnection,
    concurrency: 25, // Up to 25 parallel executions without overloading DB pool
});
orderWorker.on("failed", (job, err) => {
    console.error(`[OrderWorker] Job ${job?.id} failed:`, err);
});
export default orderWorker;
//# sourceMappingURL=orderWorker.js.map