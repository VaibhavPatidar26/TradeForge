import prisma from "../lib/prisma.js";
async function getWatchlist(req, res) {
    const userId = req.userId;
    try {
        const watchlist = await prisma.watchlist.findMany({
            where: {
                userId: userId
            },
            include: {
                stock: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return res.status(200).json({
            message: "Watchlist fetched successfully",
            watchlist: watchlist
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch watchlist"
        });
    }
}
export default getWatchlist;
//# sourceMappingURL=fetchWatchList.js.map