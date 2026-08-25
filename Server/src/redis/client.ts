import {createClient} from "redis";

const redis = createClient({
    url: process.env.REDIS_URL
})

redis.on("error",(error)=>{
    console.log(error);
})

export async function connectRedis(){
    if(!redis.isOpen){
        await redis.connect();
        console.log("connection made");
    }
}

export default redis;