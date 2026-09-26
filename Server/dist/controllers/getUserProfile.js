import prisma from "../lib/prisma.js";
export async function getUserProfile(req, res) {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                balance: true,
                createdAt: true
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                balance: Number(user.balance),
                createdAt: user.createdAt
            }
        });
    }
    catch (error) {
        console.error("[getUserProfile] Error:", error);
        return res.status(500).json({ message: "Failed to fetch user profile" });
    }
}
//# sourceMappingURL=getUserProfile.js.map