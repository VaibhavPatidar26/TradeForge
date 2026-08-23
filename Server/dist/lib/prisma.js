import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
export default prisma;
//# sourceMappingURL=prisma.js.map