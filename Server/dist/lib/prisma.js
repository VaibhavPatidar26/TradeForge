import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const adapter = process.env.DATABASE_URL
    ? new PrismaMariaDb(process.env.DATABASE_URL)
    : new PrismaMariaDb({
        host: process.env.DATABASE_HOST || "127.0.0.1",
        port: Number(process.env.DATABASE_PORT) || 3306,
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD || "",
        database: process.env.DATABASE_NAME || "tradeforge",
        connectionLimit: 5,
        allowPublicKeyRetrieval: true
    });
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
export default prisma;
//# sourceMappingURL=prisma.js.map