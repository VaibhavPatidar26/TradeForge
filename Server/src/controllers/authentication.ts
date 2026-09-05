import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

const JWT_SECRET: string = process.env.JWT_SECRET || " ";
// const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
}

// function generateTokens(userId: string, email: string) {
//     const accessToken = jwt.sign(
//         { userId, emailId: email },
//         JWT_SECRET,
//         { expiresIn: "7d" }
//     );

//     const refreshToken = jwt.sign(
//         { userId, emailId: email },
//         // JWT_REFRESH_SECRET,
//         { expiresIn: "7d" }
//     );
//     return { accessToken, refreshToken };
// }

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
                success: false
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // const { accessToken, refreshToken } = generateTokens("temp_id", email);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                // refreshToken 
            }
        });

        // Regenerate tokens with actual user ID

        const uesrId = user.id;
        const token = jwt.sign({
            userId:uesrId,
            email:user.email
        },JWT_SECRET)
        // const tokens = generateTokens(user.id, user.email);
        
        // await prisma.user.update({
        //     where: { id: user.id },
        //     data: { refreshToken: tokens.refreshToken }
        // });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                balance: user.balance,
                token:token
            },
            // token: tokens.accessToken,
            // refreshToken: tokens.refreshToken
        });

    } catch (error: any) {
        console.error("Register error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
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

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const token =  jwt.sign({
            userId : user.id,
            email : user.email,
        },JWT_SECRET)
        // const { accessToken, refreshToken } = generateTokens(user.id, user.email);

        // await prisma.user.update({
        //     where: { id: user.id },
        //     data: { refreshToken }
        // });

        return res.status(200).json({
            message: "Login successful",
            success: true,
            token:token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                balance: user.balance,
                token:token
            }
        });

    } catch (error: any) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// export async function refresh(req: Request, res: Response) {
//     try {
//         const { refreshToken } = req.body;

//         if (!refreshToken) {
//             return res.status(401).json({ message: "Refresh token is required", success: false });
//         }

//         let decoded: any;
//         try {
//             decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
//         } catch (err) {
//             return res.status(403).json({ message: "Invalid refresh token", success: false });
//         }

//         const user = await prisma.user.findUnique({
//             where: { id: decoded.userId }
//         });

//         if (!user || user.refreshToken !== refreshToken) {
//             return res.status(403).json({ message: "Invalid refresh token", success: false });
//         }

//         const tokens = generateTokens(user.id, user.email);

//         await prisma.user.update({
//             where: { id: user.id },
//             data: { refreshToken: tokens.refreshToken }
//         });

//         return res.status(200).json({
//             message: "Token refreshed",
//             success: true,
//             token: tokens.accessToken,
//             refreshToken: tokens.refreshToken
//         });

//     } catch (error: any) {
//         console.error("Refresh token error:", error);
//         return res.status(500).json({ message: "Internal server error", success: false });
//     }
// }