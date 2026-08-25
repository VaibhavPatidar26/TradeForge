import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./Router/userRouter.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
    try {
        res.json({
            message: "backend and prisma running",
            success: true,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "server falied",
            success: false
        });
    }
});
app.use("/api/users", userRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server start on ${PORT}`);
});
//# sourceMappingURL=server.js.map