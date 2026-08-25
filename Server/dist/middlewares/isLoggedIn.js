import jwt from "jsonwebtoken";
export async function isLoggedin(req, res, next) {
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const token = req.headers.authorization;
    try {
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "invalid token",
                success: false
            });
        }
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
        const userId = decoded.userId;
        const emailId = decoded.emailId;
        if (!userId) {
            return res.status(403).json({
                message: "token not present",
                success: false
            });
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
        });
    }
}
//# sourceMappingURL=isLoggedIn.js.map