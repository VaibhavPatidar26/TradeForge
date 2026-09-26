import { WebSocket } from "ws";
import { mp, watchlists } from "./connection.js";
export function broadcastPrice(instrumentKey, price) {
    for (const [socket, userId] of mp) {
        if (socket.readyState !== WebSocket.OPEN) {
            continue;
        }
        const userWatchlist = watchlists.get(userId);
        if (!userWatchlist) {
            continue;
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
export function broadcastExecution(userId, payload) {
    for (const [socket, uid] of mp) {
        if (uid === userId && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                type: "LIMIT_ORDER_EXECUTED",
                ...payload
            }));
        }
    }
}
//# sourceMappingURL=sendToFront.js.map