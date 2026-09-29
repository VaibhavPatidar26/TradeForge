import prisma from "../lib/prisma.js";
import orderQueue from "../queues/orderQueue.js";

export async function checkAndQueueLimitOrders(instrumentKey: string, currentPrice: number) {
    // 1. Find BUY Limit Orders (limitPrice >= currentPrice)
    const openBuyOrders = await prisma.order.findMany({
        where: {
            stockId: instrumentKey,
            side: "BUY",
            status: "OPEN",
            orderType: "LIMIT",
            limitPrice: { gte: currentPrice }
        }
    });

    for (const order of openBuyOrders) {
        await orderQueue.add(
            "ExecuteLimitOrder",
            {
                id: order.id,
                orderSide: "BUY",
                orderType: "LIMIT",
                quantity: Number(order.quantity),
                price: currentPrice,
                limitprice: Number(order.limitPrice),
            },
            {
                jobId: `exec-${order.id}` // Deduplication: won't add twice
            }
        );
    }

    // 2. Find SELL Limit Orders (limitPrice <= currentPrice)
    const openSellOrders = await prisma.order.findMany({
        where: {
            stockId: instrumentKey,
            side: "SELL",
            status: "OPEN",
            orderType: "LIMIT",
            limitPrice: { lte: currentPrice }
        }
    });

    for (const order of openSellOrders) {
        await orderQueue.add(
            "ExecuteLimitOrder",
            {
                id: order.id,
                orderSide: "SELL",
                orderType: "LIMIT",
                quantity: Number(order.quantity),
                price: currentPrice,
                limitprice: Number(order.limitPrice),
            },
            {
                jobId: `exec-${order.id}`
            }
        );
    }
}