import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL
})

redis.on("error", (error) => {
    console.log(error);
})

export async function setPrice(instrumentKey: string, price: number) {

    await redis.set(instrumentKey, price);
    console.log(`Set key=${instrumentKey}, val=${price}`);
    // await redis.expire(instrumentKey,60);
}

export default redis;