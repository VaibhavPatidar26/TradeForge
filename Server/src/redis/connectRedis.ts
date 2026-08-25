import "dotenv/config";
import redis, { connectRedis } from "./client.js";

async function test() {
    await connectRedis();

    await redis.set("test", "hello");

    const value = await redis.get("test");

    console.log("Redis value:", value);

    await redis.quit();
}

test();