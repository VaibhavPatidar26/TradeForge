import redis from "../redis/client.js";
export async function idempotencyMiddleware(req, res, next) {
    const idempotencyKey = req.headers["idempotency-key"];
    const userId = req.userId;
    if (!idempotencyKey || !userId) {
        return next();
    }
    const lockKey = `idempotency:lock:${userId}:${idempotencyKey}`;
    const responseKey = `idempotency:resp:${userId}:${idempotencyKey}`;
    try {
        // 1. Check if a completed response already exists
        const cachedResponse = await redis.get(responseKey);
        if (cachedResponse) {
            console.log(`[Idempotency] Returning cached response for key: ${idempotencyKey}`);
            return res.status(200).json(JSON.parse(cachedResponse));
        }
        // 2. Try to acquire an atomic lock for IN_PROGRESS state using NX (Set if Not Exists)
        // EX 60: If server crashes mid-trade, lock auto-expires in 60 seconds
        const acquired = await redis.set(lockKey, "IN_PROGRESS", { NX: true, EX: 60 });
        if (!acquired) {
            // Another request with the exact same key is currently processing right now!
            console.log(`[Idempotency] Concurrent duplicate request blocked for key: ${idempotencyKey}`);
            return res.status(409).json({
                message: "A request with this idempotency key is currently being processed. Please wait.",
                success: false
            });
        }
        // 3. We got the lock! Intercept res.json to cache the final response
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                // Store successful result for 24 hours
                redis.setEx(responseKey, 86400, JSON.stringify(body)).catch((err) => {
                    console.error("[Idempotency] Failed to cache response:", err);
                });
            }
            else {
                // If trade failed (e.g. 400 Insufficient Balance), release lock immediately so user can retry
                redis.del(lockKey).catch(() => { });
            }
            return originalJson(body);
        };
        next();
    }
    catch (err) {
        console.error("[Idempotency] Middleware error:", err);
        next();
    }
}
//# sourceMappingURL=idempotentCheck.js.map