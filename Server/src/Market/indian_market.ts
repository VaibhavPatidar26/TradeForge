import UpstoxClient from "upstox-js-sdk";
import "dotenv/config";
import redis, { setPrice } from "../redis/client.js";
import { broadcastPrice } from "../websockets/sendToFront.js";
const token = process.env.UPSTOX_TOKEN;

if (!token) {
    throw new Error("UPSTOX_ACCESS_TOKEN is missing");
}


const defaultClient = UpstoxClient.ApiClient.instance;

const oauth2 = defaultClient.authentications["OAUTH2"];
oauth2.accessToken = token;

const streamer = new UpstoxClient.MarketDataStreamerV3();


const activeStocks = new Set<string>();


export async function subscribeToStocks(idForLive:string[]){
try{


    const newIds = idForLive.filter((ids)=>!activeStocks.has(ids))
    if(newIds.length===0) return;


    for(let i=0;i<newIds.length;i++){
        activeStocks.add(newIds[i])
    }
    streamer.subscribe(newIds, "ltpc");
    console.log("subscribe to stocks in", activeStocks);
}
catch(err){
    console.log(err);
}
}


streamer.on("open", () => {
    console.log("Connected to Upstox");

   if(activeStocks.size>0){
    subscribeToStocks(Array.from(activeStocks));
   }
   else{
    console.log("no stocks to show live feed");
   }

});
streamer.on("message", async (data: Buffer) => {
    try {
        const message = data.toString("utf-8");
        const parsedMessage = JSON.parse(message);

        if (!parsedMessage.feeds) return;

        for (const [instrumentKey, feed] of Object.entries(parsedMessage.feeds)) {
            const price = (feed as any).ltpc?.ltp;

            if (price !== undefined) {
                await setPrice(instrumentKey, price);
                broadcastPrice(instrumentKey, price);
            }
        }

    } catch (error) {
        console.error("Failed to process market data:", error);
    }
});

streamer.on("error", (error: unknown) => {
    console.error("Upstox WebSocket error:", error);
});

streamer.on("close", () => {
    console.log("Upstox WebSocket closed");
});

export async function Upstoxconnect() {
    // await redis.connect();

    await streamer.connect();
}

