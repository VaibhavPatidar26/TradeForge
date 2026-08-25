import express from "express";
import { login, register } from "../controllers/authentication.js";
const Router = express.Router();
const userRouter = Router;
userRouter.post('/login', login);
userRouter.post('/register', register);
export default userRouter;
//# sourceMappingURL=userRouter.js.map