import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export async function fetchPortfolio(req: Request, res: Response) {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false
        });
    }

    try {
        const userCurrentHoldings = await prisma.holding.findMany({
            where: { userId },
            include: { stock: true }
        });

        return res.status(200).json({
            message: "Portfolio fetched successfully",
            success: true,
            portfolio: userCurrentHoldings
        });
    } catch (err) {
        console.error("[fetchPortfolio] Error:", err);
        return res.status(500).json({
            message: "Server error fetching portfolio",
            success: false
        });
    }
}