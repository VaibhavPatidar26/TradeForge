import express from "express";
// import { isLoggedin } from "../middlewares/isLoggedIn.js";
import addToWatchlist from "../controllers/addToWatchlist.js";
import isLoggedin from "../middlewares/isLoggedIn.js";
import removeFromWatchlist from "../controllers/removeFromWatchlist.js";

// import { Router } from "express";

const Router=express.Router();

const createRouter = Router;

createRouter.post("/addtolist/:stockId",isLoggedin,addToWatchlist);
createRouter.delete("/removefromlist/:stockId", isLoggedin, removeFromWatchlist);
export default createRouter;