import { Request, Response } from "express";
import prisma from "../../lib/prisma.js";
import redis from "../../redis/client.js";
import generateOtp from "../../services/generateOtp.js";
import sendEmail from "../../services/sendEmail.js";

export async function resendOtp(req: Request, res: Response) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const backendOtp = generateOtp();
        await redis.set(email, backendOtp, { EX: 60 * 5 });
        await sendEmail(email, backendOtp);

        return res.status(200).json({
            message: "OTP resent successfully",
            success: true
        });
    } catch (error: any) {
        console.error("Resend OTP error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
