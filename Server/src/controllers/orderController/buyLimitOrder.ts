import { Request, Response } from "express";
import prisma from "../../lib/prisma.js";
import redis from "../../redis/client.js";


async function BuyLimitOrder(req: Request, res: Response) {

    const { stockId, quantity, userRequiredPrice } = req.body;
    const userId = req.userId;

    if (!stockId || !quantity || !userId || !userRequiredPrice) {
        return res.status(400).json({
            message: "Stock ID, quantity and required price are required"
        });
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const currentStock = await prisma.stocks.findUnique({
            where: {
                instrument_key: stockId
            }
        });

        if (!currentStock) {
            return res.status(404).json({
                message: "Stock not found"
            });
        }

        const currentPrice = Number(
            await redis.get(currentStock.instrument_key)
        );

        if (!currentPrice) {
            return res.status(503).json({
                message: "Current price unavailable"
            });
        }

        /*
            BUY LIMIT ORDER

            If current price is less than or equal to
            user's required price, the order can execute immediately.

            Example:

            Current Price = 350
            Required Price = 370

            350 <= 370
            -> Execute
        */

        if (userRequiredPrice >= currentPrice) {

            const totalAmountNeeded =
                currentPrice * Number(quantity);

            if (Number(user.balance) < totalAmountNeeded) {
                return res.status(400).json({
                    message: "Insufficient balance"
                });
            }

            await prisma.$transaction(async function (tx) {

                const holding = await tx.holding.findUnique({
                    where: {
                        userId_stockId: {
                            userId: userId,
                            stockId: stockId
                        }
                    }
                });

                if (!holding) {

                    await tx.holding.create({
                        data: {
                            userId: userId,
                            stockId: stockId,
                            quantity: quantity,
                            avgPrice: currentPrice
                        }
                    });

                } else {

                    const oldQuantity = Number(holding.quantity);
                    const oldAvgPrice = Number(holding.avgPrice);

                    const newQuantity =
                        oldQuantity + Number(quantity);

                    const newAvgPrice =
                        (
                            oldQuantity * oldAvgPrice +
                            Number(quantity) * currentPrice
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
                }

                await tx.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        balance: {
                            decrement: totalAmountNeeded
                        }
                    }
                });

                await tx.order.create({
                    data: {
                        userId: userId,
                        stockId: stockId,
                        quantity: quantity,
                        orderType: "LIMIT",
                        side: "BUY",
                        status: "COMPLETED",
                        limitPrice: userRequiredPrice,
                        executedPrice: currentPrice,
                        total:totalAmountNeeded
                    }
                });

            });

            return res.status(201).json({
                message: "Buy limit order executed successfully"
            });

        } else {

            /*
                Current price is greater than user's required price.

                Example:

                Current Price = 350
                Required Price = 330

                330 >= 350 -> false

                Therefore the order should remain OPEN
                until the market price reaches 330.
            */

            const order = await prisma.order.create({
                data: {
                    userId: userId,
                    stockId: stockId,
                    quantity: quantity,
                    orderType: "LIMIT",
                    side: "BUY",
                    status: "OPEN",
                    limitPrice: userRequiredPrice
                }
            });

            return res.status(201).json({
                message: "Buy limit order placed successfully",
                order: order
            });
        }

    } catch (error) {

        console.log("error while buy limit order:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export default BuyLimitOrder;