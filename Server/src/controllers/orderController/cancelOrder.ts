import { Request, Response } from "express";
import prisma from "../../lib/prisma.js";

export async function cancelOrder(req: Request, res: Response) {
    try {
        const orderId = req.params.orderId as string;
        const userId = req.userId; // From isLoggedIn middleware

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

       
        if (order.userId !== userId) {
            return res.status(403).json({ message: "You cannot cancel someone else's order" });
        }

       
        if (order.status !== "OPEN" && order.status !== "PENDING") {
            return res.status(400).json({ 
                message: `Order cannot be cancelled. Current status is ${order.status}` 
            });
        }

        
        const result = await prisma.$transaction(async (tx) => {
            //Mark order as REJECTED (or CANCELLED)
            const updatedOrder = await tx.order.update({
                where: { id: orderId },
                data: {
                    status: "REJECTED" //"REJECTED" matching schema 
                }
            });

            let refundAmount = 0;

            // 1. If BUY limit order, refund the locked limitPrice * quantity
            if (order.side === "BUY" && order.limitPrice) {
                refundAmount = Number(order.limitPrice) * Number(order.quantity);
            }
            // 2. If Short SELL limit order with locked margin (recorded in order.total), refund that margin
            else if (order.side === "SELL" && order.total && Number(order.total) > 0) {
                refundAmount = Number(order.total);
            }

            if (refundAmount > 0) {
                await tx.user.update({
                    where: { id: userId },
                    data: {
                        balance: {
                            increment: refundAmount
                        }
                    }
                });
            }

            return { updatedOrder, refundAmount };
        });

        return res.status(200).json({
            message: result.refundAmount > 0
                ? `Order cancelled. ₹${result.refundAmount.toLocaleString("en-IN")} refunded to your balance.`
                : "Order cancelled successfully.",
            order: result.updatedOrder
        });

    } catch (error: any) {
        console.error("Cancel order error:", error);
        return res.status(500).json({ message: error.message || "Failed to cancel order" });
    }
}