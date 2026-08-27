// import { wss } from "../server.js";

// export function broadcastPrice(
//     instrumentKey: string,
//     price: number
// ) {
//     console.log("Broadcasting:", instrumentKey, price);
//     console.log("Connected clients:", wss.clients.size);

//     const message = JSON.stringify({
//         type: "PRICE_UPDATE",
//         instrumentKey,
//         price
//     });

//     wss.clients.forEach((client) => {
//         console.log("Client state:", client.readyState);

//         if (client.readyState === 1) {
//             client.send(message);
//         }
//     });
// }