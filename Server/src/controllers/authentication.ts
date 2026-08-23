import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

const JWT_SECRET:string = process.env.JWT_SECRET || " ";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
}

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
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                balance: user.balance
            }
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
            where: {
                email
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                balance: user.balance
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