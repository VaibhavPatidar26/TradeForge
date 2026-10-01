import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./Router/userRouter.js";
import { orderRouter } from "./Router/orderRouter.js";
import redis from "./redis/client.js";
import findRouter from "./Router/findRouter.js";
import createRouter from "./Router/createRouter.js";
import startWebSocketServer from "./websockets/connection.js";
import { Upstoxconnect } from "./Market/indian_market.js";
import http from "http";
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
    try {
        res.json({
            message: "backend and prisma running",
            success: true,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "server falied",
            success: false
        });
    }
});
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/search", findRouter);
app.use('/api/watchlist', createRouter);
const PORT = process.env.PORT || 3000;
if (!redis.isOpen) {
    await redis.connect();
    console.log("connected on redis");
}
await startWebSocketServer(server);
await Upstoxconnect();
server.listen(PORT, () => {
    console.log(`server start on ${PORT}`);
});
//# sourceMappingURL=server.js.map