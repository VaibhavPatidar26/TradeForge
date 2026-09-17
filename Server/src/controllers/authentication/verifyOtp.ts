import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma.js";
import redis from "../../redis/client.js";
const JWT_SECRET = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
}


export async function verifyOtp(req: Request, res: Response) {
    try {
        const { email, userOtp } = req.body;

        if (!email || !userOtp) {
            return res.status(400).json({
                message: "Email and otp are required",
                success: false
            });
        }
        
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }



        const backendOtp = await redis.get(email);

        if (!backendOtp) {
            return res.status(401).json({
                message: "Otp expired",
                success: false
            });
        }

        if (userOtp !== backendOtp) {
            return res.status(401).json({
                message: "Invalid Otp try again",
                success: false
            });
        }
        else if(await redis.ttl(email)<=0){
            return res.status(401).json({
                message: "Otp expired",
                success: false
            });
        }

        redis.del(email);

        // return res.status(200).json({
        //     message: "Otp verified successfully",
        //     success: true
        // });

        //sign the jwt token here;

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            message: "Otp verified successfully",
            success: true,
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                balance: user.balance
            }
        });

    } catch (error: any) {
        console.error("Verify otp error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}