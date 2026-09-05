import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "@prisma/client"

export async function isLoggedin(req: Request, res: Response, next: NextFunction) {
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const token = req.headers.authorization;

    interface jwtPayload {
        userId: string,
        emailId: string

    }


    try {
        if (!token || !token.startsWith("Bearer ")) {
            console.log("token not found");
            return res.status(401).json({
                message: "invalid token or incorrect",
                success: false
            });
        }
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET) as jwtPayload

        const userId = decoded.userId;
        const emailId = decoded.emailId;
        if (!userId) {
            return res.status(403).json({
                message: "token not present",
                success: false
            })
        }

        req.userId = userId;
        req.emailId = emailId;

        next();
    }

    catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "invaid token",
            success: false
        })
    }

}
export default isLoggedin