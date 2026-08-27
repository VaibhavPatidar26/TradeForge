import express from "express";
import { isLoggedin } from "../middlewares/isLoggedIn.js";
import { buyAsset } from "../controllers/buyStock.js";
const Router = express.Router();

const orderRouter = Router;

orderRouter.post("/buy", isLoggedin, buyAsset);

export { orderRouter };
