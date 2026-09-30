import prisma from "../../lib/prisma.js";
import redis from "../../redis/client.js";
async function sellStock(req, res) {
    try {
        const userId = req.userId || req.body.userId;
        const { stockId, quantity } = req.body;
        // . Validate fields
        if (!userId || !stockId || !quantity) {
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
        const stock = await prisma.stocks.findUnique({
            where: {
                instrument_key: stockId
            }
        });
        if (!stock) {
            return res.status(404).json({
                message: "Asset not found",
                success: false
            });
        }
        // Get current price from Redis
        const currentPrice = await redis.get(stock.instrument_key);
        if (!currentPrice) {
            return res.status(400).json({
                message: "Asset is not trading right now",
                success: false
            });
        }
        // 
        const price = Number(currentPrice);
        if (!Number.isFinite(price) || price <= 0) {
            return res.status(400).json({
                message: "Invalid market price",
                success: false
            });
        }
        const total = price * qty;
        const order = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                throw new Error("User not found");
            }
            // Find holdings inside transaction
            const holding = await tx.holding.findUnique({
                where: {
                    userId_stockId: {
                        userId,
                        stockId
                    }
                }
            });
            const currentQty = holding ? Number(holding.quantity) : 0;
            // =========================================================
            // SCENARIO 1: LONG EXIT (User already owns positive shares)
            // =========================================================
            if (currentQty > 0) {
                const longExitQty = Math.min(currentQty, qty);
                const excessShortQty = qty - longExitQty;
                const exitProceeds = longExitQty * price;
                // 1. Credit proceeds for selling owned long shares
                await tx.user.update({
                    where: { id: userId },
                    data: { balance: { increment: exitProceeds } }
                });
                // 2. If selling more than owned, lock margin for the excess short portion
                if (excessShortQty > 0) {
                    const shortMargin = excessShortQty * price;
                    const availableBal = Number(user.balance) + exitProceeds;
                    if (availableBal < shortMargin) {
                        throw new Error(`Insufficient balance for short selling margin of excess ${excessShortQty} shares. Required: ₹${shortMargin}`);
                    }
                    await tx.user.update({
                        where: { id: userId },
                        data: { balance: { decrement: shortMargin } }
                    });
                }
                // 3. Update or delete holding
                const newQuantity = currentQty - qty;
                if (newQuantity === 0) {
                    await tx.holding.delete({ where: { id: holding.id } });
                }
                else if (newQuantity < 0) {
                    // Flips from long to short
                    await tx.holding.update({
                        where: { id: holding.id },
                        data: { quantity: newQuantity, avgPrice: price }
                    });
                }
                else {
                    // Still long, just reduced
                    await tx.holding.update({
                        where: { id: holding.id },
                        data: { quantity: newQuantity }
                    });
                }
            }
            // =========================================================
            // SCENARIO 2: SHORT SELLING (User owns 0 or already short)
            // =========================================================
            else {
                const requiredMargin = total;
                if (Number(user.balance) < requiredMargin) {
                    throw new Error(`Insufficient balance for short selling margin. Required: ₹${requiredMargin}`);
                }
                // Lock margin from balance
                await tx.user.update({
                    where: { id: userId },
                    data: { balance: { decrement: requiredMargin } }
                });
                // Update or create holding with negative quantity
                if (holding) {
                    const oldAbsQty = Math.abs(currentQty);
                    const oldAvgPrice = Number(holding.avgPrice);
                    const newAbsQty = oldAbsQty + qty;
                    const newAvgPrice = ((oldAbsQty * oldAvgPrice) + (qty * price)) / newAbsQty;
                    await tx.holding.update({
                        where: { id: holding.id },
                        data: {
                            quantity: -newAbsQty,
                            avgPrice: newAvgPrice
                        }
                    });
                }
                else {
                    await tx.holding.create({
                        data: {
                            userId,
                            stockId,
                            quantity: -qty,
                            avgPrice: price
                        }
                    });
                }
            }
            // Create order
            const newOrder = await tx.order.create({
                data: {
                    side: "SELL",
                    status: "COMPLETED",
                    orderType: "MARKET",
                    quantity: qty,
                    executedPrice: price,
                    total: total,
                    userId,
                    stockId
                }
            });
            // Create transaction audit
            await tx.transaction.create({
                data: {
                    type: "SELL",
                    quantity: qty,
                    price: price,
                    total: total,
                    userId,
                    stockId,
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
    }
    catch (error) {
        console.error("SELL STOCK ERROR:", error);
        return res.status(500).json({
            message: "Failed to sell stock",
            success: false
        });
    }
}
export default sellStock;
//# sourceMappingURL=sellMarketStocks.js.map