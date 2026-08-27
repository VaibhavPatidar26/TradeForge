import prisma from "../src/lib/prisma.js";

async function main() {

    await prisma.asset.upsert({
        where: {
            symbol: "NSE_EQ|INE002A01018"
        },
        update: {},
        create: {
            symbol: "NSE_EQ|INE002A01018",
            name: "Reliance Industries",
            type: "STOCK",
            currentPrice: 0,
            exchange: "NSE"
        }
    });

    await prisma.asset.upsert({
        where: {
            symbol: "NSE_EQ|INE467B01029"
        },
        update: {},
        create: {
            symbol: "NSE_EQ|INE467B01029",
            name: "Tata Consultancy Services",
            type: "STOCK",
            currentPrice: 0,
            exchange: "NSE"
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        // process.exit(1);
    });