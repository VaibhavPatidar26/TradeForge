import { Request, Response } from "express";
import prisma from "../../lib/prisma.js";
import redis from "../../redis/client.js";

// ─────────────────────────────────────────────────────────────────────────────
//  SELL LIMIT ORDER
//
//  Flow:
//  1. Validate input.
//  2. Verify the user holds enough shares.
//  3. Get current market price from Redis.
//  4a. If market price is already >= limitPrice → execute immediately.
//  4b. Otherwise → place as OPEN; the worker executes when price rises.
//
//  Note on share‑locking:
//  The holding record is NOT reduced at order creation time.  Instead, the
//  worker (and the immediate‑execution path) both call tx.holding.update /
//  delete inside a transaction — preventing any concurrent sell from using
//  the same shares because the transaction is serialized at the DB level.
//  If you want hard share‑locking (like balance locking on BUY), add a
//  "reservedQuantity" column to Holding in schema.prisma and increment it
//  here; decrement it on execution or cancellation.
// ─────────────────────────────────────────────────────────────────────────────

async function sellLimitOrder(req: Request, res: Response) {

    const { stockId, quantity, userRequiredPrice } = req.body;
    const userId = req.userId;

    // 1️⃣  Basic validation
    if (!stockId || !quantity || !userId || !userRequiredPrice) {
        return res.status(400).json({
            message: "stockId, quantity and userRequiredPrice are required"
        });
    }

    const qty = Number(quantity);
    const limitPrice = Number(userRequiredPrice);

    if (qty <= 0 || limitPrice <= 0) {
        return res.status(400).json({
            message: "quantity and userRequiredPrice must be positive numbers"
        });
    }

    try {

        // 2️⃣  Make sure the stock exists
        const stock = await prisma.stocks.findUnique({
            where: { instrument_key: stockId }
        });

        if (!stock) {
            return res.status(404).json({ message: "Stock not found" });
        }

        // 3️⃣  Check user holdings and determine if this is a short sell
        const holding = await prisma.holding.findUnique({
            where: {
                userId_stockId: { userId, stockId }
            }
        });

        const currentQty = holding ? Number(holding.quantity) : 0;
        const isShortSell = currentQty < qty;
        const requiredMargin = limitPrice * qty;

        // 4️⃣  Get current market price from Redis
        const redisPrice = await redis.get(stock.instrument_key);
        if (!redisPrice) {
            return res.status(503).json({ message: "Live price unavailable" });
        }
        const currentMarketPrice = Number(redisPrice);

        const result = await prisma.$transaction(async (tx) => {
            // Verify margin if short selling
            if (isShortSell) {
                const user = await tx.user.findUnique({ where: { id: userId } });
                if (!user || Number(user.balance) < requiredMargin) {
                    throw new Error(`Insufficient balance for short selling margin. Required: ₹${requiredMargin}`);
                }

                // Lock margin upfront
                await tx.user.update({
                    where: { id: userId },
                    data: { balance: { decrement: requiredMargin } }
                });
            }

            // 4a ─ Immediate execution path ───────────────────────────────────
            if (currentMarketPrice >= limitPrice) {
                const proceeds = currentMarketPrice * qty;

                if (!isShortSell) {
                    // Long Exit: credit proceeds and reduce holding
                    const freshHolding = await tx.holding.findUnique({
                        where: { userId_stockId: { userId, stockId } }
                    });

                    if (!freshHolding || Number(freshHolding.quantity) < qty) {
                        throw new Error("Insufficient shares (race condition)");
                    }

                    const newQty = Number(freshHolding.quantity) - qty;
                    if (newQty === 0) {
                        await tx.holding.delete({ where: { id: freshHolding.id } });
                    } else {
                        await tx.holding.update({
                            where: { id: freshHolding.id },
                            data: { quantity: newQty }
                        });
                    }

                    await tx.user.update({
                        where: { id: userId },
                        data: { balance: { increment: proceeds } }
                    });
                } else {
                    // Short Sell Entry immediate execution: set negative holding
                    const freshHolding = await tx.holding.findUnique({
                        where: { userId_stockId: { userId, stockId } }
                    });

                    if (freshHolding) {
                        await tx.holding.update({
                            where: { id: freshHolding.id },
                            data: {
                                quantity: { decrement: qty },
                                avgPrice: currentMarketPrice
                            }
                        });
                    } else {
                        await tx.holding.create({
                            data: {
                                userId,
                                stockId,
                                quantity: -qty,
                                avgPrice: currentMarketPrice
                            }
                        });
                    }
                }

                // Create order (COMPLETED)
                const newOrder = await tx.order.create({
                    data: {
                        side: "SELL",
                        status: "COMPLETED",
                        orderType: "LIMIT",
                        quantity: qty,
                        limitPrice,
                        executedPrice: currentMarketPrice,
                        total: proceeds,
                        userId,
                        stockId
                    }
                });

                await tx.transaction.create({
                    data: {
                        type: "SELL",
                        quantity: qty,
                        price: currentMarketPrice,
                        total: proceeds,
                        userId,
                        stockId,
                        orderId: newOrder.id
                    }
                });

                return { order: newOrder, immediate: true };
            }

            // 4b ─ Deferred execution path ─────────────────────────────────────
            const newOrder = await tx.order.create({
                data: {
                    side: "SELL",
                    status: "OPEN",
                    orderType: "LIMIT",
                    quantity: qty,
                    limitPrice,
                    total: isShortSell ? requiredMargin : null, // Record locked margin if short
                    userId,
                    stockId
                }
            });

            return { order: newOrder, immediate: false };
        });

        if (result.immediate) {
            return res.status(201).json({
                message: "Sell limit order executed immediately",
                order: result.order
            });
        }

        return res.status(201).json({
            message: `Sell limit order placed. Will execute when price reaches ₹${limitPrice}`,
            order: result.order
        });

    } catch (error: any) {
        console.error("[SellLimitOrder] Error:", error);
        return res.status(400).json({
            message: error.message || "Failed to place sell limit order"
        });
    }
}

export default sellLimitOrder;
