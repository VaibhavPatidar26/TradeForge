import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import redis from "../redis/client.js";

export async function buyAsset(req: Request, res: Response) {
    try {
        const { userId, assetId, quantity } = req.body;

        // 1. Validate input
        if (!userId || !assetId || !quantity) {
            return res.status(400).json({
                message: "userId, assetId and quantity are required"
            });
        }

        if (Number(quantity) <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }

        // 2. Find the asset
        const asset = await prisma.asset.findUnique({
            where: {
                id: assetId
            }
        });

        if (!asset) {
            return res.status(404).json({
                message: "Asset not found"
            });
        }

        // 3. Get latest price from Redis
        // asset.symbol = Upstox instrument key
        const redisPrice = await redis.get(asset.symbol);

        if (!redisPrice) {
            return res.status(400).json({
                message: "Live price is currently unavailable"
            });
        }

        const price = Number(redisPrice);
        const qty = Number(quantity);
        const total = price * qty;

        // 4. Perform all database changes atomically
        const order = await prisma.$transaction(async (tx) => {

            // Find user
            const user = await tx.user.findUnique({
                where: {
                    id: userId
                }
            });

            if (!user) {
                throw new Error("User not found");
            }

            // 5. Check balance
            if (Number(user.balance) < total) {
                throw new Error("Insufficient balance");
            }

            // 6. Deduct money
            await tx.user.update({
                where: {
                    id: userId
                },
                data: {
                    balance: {
                        decrement: total
                    }
                }
            });

            // 7. Check existing holding
            const holding = await tx.holding.findUnique({
                where: {
                    userId_assetId: {
                        userId,
                        assetId
                    }
                }
            });

            if (holding) {

                // Existing holding
                const oldQuantity = Number(holding.quantity);
                const oldAvgPrice = Number(holding.avgPrice);

                const newQuantity = oldQuantity + qty;

                // Weighted average price
                const newAvgPrice =
                    (
                        oldQuantity * oldAvgPrice +
                        qty * price
                    ) / newQuantity;

                await tx.holding.update({
                    where: {
                        id: holding.id
                    },
                    data: {
                        quantity: newQuantity,
                        avgPrice: newAvgPrice
                    }
                });

            } else {

                // First time buying this asset
                await tx.holding.create({
                    data: {
                        userId,
                        assetId,
                        quantity: qty,
                        avgPrice: price
                    }
                });
            }

            // 8. Create order
            const newOrder = await tx.order.create({
                data: {
                    side: "BUY",
                    status: "COMPLETED",
                    quantity: qty,
                    executedPrice: price,
                    total: total,
                    userId,
                    assetId
                }
            });

            // 9. Create transaction
            await tx.transaction.create({
                data: {
                    type: "BUY",
                    quantity: qty,
                    price: price,
                    total: total,
                    userId,
                    assetId,
                    orderId: newOrder.id
                }
            });

            return newOrder;
        });

        // 10. Send response
        return res.status(201).json({
            message: "Buy order completed successfully",
            order
        });

    } catch (error: any) {

        console.error("BUY ERROR:", error);

        return res.status(400).json({
            message: error.message || "Failed to execute buy order"
        });
    }
}