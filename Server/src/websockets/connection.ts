import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import "dotenv/config";
import prisma from "../lib/prisma.js";

interface JwtPayload {
    userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "";

export const wss = new WebSocketServer({
    port: 8080
});

const mp = new Map<WebSocket, string>();

const watchlists = new Map<string, string[]>();

wss.on("connection", function (ws) {

    console.log("Client connected");

    ws.send("Welcome to TradeForge");

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

                // Store userId -> instrumentKeys
                watchlists.set(
                    decoded.userId,
                    instrumentKeys
                );

                console.log(
                    "User watchlist:",
                    instrumentKeys
                );

            } catch (error) {

                console.log("Invalid token", error);

                ws.close();
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

export {mp,watchlists}