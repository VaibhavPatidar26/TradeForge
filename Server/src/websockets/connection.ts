import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import "dotenv/config";
import prisma from "../lib/prisma.js";
import { subscribeToStocks } from "../Market/indian_market.js";
import redis from "../redis/client.js";
import fetchHistChart from "../services/HIstoricalChart.js";
interface JwtPayload {
    userId: string;
}
const mp = new Map<WebSocket, string>();

const watchlists = new Map<string, string[]>();

const JWT_SECRET = process.env.JWT_SECRET || "";

export default async function startWebSocketServer() {


    const wss = new WebSocketServer({
        port: 8080
    }, () => {
        console.log("websocket server started at 8080",)
    });

    wss.on("connection", function (ws) {

        console.log("Client connected");

      ws.send(JSON.stringify({
    type: "WELCOME",
    message: "Welcome to TradeForge"
}));

        ws.on("message", async function (data) {

            console.log("MESSAGE RECEIVED:", data.toString());

            const message = JSON.parse(data.toString());

            console.log("MESSAGE OBJECT:", message);
            console.log("MESSAGE TYPE:", message.type);
            
            if (message.type === "auth_connection") {

                const token = message.token;

                try {

                    const decoded = jwt.verify(
                        token,
                        JWT_SECRET
                    ) as JwtPayload;

                    console.log("User authenticated:", decoded.userId);

                    // Store socket -> userId
                    mp.set(ws, decoded.userId);

                    // Fetch user's watchlist
                    const userWatchlist = await prisma.watchlist.findMany({
                        where: {
                            userId: decoded.userId
                        },
                        include: {
                            stock: true
                        }
                    });

                    // Extract instrument keys
                    const instrumentKeys = userWatchlist.map(function (item) {
                        return item.stock.instrument_key;
                    });
                    //subscribe to the instrument keys here
                    subscribeToStocks(instrumentKeys || []);
                    // Store userId -> instrumentKeys
                    watchlists.set(
                        decoded.userId,
                        instrumentKeys
                    );
                    for (const stockKey of instrumentKeys) {
                        const cachedPrice = await redis.get(stockKey);
                        if (cachedPrice) {
                            ws.send(JSON.stringify({
                                type: "PRICE_UPDATE",
                                instrumentKey: stockKey,
                                price: Number(cachedPrice)
                            }));
                            console.log(`Pushed cached price for ${stockKey}: ₹${cachedPrice}`);
                        }
                    }

                    console.log(
                        "User watchlist:",
                        instrumentKeys
                    );

                } catch (error) {
 
                    console.log("Invalid token", error);

                    ws.close();
                }
            }

//------------------------------------------------------------------------------


           if (message.type == "CANDLE_STICK") {
try{


    const instrumentKey = message.instrument_key;
    const candleDuration = message.candleDuration;
    const to_date = message.to_date;
    const from_date = message.from_date;
    const unit = message.unit;
    // fetch historical data using instrumentKey
    const candles = await fetchHistChart(
        instrumentKey,
        unit,
        candleDuration,
        to_date,
        from_date
    );
    console.log("the candle data is",candles)

    ws.send(JSON.stringify({
        type: "SENDING_CANDLE_DATA",
        instrumentKey: instrumentKey,
        candles: candles
    }));

}
catch(err){
    console.log(err);
}   
}
//--------------------------------------------------------------------------------------

           if (message.type == "FETCH_MORE_CANDLES") {
try{
    const instrumentKey = message.instrument_key;
    const candleDuration = message.candleDuration;
    const to_date = message.to_date;
    const from_date = message.from_date;
    const unit = message.unit;

    const candles = await fetchHistChart(
        instrumentKey,
        unit,
        candleDuration,
        to_date,
        from_date
    );

    ws.send(JSON.stringify({
        type: "MORE_CANDLES_DATA",
        instrumentKey: instrumentKey,
        candles: candles
    }));
}
catch(err){
    console.log(err);
}
}



        });


        ws.on("close", function () {

            const userId = mp.get(ws);

            // Remove socket
            mp.delete(ws);

            // Remove user's watchlist
            if (userId) {
                watchlists.delete(userId);
            }

            console.log("Client disconnected");
        });
    });
}

export async function updatewatchlist(userId: string, stockId: string) {
    const currentList = watchlists.get(userId) || [];
    if (!currentList.includes(stockId)) {
        watchlists.set(userId, [...currentList, stockId]);
        console.log("updated watchlist", watchlists.get(userId));
    }

    // If Redis already has a cached price, push it immediately to the user's socket
    try {
        const cachedPrice = await redis.get(stockId);
        if (cachedPrice) {
            for (const [socket, uId] of mp) {
                if (uId === userId && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({
                        type: "PRICE_UPDATE",
                        instrumentKey: stockId,
                        price: Number(cachedPrice)
                    }));
                    console.log(`Pushed cached price on add for ${stockId}: ₹${cachedPrice}`);
                }
            }
        }
    } catch (err) {
        console.error("Error pushing cached price on add:", err);
    }
}

export function removeStockFromWatchlist(userId: string, stockId: string) {
    const currentList = watchlists.get(userId);
    if (currentList) {
        watchlists.set(userId, currentList.filter((id) => id !== stockId));
        console.log("removed from watchlist, updated list:", watchlists.get(userId));
    }
}

export { mp, watchlists };

