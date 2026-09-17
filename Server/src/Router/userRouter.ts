import express from "express";
import isLoggedin from "../middlewares/isLoggedIn.js";
import { validate } from "../middlewares/validateFields.js";
import { login, register } from "../controllers/authentication/authentication.js"
import { verifyOtp } from "../controllers/authentication/verifyOtp.js";
import { resendOtp } from "../controllers/authentication/resendOtp.js";
import { loginSchema, registerScema } from "../zodSchemas/authSchema.js";
const Router = express.Router();

const userRouter = Router;

userRouter.post('/login', validate(loginSchema), login);
userRouter.post('/register', validate(registerScema), register);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/resend-otp', resendOtp);
// userRouter.post('/refresh',refresh);

export default userRouter;