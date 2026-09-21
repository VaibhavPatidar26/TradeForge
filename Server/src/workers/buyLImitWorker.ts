import prisma from "../lib/prisma.js";
import redis from "../redis/client.js";
import { broadcastExecution } from "../websockets/sendToFront.js";

// ─────────────────────────────────────────────────────────────────────────────
//  LIMIT ORDER WORKER
//
//  Problem this file solves:
//  Upstox sends price ticks multiple times per second per stock.
//  Without any guard, every tick = 2 DB queries (BUY + SELL findMany).
//  With 50 stocks at 5 ticks/sec that is 500 DB queries/sec — most of
//  them returning 0 rows and doing nothing useful.
//
//  Two optimisations applied here:
//
//  1. PER-INSTRUMENT LOCK  (processingLock)
//     If we are already executing orders for RELIANCE when the next tick
//     arrives for RELIANCE, skip that tick entirely.
//     Prevents overlapping / duplicate DB queries for the same instrument.
//
//  2. PRICE-MOVE GATE  (lastCheckedPrice)
//     We remember the last price at which we actually queried the DB for
//     each instrument.  A new tick only triggers a DB query if the price
//     moved by more than PRICE_CHANGE_THRESHOLD (0.05% by default).
//     Tiny micro-fluctuations that cannot possibly flip a limit-order
//     condition are ignored completely.
// ─────────────────────────────────────────────────────────────────────────────

// ── Tuneable constant ─────────────────────────────────────────────────────────
// Minimum percentage move required before we bother hitting the DB.
// 0.05 % = price must move at least ₹1.25 on a ₹2500 stock.
const PRICE_CHANGE_THRESHOLD = 0.0005; // 0.05 %

// ── In-memory state (per instrument) ─────────────────────────────────────────
// processingLock : true while DB queries/execution are running for that symbol.
// lastCheckedPrice : the price at which we last queried the DB.
const processingLock = new Map<string, boolean>();
const lastCheckedPrice = new Map<string, number>();

// ─────────────────────────────────────────────────────────────────────────────
//  SUBSCRIBER SETUP
// ─────────────────────────────────────────────────────────────────────────────
const subscriber = redis.duplicate();

async function startWorker() {
    await subscriber.connect();

    await subscriber.subscribe("limit_price_update", async (msg) => {
        try {
            const data = JSON.parse(msg);
            const instrumentKey: string = data.instrumentKey;
            const currentPrice: number = Number(data.price);

            if (!instrumentKey || isNaN(currentPrice)) {
                console.warn("[LimitWorker] Invalid message:", msg);
                return;
            }

            // ── GUARD 1: per-instrument lock ──────────────────────────────────
            // If we are already processing this instrument, skip this tick.
            if (processingLock.get(instrumentKey)) {
                return; // silently drop — next tick will pick it up
            }

            // ── GUARD 2: price-move gate ──────────────────────────────────────
            // Only query the DB if price moved enough to potentially cross a limit.
            const lastPrice = lastCheckedPrice.get(instrumentKey);
            if (lastPrice !== undefined) {
                const priceMoveRatio = Math.abs(currentPrice - lastPrice) / lastPrice;
                if (priceMoveRatio < PRICE_CHANGE_THRESHOLD) {
                    return; // price barely moved — skip DB entirely
                }
            }

            // ── Both guards passed → query DB ─────────────────────────────────
            processingLock.set(instrumentKey, true);
            lastCheckedPrice.set(instrumentKey, currentPrice);

            try {
                await processBuyLimitOrders(instrumentKey, currentPrice);
                await processSellLimitOrders(instrumentKey, currentPrice);
            } finally {
                // Always release the lock even if execution throws
                processingLock.set(instrumentKey, false);
            }

        } catch (error) {
            console.error("[LimitWorker] Error processing tick:", error);
        }
    });

    console.log("[LimitWorker] Subscribed to limit_price_update ✅");
    console.log(`[LimitWorker] Price-move gate: ${PRICE_CHANGE_THRESHOLD * 100}%`);
}

// ─────────────────────────────────────────────────────────────────────────────
//  BUY SIDE
//  BUY limit fires when market price drops to or below the user's limit price.
//  e.g.  limitPrice = ₹2480,  market = ₹2475  →  execute.
// ─────────────────────────────────────────────────────────────────────────────
async function processBuyLimitOrders(instrumentKey: string, currentPrice: number) {
    const openBuyOrders = await prisma.order.findMany({
        where: {
            stockId: instrumentKey,
            side: "BUY",
            status: "OPEN",
            orderType: "LIMIT",
            limitPrice: { gte: currentPrice }  // limit >= market → can execute
        }
    });

    if (openBuyOrders.length === 0) return; // nothing to do

    console.log(`[LimitWorker] Found ${openBuyOrders.length} BUY limit order(s) for ${instrumentKey} @ ₹${currentPrice}`);

    for (const order of openBuyOrders) {
        try {
            await executeBuyLimitOrder(order, currentPrice);
            console.log(`[LimitWorker] ✅ BUY executed: orderId=${order.id} @ ₹${currentPrice}`);
        } catch (err) {
            console.error(`[LimitWorker] ❌ BUY failed: orderId=${order.id}`, err);
        }
    }
}

