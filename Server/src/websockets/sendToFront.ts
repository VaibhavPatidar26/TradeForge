import { WebSocket } from "ws";
import { mp, watchlists } from "./connection.js";

export function broadcastPrice(
    instrumentKey: string,
    price: number
) {
    for (const [socket, userId] of mp) {

        if (socket.readyState !== WebSocket.OPEN) {
            return;
        }

        const userWatchlist = watchlists.get(userId);

        if (!userWatchlist) {
            return;
        }

        if (userWatchlist.includes(instrumentKey)) {

            socket.send(JSON.stringify({
                type: "PRICE_UPDATE",
                instrumentKey: instrumentKey,
                price: price
            }));

        }
    }
}