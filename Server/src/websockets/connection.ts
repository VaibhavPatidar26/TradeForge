import { WebSocketServer, WebSocket } from "ws";

export const wss = new WebSocketServer({
    port: 8080
});

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.send("Welcome to TradeForge");

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

export function broadcastPrice(
    instrumentKey: string,
    price: number
) {
    console.log("Broadcasting:", instrumentKey, price);
    console.log("Connected clients:", wss.clients.size);

    const message = JSON.stringify({
        type: "PRICE_UPDATE",
        instrumentKey,
        price
    });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}