import { Request, Response } from "express";
import prisma from "../../lib/prisma.js";
import redis from "../../redis/client.js";

// ─────────────────────────────────────────────────────────────────────────────
//  BUY LIMIT ORDER
//
//  Flow:
//  1. Validate input.
//  2. Fetch stock & current market price from Redis.
//  3. Check user has enough balance for (limitPrice × quantity).
//  4. Lock (deduct) that amount immediately so the user cannot spend it elsewhere.
//  5a. If market price is already <= limitPrice → execute the order right now.
//  5b. Otherwise → create an OPEN order; the worker executes it later when
//      the market dips to the limit price.
// ─────────────────────────────────────────────────────────────────────────────

async function BuyLimitOrder(req: Request, res: Response) {

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

        // 3️⃣  Get current market price from Redis
        const redisPrice = await redis.get(stock.instrument_key);
        if (!redisPrice) {
            return res.status(503).json({ message: "Live price unavailable" });
        }
        const currentMarketPrice = Number(redisPrice);

        // Amount to lock = limitPrice × qty
        // (user's worst‑case cost at the price they chose)
        const lockedAmount = limitPrice * qty;

        // ─────────────────────────────────────────────────────────────────────
        //  Run everything inside a single Prisma transaction so the
        //  balance deduction and order creation are atomic.
        // ─────────────────────────────────────────────────────────────────────
        const result = await prisma.$transaction(async (tx) => {

            // 4️⃣  Fetch user & verify balance
            const user = await tx.user.findUnique({ where: { id: userId } });
            if (!user) throw new Error("User not found");

            if (Number(user.balance) < lockedAmount) {
                throw new Error("Insufficient balance");
            }

            // 🔒 Lock the balance immediately
            await tx.user.update({
                where: { id: userId },
                data: { balance: { decrement: lockedAmount } }
            });

            // 5a ─ Immediate execution path ───────────────────────────────────
            //  Market price is already at or below the user's limit →
            //  fill right now at the current market price.
            if (currentMarketPrice <= limitPrice) {

                const executedTotal = currentMarketPrice * qty;

                // If market is cheaper than the limit price, refund the difference
                const refund = lockedAmount - executedTotal;

                // Update or create holding
                const holding = await tx.holding.findUnique({
                    where: {
                        userId_stockId: { userId, stockId }
                    }
                });

                if (holding) {
                    const oldQty = Number(holding.quantity);
                    const oldAvg = Number(holding.avgPrice);
                    const newQty = oldQty + qty;
                    const newAvg = (oldQty * oldAvg + qty * currentMarketPrice) / newQty;

                    await tx.holding.update({
                        where: { id: holding.id },
                        data: { quantity: newQty, avgPrice: newAvg }
                    });
                } else {
                    await tx.holding.create({
                        data: {
                            userId,
                            stockId,
                            quantity: qty,
                            avgPrice: currentMarketPrice
                        }
                    });
                }

                // Refund price difference if any
                if (refund > 0) {
                    await tx.user.update({
                        where: { id: userId },
                        data: { balance: { increment: refund } }
                    });
                }

                // Create order record (COMPLETED immediately)
                const newOrder = await tx.order.create({
                    data: {
                        side: "BUY",
                        status: "COMPLETED",
                        orderType: "LIMIT",
                        quantity: qty,
                        limitPrice,
                        executedPrice: currentMarketPrice,
                        total: executedTotal,
                        userId,
                        stockId
                    }
                });

                // Create transaction record
                await tx.transaction.create({
                    data: {
                        type: "BUY",
                        quantity: qty,
                        price: currentMarketPrice,
                        total: executedTotal,
                        userId,
                        stockId,
                        orderId: newOrder.id
                    }
                });

                return { order: newOrder, immediate: true };
            }

            // 5b ─ Deferred execution path ─────────────────────────────────────
            //  Market price is above the limit → place the order as OPEN.
            //  The limit order worker will execute it when the price dips.
            const newOrder = await tx.order.create({
                data: {
                    side: "BUY",
                    status: "OPEN",
                    orderType: "LIMIT",
                    quantity: qty,
                    limitPrice,
                    userId,
                    stockId
                }
            });

            return { order: newOrder, immediate: false };
        });

        if (result.immediate) {
            return res.status(201).json({
                message: "Buy limit order executed immediately",
                order: result.order
            });
        }

        return res.status(201).json({
            message: `Buy limit order placed. Will execute when price reaches ₹${limitPrice}`,
            order: result.order
        });

    } catch (error: any) {
        console.error("[BuyLimitOrder] Error:", error);
        return res.status(400).json({
            message: error.message || "Failed to place buy limit order"
        });
    }
}

export default BuyLimitOrder;  