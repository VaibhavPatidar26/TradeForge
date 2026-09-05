import express from "express";
import  isLoggedin  from "../middlewares/isLoggedIn.js";
import {login,register} from "../controllers/authentication.js"
const Router = express.Router();

const userRouter = Router;

userRouter.post('/login',login);
userRouter.post('/register',register);
// userRouter.post('/refresh',refresh);

export default userRouter;