import { gunzipSync } from "node:zlib";
import axios from "axios";
import prisma from "../lib/prisma.js";

const url = "https://assets.upstox.com/market-quote/instruments/exchange/NSE.json.gz";

async function seedStocks() {
    console.log("[Seeder] Fetching instruments list from Upstox...");
    const response = await axios.get(url, {
        responseType: "arraybuffer",
    });

    const jsonBuffer = gunzipSync(response.data);
    const instruments = JSON.parse(jsonBuffer.toString("utf-8"));
    console.log(`[Seeder] Downloaded ${instruments.length} instruments.`);

    // Map instruments to match the Stocks schema
    const formattedStocks = instruments
        .filter((stock: any) => stock.instrument_key && stock.trading_symbol)
        .map((stock: any) => ({
            segment: stock.segment || "NSE_EQ",
            name: stock.name || stock.trading_symbol,
            exchange: stock.exchange || "NSE",
            instrument_type: stock.instrument_type || "EQUITY",
            instrument_key: stock.instrument_key,
            trading_symbol: stock.trading_symbol,
        }));

    console.log(`[Seeder] Seeding ${formattedStocks.length} stocks in batches...`);

    const BATCH_SIZE = 2000;
    for (let i = 0; i < formattedStocks.length; i += BATCH_SIZE) {
        const batch = formattedStocks.slice(i, i + BATCH_SIZE);
        await prisma.stocks.createMany({
            data: batch,
            skipDuplicates: true,
        });

        const current = Math.min(i + BATCH_SIZE, formattedStocks.length);
        console.log(`[Seeder] Processed ${current} / ${formattedStocks.length} stocks...`);
    }

    console.log("[Seeder] ✅ Successfully seeded all stocks into the database!");
}

seedStocks()
    .catch((err) => {
        console.error("[Seeder] ❌ Failed to seed stocks:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });