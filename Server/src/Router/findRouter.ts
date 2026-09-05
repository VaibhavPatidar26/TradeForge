import router from 'express';
import searchStock from '../controllers/searchStock.js'; 
import express from 'express';
import isLoggedin from '../middlewares/isLoggedIn.js';
import getWatchlist from '../controllers/fetchWatchList.js';
const Router = express.Router();

const findRouter = Router;

findRouter.get('/searchStock',isLoggedin,searchStock);
findRouter.get("/fetchwatchlist",isLoggedin,getWatchlist)

export default findRouter;

