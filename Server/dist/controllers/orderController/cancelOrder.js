import prisma from "../../lib/prisma.js";
export async function cancelOrder(req, res) {
    try {
        const orderId = req.params.orderId;
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
            //If BUY limit order, refund the locked amn limitPrice * quantity
            if (order.side === "BUY" && order.limitPrice) {
                refundAmount = Number(order.limitPrice) * Number(order.quantity);
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
            }
            return { updatedOrder, refundAmount };
        });
        return res.status(200).json({
            message: result.refundAmount > 0
                ? `Order cancelled. ₹${result.refundAmount.toLocaleString("en-IN")} refunded to your balance.`
                : "Order cancelled successfully.",
            order: result.updatedOrder
        });
    }
    catch (error) {
        console.error("Cancel order error:", error);
        return res.status(500).json({ message: error.message || "Failed to cancel order" });
    }
}
//# sourceMappingURL=cancelOrder.js.map