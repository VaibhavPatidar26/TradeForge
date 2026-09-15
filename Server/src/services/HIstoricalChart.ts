
import axios from "axios";
import "dotenv/config";

async function fetchHistChart(
    instrument_key: string,
    unit: string,
    interval: number,
    to_date: string,
    from_date: string
) {
    try {

        const encodedInstrumentKey = encodeURIComponent(instrument_key);

        const response = await axios.get(
            `https://api.upstox.com/v3/historical-candle/${encodedInstrumentKey}/${unit}/${interval}/${to_date}/${from_date}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.UPSTOX_TOKEN}`,
                    Accept: "application/json"
                }
            }
        );

        console.log("HISTORICAL DATA:", response.data.data.candles);

        return response.data.data.candles;

    }
    catch (error: any) {

        console.error(
            "Error:",
            error.response?.status,
            error.response?.data || error.message
        );

        return [];
    }
}

fetchHistChart(
    "NSE_EQ|INE016A01026",
    "days",
    1,
    "2026-09-15",
    "2026-09-01"
);

