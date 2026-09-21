import { Request, Response } from "express";
import prisma from "../../lib/prisma.js";


// Returns all orders placed by the user today (midnight to now)
export async function getTodayOrders(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const orders = await prisma.order.findMany({
            where: {
                userId,
                createdAt: { gte: startOfDay }
            },
            include: {
                stock: {
                    select: {
                        name: true,
                        trading_symbol: true,
                        exchange: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        return res.status(200).json({ orders });

    } catch (error) {
        console.error("[getTodayOrders] Error:", error);
        return res.status(500).json({ message: "Failed to fetch today's orders" });
    }
}