async function executeBuyLimitOrder(order: any, marketPrice: number) {
    const qty = Number(order.quantity);
    const total = marketPrice * qty;

    await prisma.$transaction(async (tx) => {

        // 1️⃣  Update or create holding (weighted average price)
        const holding = await tx.holding.findUnique({
            where: {
                userId_stockId: {
                    userId: order.userId,
                    stockId: order.stockId
                }
            }
        });

        if (holding) {
            const oldQty = Number(holding.quantity);
            const oldAvg = Number(holding.avgPrice);
            const newQty = oldQty + qty;
            const newAvg = (oldQty * oldAvg + qty * marketPrice) / newQty;

            await tx.holding.update({
                where: { id: holding.id },
                data: { quantity: newQty, avgPrice: newAvg }
            });
        } else {
            await tx.holding.create({
                data: {
                    userId: order.userId,
                    stockId: order.stockId,
                    quantity: qty,
                    avgPrice: marketPrice
                }
            });
        }

        // Balance was already locked (deducted) at order creation time.
        // If market executed cheaper than the limit, refund the difference.
        const lockedAmount = Number(order.limitPrice) * qty;
        const refund = lockedAmount - total;
        if (refund > 0) {
            await tx.user.update({
                where: { id: order.userId },
                data: { balance: { increment: refund } }
            });
        }

        // 2️⃣  Mark order COMPLETED
        await tx.order.update({
            where: { id: order.id },
            data: { status: "COMPLETED", executedPrice: marketPrice, total }
        });

        // 3️⃣  Create Transaction record
        await tx.transaction.create({
            data: {
                type: "BUY",
                quantity: qty,
                price: marketPrice,
                total,
                userId: order.userId,
                stockId: order.stockId,
                orderId: order.id
            }
        });
    });

    // 4️⃣  Real-time WebSocket notification (outside transaction — non-critical)
    broadcastExecution(order.userId, {
        side: "BUY",
        stockId: order.stockId,
        quantity: qty,
        price: marketPrice,
        orderId: order.id
    });
}

// ─────────────────────────────────────────────────────────────────────────────
//  SELL SIDE
//  SELL limit fires when market price rises to or above the user's limit price.
//  e.g.  limitPrice = ₹2520,  market = ₹2525  →  execute.
// ─────────────────────────────────────────────────────────────────────────────
async function processSellLimitOrders(instrumentKey: string, currentPrice: number) {
    const openSellOrders = await prisma.order.findMany({
        where: {
            stockId: instrumentKey,
            side: "SELL",
            status: "OPEN",
            orderType: "LIMIT",
            limitPrice: { lte: currentPrice }  // limit <= market → can execute
        }
    });

    if (openSellOrders.length === 0) return;

    console.log(`[LimitWorker] Found ${openSellOrders.length} SELL limit order(s) for ${instrumentKey} @ ₹${currentPrice}`);

    for (const order of openSellOrders) {
        try {
            await executeSellLimitOrder(order, currentPrice);
            console.log(`[LimitWorker] ✅ SELL executed: orderId=${order.id} @ ₹${currentPrice}`);
        } catch (err) {
            console.error(`[LimitWorker] ❌ SELL failed: orderId=${order.id}`, err);
        }
    }
}

async function executeSellLimitOrder(order: any, marketPrice: number) {
    const qty = Number(order.quantity);
    const proceeds = marketPrice * qty;

    await prisma.$transaction(async (tx) => {

        // 1️⃣  Reduce / delete holding
        const holding = await tx.holding.findUnique({
            where: {
                userId_stockId: {
                    userId: order.userId,
                    stockId: order.stockId
                }
            }
        });

        if (!holding) throw new Error(`Holding not found for SELL order ${order.id}`);

        const newQty = Number(holding.quantity) - qty;
        if (newQty < 0) throw new Error(`Insufficient shares for SELL order ${order.id}`);

        if (newQty === 0) {
            await tx.holding.delete({ where: { id: holding.id } });
        } else {
            await tx.holding.update({
                where: { id: holding.id },
                data: { quantity: newQty }
            });
        }

        // 2️⃣  Credit the user's balance
        await tx.user.update({
            where: { id: order.userId },
            data: { balance: { increment: proceeds } }
        });

        // 3️⃣  Mark order COMPLETED
        await tx.order.update({
            where: { id: order.id },
            data: { status: "COMPLETED", executedPrice: marketPrice, total: proceeds }
        });

        // 4️⃣  Create Transaction record
        await tx.transaction.create({
            data: {
                type: "SELL",
                quantity: qty,
                price: marketPrice,
                total: proceeds,
                userId: order.userId,
                stockId: order.stockId,
                orderId: order.id
            }
        });
    });

    // 5️⃣  Real-time WebSocket notification
    broadcastExecution(order.userId, {
        side: "SELL",
        stockId: order.stockId,
        quantity: qty,
        price: marketPrice,
        orderId: order.id
    });
}

// ─────────────────────────────────────────────────────────────────────────────
//  Bootstrap
// ─────────────────────────────────────────────────────────────────────────────
startWorker().catch((err) => {
    console.error("[LimitWorker] Failed to start:", err);
    process.exit(1);
});