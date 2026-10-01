import { createClient } from "redis";
import * as IORedisModule from "ioredis";
const IORedis = (IORedisModule as any).default ?? IORedisModule;

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

// Validate protocol early so we get a clear error message
const isTLS = redisUrl.startsWith("rediss://");
const isPlain = redisUrl.startsWith("redis://");
if (!isTLS && !isPlain) {
    throw new Error(
        `[Redis] Invalid REDIS_URL protocol. ` +
        `Expected "redis://" or "rediss://", got: "${redisUrl.split(":")[0]}://". ` +
        `Check the REDIS_URL environment variable on Render.`
    );
}

// node-redis client (used for general get/set operations)
const redis = createClient({
    url: redisUrl,
    ...(isTLS && { socket: { tls: true, rejectUnauthorized: false } }),
});

redis.on("error", (error) => {
    console.log("Redis Client Error:", error);
});

// ioredis client used exclusively by BullMQ (it requires ioredis internally)
export const bullMQRedis = new IORedis(redisUrl, {
    maxRetriesPerRequest: null, // required by BullMQ
    enableReadyCheck: false,    // required by BullMQ
    ...(isTLS && { tls: { rejectUnauthorized: false } }),
});

// Keep redisConnection for backwards compat (not used by BullMQ anymore)
export const redisConnection = bullMQRedis;

export async function setPrice(instrumentKey: string, price: number) {
    await redis.set(instrumentKey, price);
}

export default redis;