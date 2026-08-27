import UpstoxClient from "upstox-js-sdk";
import "dotenv/config";
import redis, { setPrice } from "../redis/client.js";
import { broadcastPrice } from "../websockets/connection.js";

const token = process.env.UPSTOX_TOKEN;

if (!token) {
    throw new Error("UPSTOX_ACCESS_TOKEN is missing");
}

const defaultClient = UpstoxClient.ApiClient.instance;

const oauth2 = defaultClient.authentications["OAUTH2"];
oauth2.accessToken = token;

const streamer = new UpstoxClient.MarketDataStreamerV3();

const instruments = [
    "NSE_EQ|INE002A01018", // Reliance
    "NSE_EQ|INE467B01029", // TCS
];

streamer.on("open", () => {
    console.log("Connected to Upstox");

    streamer.subscribe(instruments, "ltpc");

    console.log("Subscribed to:", instruments);
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

async function connect() {
    await redis.connect();

    streamer.connect();
}
connect();