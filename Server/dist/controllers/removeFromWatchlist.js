import prisma from "../lib/prisma.js";
import { removeStockFromWatchlist } from "../websockets/connection.js";
export default async function removeFromWatchlist(req, res) {
    try {
        const userId = req.userId;
        const stockId = req.params.stockId;
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
                stockId: stockId
            }
        });
        removeStockFromWatchlist(userId, stockId);
        return res.status(200).json({
            message: "Successfully removed from watchlist",
            success: true
        });
    }
    catch (error) {
        console.error("Error removing from watchlist:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
//# sourceMappingURL=removeFromWatchlist.js.map