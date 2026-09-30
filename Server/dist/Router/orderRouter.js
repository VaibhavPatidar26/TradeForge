import express from "express";
import isLoggedin from "../middlewares/isLoggedIn.js";
import { buyMarketOrder } from "../controllers/orderController/buyMarketOrder.js";
import sellStock from "../controllers/orderController/sellMarketStocks.js";
import BuyLimitOrder from "../controllers/orderController/buyLimitOrder.js";
import sellLimitOrder from "../controllers/orderController/sellLimitOrder.js";
import { getTodayOrders } from "../controllers/orderController/getTodayOrders.js";
import { cancelOrder } from "../controllers/orderController/cancelOrder.js";
import { idempotencyMiddleware } from "../middlewares/idempotentCheck.js";
const Router = express.Router();
const orderRouter = Router;
//──────────────────────────────────────────────────────────────
orderRouter.post("/buy/market", isLoggedin, idempotencyMiddleware, buyMarketOrder);
orderRouter.post("/sell/market", isLoggedin, idempotencyMiddleware, sellStock);
orderRouter.post("/cancel/:orderId", isLoggedin, cancelOrder);
//───────────────────────────────────────────────────────────────
orderRouter.post("/buy/limit", isLoggedin, idempotencyMiddleware, BuyLimitOrder);
orderRouter.post("/sell/limit", isLoggedin, idempotencyMiddleware, sellLimitOrder);
//─────────────────────────────────────────────────────────────────
orderRouter.get("/today", isLoggedin, getTodayOrders);
export { orderRouter };
//# sourceMappingURL=orderRouter.js.map