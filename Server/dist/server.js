import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
    try {
        const user = await prisma.user.findMany();
        res.json({
            message: "backend and prisma running",
            success: true,
            user
        });
    }
    catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({
            message: "Database query failed",
            error: err?.message || err,
            success: false
        });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server start on ${PORT}`);
});
//# sourceMappingURL=server.js.map