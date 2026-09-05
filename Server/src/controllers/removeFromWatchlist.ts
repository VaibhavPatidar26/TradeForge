import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export default async function removeFromWatchlist(req: Request, res: Response) {
    try {
        const userId = req.userId;
        const  stockId  = req.params.stockId as string;

        if (!userId) {
            return res.status(401).json({ 
                message: "Unauthorized", 
                success: false 
            });
        }

        if (!stockId) {
            return res.status(400).json({ 
                message: "Stock ID is required", 
                success: false 
            });
        }

        
        await prisma.watchlist.deleteMany({
            where: {
                userId: userId,
                stockId:stockId
            }
        });

        return res.status(200).json({
            message: "Successfully removed from watchlist",
            success: true
        });
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}