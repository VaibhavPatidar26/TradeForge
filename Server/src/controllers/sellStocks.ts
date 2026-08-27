import prisma from "../lib/prisma.js";
import { Request, Response } from "express";
import redis from "../redis/client.js";

async function sellStock(req: Request, res: Response) {
    try {
        const { userId, assetId, quantity } = req.body;

        // . Validate fields
        if (!userId || !assetId || !quantity) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Validate quantity
        const qty = Number(quantity);

        if (!Number.isFinite(qty) || qty <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0",
                success: false
            });
        }

        // Find asset
        const asset = await prisma.asset.findUnique({
            where: {
                id: assetId
            }
        });

        if (!asset) {
            return res.status(404).json({
                message: "Asset not found",
                success: false
            });
        }

        // Get current price from Redis
        const currentPrice = await redis.get(asset.symbol);

        if (!currentPrice) {
            return res.status(400).json({
                message: "Asset is not trading right now",
                success: false
            });
        }

        const price = Number(currentPrice);

        if (!Number.isFinite(price) || price <= 0) {
            return res.status(400).json({
                message: "Invalid market price",
                success: false
            });
        }

        const total = price * qty;

        //Check user exists
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Find holding
        const holding = await prisma.holding.findUnique({
            where: {
                userId_assetId: {
                    userId,
                    assetId
                }
            }
        });

        if (!holding) {
            return res.status(404).json({
                message: "User doesn't hold this asset",
                success: false
            });
        }

        //Check holding quantity
        const oldQuantity = Number(holding.quantity);

        if (oldQuantity < qty) {
            return res.status(400).json({
                message: "Insufficient quantity to sell",
                success: false
            });
        }
        const newQuantity = oldQuantity - qty;
        //Database transaction
        const order = await prisma.$transaction(async (tx) => {

            //Increase user's balance
            await tx.user.update({
                where: {
                    id: userId
                },
                data: {
                    balance: {
                        increment: total
                    }
                }
            });
            // Update or delete holding
            // avgPrice does NOT change when selling
            if (newQuantity === 0) {

                await tx.holding.delete({
                    where: {
                        id: holding.id
                    }
                });

            } else {

                await tx.holding.update({
                    where: {
                        id: holding.id
                    },
                    data: {
                        quantity: newQuantity
                    }
                });

            }
            // Create order
            const newOrder = await tx.order.create({
                data: {
                    side: "SELL",
                    status: "COMPLETED",
                    quantity: qty,
                    executedPrice: price,
                    total: total,
                    userId,
                    assetId
                }
            });
            // Create transaction
            await tx.transaction.create({
                data: {
                    type: "SELL",
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
        //Send response
        return res.status(201).json({
            message: "Stock sold successfully",
            success: true,
            order
        });
    } catch (error) {
        console.error("SELL STOCK ERROR:", error);

        return res.status(500).json({
            message: "Failed to sell stock",
            success: false
        });
    }
}

export default sellStock;