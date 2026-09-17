import axios from "axios";
import "dotenv/config";
import generateDateChunks from "./generateDateChunks.js";

async function fetchSingleChunk(
    encodedInstrumentKey: string,
    unit: string,
    interval: number,
    to_date: string,
    from_date: string
) {
    try {
        const response = await axios.get(
            `https://api.upstox.com/v3/historical-candle/${encodedInstrumentKey}/${unit}/${interval}/${to_date}/${from_date}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPSTOX_TOKEN}`,
                    Accept: "application/json"
                }
            }
        );

        return response.data?.data?.candles || [];
    } catch (error: any) {
        console.error(
            `Error fetching chunk [${from_date} to ${to_date}]:`,
            error.response?.status,
            error.response?.data || error.message
        );
        return [];
    }
}

async function fetchIntradayCandles(
    encodedInstrumentKey: string,
    unit: string,
    interval: number
) {
    try {
        const response = await axios.get(
            `https://api.upstox.com/v3/historical-candle/intraday/${encodedInstrumentKey}/${unit}/${interval}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPSTOX_TOKEN}`,
                    Accept: "application/json"
                }
            }
        );

        const candles = response.data?.data?.candles || [];
        console.log(`Fetched ${candles.length} intraday candles for today's session.`);
        return candles;
    } catch (error: any) {
        console.error(
            "Error fetching intraday candles:",
            error.response?.status,
            error.response?.data || error.message
        );
        return [];
    }
}

async function fetchHistChart(
    instrument_key: string,
    unit: string,
    interval: number,
    to_date: string,
    from_date: string
) {
    const encodedInstrumentKey = encodeURIComponent(instrument_key);

    // Upstox limit rules:
    // - Minutes (1-15 min): Max 30 days per chunk
    // - Minutes (>15 min, e.g. 30m) & Hours: Max 90 days per chunk
    // - Days: Max 365 days per chunk
    let chunkSizeDays = 30;
    if (unit === "minutes" && interval <= 15) {
        chunkSizeDays = 30;
    } else if (unit === "minutes" || unit === "hours") {
        chunkSizeDays = 90;
    } else if (unit === "days") {
        chunkSizeDays = 365;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const yesterdayObj = new Date();
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    const yesterdayStr = yesterdayObj.toISOString().split("T")[0];

    // Cap historical endpoint's to_date at yesterday so Upstox API never fails when requesting today
    const histToDate = to_date >= todayStr ? yesterdayStr : to_date;

    const fromTime = new Date(from_date).getTime();
    const toTime = new Date(histToDate).getTime();
    const diffDays = Math.ceil((toTime - fromTime) / (1000 * 60 * 60 * 24));

    let historicalCandles: any[] = [];

    if (diffDays > 0) {
        if (diffDays <= chunkSizeDays) {
            historicalCandles = await fetchSingleChunk(encodedInstrumentKey, unit, interval, histToDate, from_date);
        } else {
            const chunks = generateDateChunks(from_date, histToDate, chunkSizeDays);
            console.log(`Fetching ${unit} (${interval}) candles in ${chunks.length} chunks of ${chunkSizeDays} days...`);

            for (const chunk of chunks) {
                const candles = await fetchSingleChunk(
                    encodedInstrumentKey,
                    unit,
                    interval,
                    chunk.to,
                    chunk.from
                );
                historicalCandles = historicalCandles.concat(candles);
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        }
    }

    // Fetch today's intraday candles if target to_date includes current session
    const isFetchingCurrentSession = to_date >= yesterdayStr;
    const intradayCandles = isFetchingCurrentSession ? await fetchIntradayCandles(encodedInstrumentKey, unit, interval) : [];

    // Merge historical + intraday, deduplicate by timestamp (candle[0])
    const allCandles = [...historicalCandles, ...intradayCandles];
    const candleMap = new Map<string, any>();
    for (const candle of allCandles) {
        candleMap.set(candle[0], candle);
    }
    const uniqueCandles = Array.from(candleMap.values());

    console.log(`Total merged candles for ${unit}/${interval}: ${uniqueCandles.length} (${historicalCandles.length} historical + ${intradayCandles.length} intraday)`);
    return uniqueCandles;
}

export default fetchHistChart;