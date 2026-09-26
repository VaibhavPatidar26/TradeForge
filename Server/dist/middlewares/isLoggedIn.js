import jwt from "jsonwebtoken";
export async function isLoggedin(req, res, next) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        return res.status(500).json({
            message: "JWT_SECRET is not configured",
            success: false
        });
    }
    const authorization = req.headers.authorization;
    try {
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token is required",
                success: false
            });
        }
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.userId) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        req.userId = decoded.userId;
        req.emailId = decoded.email;
        next();
    }
    catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
}
export default isLoggedin;
//# sourceMappingURL=isLoggedIn.js.map