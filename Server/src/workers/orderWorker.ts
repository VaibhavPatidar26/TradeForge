import { Worker, Job } from "bullmq";
import prisma from "../lib/prisma.js";
import { type Order } from "../queues/orderQueue.js";
import redis from "../redis/client.js";

export const orderWorker = new Worker<Order>(
    "OrderExecutionQueue",

    async (job: Job<Order>) => {
        const { id, price, limitprice, quantity } = job.data;
        const orderId = id;
        const execPrice = price || limitprice || 0;

        if (!orderId) return;

        await prisma.$transaction(async (tx) => {
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
                    const shortPrice = Number(existingHolding!.avgPrice);
                    
                    // PnL on short = (Short Price - Buy Back Price) * Qty
                    const pnl = (shortPrice - execPrice) * coverQty;
                    const returnedMarginAndPnl = (shortPrice * coverQty) + pnl;

                    await tx.user.update({
                        where: { id: order.userId },
                        data: { balance: { increment: returnedMarginAndPnl } }
                    });

                    const newHoldingQty = currentHoldingQty + orderQty;
                    if (newHoldingQty === 0) {
                        await tx.holding.delete({ where: { id: existingHolding!.id } });
                    } else if (newHoldingQty > 0) {
                        await tx.holding.update({
                            where: { id: existingHolding!.id },
                            data: { quantity: newHoldingQty, avgPrice: execPrice }
                        });
                    } else {
                        await tx.holding.update({
                            where: { id: existingHolding!.id },
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
                    } else {
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
                const isShortSell = order.total !== null && Number(order.total) > 0;

                // CASE A: Standard Long Exit
                if (!isShortSell && currentQty >= orderQty) {
                    await tx.user.update({
                        where: { id: order.userId },
                        data: { balance: { increment: totalAmount } }
                    });

                    if (currentQty === orderQty) {
                        await tx.holding.delete({ where: { id: holding!.id } });
                    } else {
                        await tx.holding.update({
                            where: { id: holding!.id },
                            data: { quantity: { decrement: orderQty } }
                        });
                    }
                } 
                // CASE B: Short Sell Entry (Margin was locked upfront)
                else {
                    if (holding) {
                        await tx.holding.update({
                            where: { id: holding.id },
                            data: {
                                quantity: { decrement: orderQty },
                                avgPrice: execPrice
                            }
                        });
                    } else {
                        await tx.holding.create({
                            data: {
                                userId: order.userId,
                                stockId: order.stockId,
                                quantity: -orderQty,
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
        });
    },
    {
        connection: redis as any,
        concurrency: 25, // Up to 25 parallel executions without overloading DB pool
    }
);

orderWorker.on("failed", (job, err) => {
    console.error(`[OrderWorker] Job ${job?.id} failed:`, err);
});

export default orderWorker;