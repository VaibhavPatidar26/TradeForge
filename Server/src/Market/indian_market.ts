import UpstoxClient from "upstox-js-sdk";
import "dotenv/config";

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

streamer.on("message", (data: Buffer) => {
    try {
        const message = data.toString("utf-8");

        console.log("RAW:", message);
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

streamer.connect();