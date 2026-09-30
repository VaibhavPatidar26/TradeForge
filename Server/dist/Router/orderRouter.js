import express from "express";
import isLoggedin from "../middlewares/isLoggedIn.js";
import { buyMarketOrder } from "../controllers/orderController/buyMarketOrder.js";
import sellStock from "../controllers/orderController/sellMarketStocks.js";
import BuyLimitOrder from "../controllers/orderController/buyLimitOrder.js";
import sellLimitOrder from "../controllers/orderController/sellLimitOrder.js";
import { getTodayOrders } from "../controllers/orderController/getTodayOrders.js";
import { cancelOrder } from "../controllers/orderController/cancelOrder.js";
const Router = express.Router();
const orderRouter = Router;
//──────────────────────────────────────────────────────────────
orderRouter.post("/buy/market", isLoggedin, buyMarketOrder);
orderRouter.post("/sell/market", isLoggedin, sellStock);
orderRouter.post("/cancel/:orderId", isLoggedin, cancelOrder);
//───────────────────────────────────────────────────────────────
orderRouter.post("/buy/limit", isLoggedin, BuyLimitOrder);
orderRouter.post("/sell/limit", isLoggedin, sellLimitOrder);
//─────────────────────────────────────────────────────────────────
orderRouter.get("/today", isLoggedin, getTodayOrders);
export { orderRouter };
//# sourceMappingURL=orderRouter.js.map