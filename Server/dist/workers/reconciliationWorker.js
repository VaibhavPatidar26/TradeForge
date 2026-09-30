import prisma from "../lib/prisma.js";
import orderQueue from "../queues/orderQueue.js";
import axios from "axios";
// Helper: Check if current time in IST is past market close (3:30 PM IST)
function isMarketClosedNow() {
    const now = new Date();
    // Convert to IST (UTC + 5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const hours = istTime.getUTCHours();
    const minutes = istTime.getUTCMinutes();
    const timeInMinutes = hours * 60 + minutes;
    // 3:30 PM IST = 15:30 = 15 * 60 + 30 = 930 minutes
    return timeInMinutes >= 930;
}
// Helper: Fetch Upstox 1-min intraday candles
async function fetchUpstoxIntradayCandles(instrumentKey) {
    const encodedKey = encodeURIComponent(instrumentKey);
    const url = `https://api.upstox.com/v3/historical-candle/intraday/${encodedKey}/minutes/1`;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.UPSTOX_TOKEN}`,
                Accept: "application/json",
            },
        });
        const candles = response.data?.data?.candles || [];
        // Sort chronologically (oldest -> newest)
        return candles.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
    }
    catch (error) {
        console.error(`[Reconciliation] Failed to fetch candles for ${instrumentKey}:`, error.response?.data || error.message);
        return [];
    }
}
// Helper: Cancel unexecuted order and refund locked balance
async function cancelAndRefundOrder(order, reason) {
    await prisma.$transaction(async (tx) => {
        await tx.order.update({
            where: { id: order.id },
            data: { status: "REJECTED" },
        });
        let refundAmount = 0;
        if (order.side === "BUY" && order.limitPrice) {
            // BUY Limit: refund the full locked amount (limitPrice × qty)
            refundAmount = Number(order.limitPrice) * Number(order.quantity);
        }
        else if (order.side === "SELL") {
            // SELL Limit:
            // - If it was a short sell, `order.total` holds the locked margin
            // - If it was a long exit, NO cash was locked (shares were locked, not cash)
            //   so nothing to refund
            if (order.total && Number(order.total) > 0) {
                refundAmount = Number(order.total);
            }
        }
        if (refundAmount > 0) {
            await tx.user.update({
                where: { id: order.userId },
                data: { balance: { increment: refundAmount } },
            });
        }
    });
    console.log(`[Reconciliation] Cancelled order ${order.id}. Reason: ${reason}`);
}
export async function runStartupReconciliation() {
    console.log("[Reconciliation] Running startup check for pending orders...");
    const openOrders = await prisma.order.findMany({
        where: { status: "OPEN" },
    });
    if (openOrders.length === 0) {
        console.log("[Reconciliation] No OPEN orders found.");
        return;
    }
    const todayStr = new Date().toISOString().split("T")[0];
    const marketClosed = isMarketClosedNow();
    const ordersByStock = new Map();
    // 1. Separate past-day orders (always cancel) from today's orders
    for (const order of openOrders) {
        const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
        if (orderDate !== todayStr) {
            await cancelAndRefundOrder(order, "Order expired from previous trading day");
            continue;
        }
        const list = ordersByStock.get(order.stockId) || [];
        list.push(order);
        ordersByStock.set(order.stockId, list);
    }
    const jobsToEnqueue = [];
    // 2. Process today's open orders stock by stock
    for (const [stockId, orders] of ordersByStock.entries()) {
        const candles = await fetchUpstoxIntradayCandles(stockId);
        for (const order of orders) {
            const orderTime = new Date(order.createdAt).getTime();
            // Only inspect candles AFTER the order was placed
            const validCandles = candles.filter((c) => new Date(c[0]).getTime() >= orderTime);
            let isMatched = false;
            const limitPrice = Number(order.limitPrice);
            for (const candle of validCandles) {
                const high = candle[2];
                const low = candle[3];
                if (order.side === "BUY" && low <= limitPrice) {
                    isMatched = true;
                    break;
                }
                else if (order.side === "SELL" && high >= limitPrice) {
                    isMatched = true;
                    break;
                }
            }
            // =========================================================================
            // DECISION LOGIC
            // =========================================================================
            if (isMatched) {
                // Price was reached after order placement -> EXECUTE IT!
                jobsToEnqueue.push({
                    name: "ExecuteLimitOrder",
                    data: {
                        id: order.id,
                        orderSide: order.side,
                        orderType: order.orderType,
                        quantity: Number(order.quantity),
                        price: limitPrice,
                        limitprice: limitPrice,
                    },
                    opts: {
                        jobId: `exec-${order.id}`, // Deduplication
                    },
                });
            }
            else if (marketClosed) {
                // Market already closed (e.g. 4 PM restart) & price never hit -> CANCEL & REFUND
                await cancelAndRefundOrder(order, "Market closed and target limit price was not reached");
            }
            else {
                // Market is still open -> LEAVE AS OPEN for live ticks
                console.log(`[Reconciliation] Order ${order.id} still pending. Market is open.`);
            }
        }
    }
    // 3. Enqueue all matched executions to BullMQ
    if (jobsToEnqueue.length > 0) {
        await orderQueue.addBulk(jobsToEnqueue);
        console.log(`[Reconciliation] ✅ Enqueued ${jobsToEnqueue.length} missed order execution(s) to BullMQ`);
    }
}
//# sourceMappingURL=reconciliationWorker.js.map