import router from 'express';
import searchStock from '../controllers/searchStock.js'; 
import express from 'express';
import {isLoggedin} from '../middlewares/isLoggedIn.js';

const Router = express.Router();

const findRouter = Router;

findRouter.get('/searchStock',isLoggedin,searchStock);

export default findRouter;

