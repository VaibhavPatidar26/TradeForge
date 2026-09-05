import express from "express";
// import { isLoggedin } from "../middlewares/isLoggedIn.js";
import addToWatchlist from "../controllers/addToWatchlist.js";
import isLoggedin from "../middlewares/isLoggedIn.js";

// import { Router } from "express";

const Router=express.Router();

const createRouter = Router;

createRouter.post("/addtolist/:stockId",isLoggedin,addToWatchlist);

export default createRouter;