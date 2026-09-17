import express from "express";
import  isLoggedin  from "../middlewares/isLoggedIn.js";
import { buyMarketOrder } from "../controllers/orderController/buyMarketOrder.js";
import sellStock from "../controllers/sellStocks.js";
const Router = express.Router();

const orderRouter = Router;

orderRouter.post("/buy/market", isLoggedin, buyMarketOrder);
orderRouter.post("/sell", isLoggedin, sellStock);

export { orderRouter };
