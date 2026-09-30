import { createClient } from "redis";
export const redisConnection = process.env.REDIS_URL
    ? { url: process.env.REDIS_URL }
    : {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379,
    };
const redis = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
redis.on("error", (error) => {
    console.log("Redis Client Error:", error);
});
export async function setPrice(instrumentKey, price) {
    await redis.set(instrumentKey, price);
}
export default redis;
//# sourceMappingURL=client.js.map