import express from "express";
import  isLoggedin  from "../middlewares/isLoggedIn.js";
import { buyAsset } from "../controllers/buyStock.js";
import sellStock from "../controllers/sellStocks.js";
const Router = express.Router();

const orderRouter = Router;

orderRouter.post("/buy", isLoggedin, buyAsset);
orderRouter.post("/sell", isLoggedin, sellStock);

export { orderRouter };
