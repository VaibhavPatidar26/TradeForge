import "dotenv/config";
import axios from "axios";

const token = process.env.UPSTOX_TOKEN;

if (!token) {
    throw new Error("UPSTOX_ACCESS_TOKEN is missing");
}

async function getFeedUrl() {
    try {
        const response = await axios.get(
            "https://api.upstox.com/v3/feed/market-data-feed/authorize",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        console.log(response.data);

    } catch (error: any) {
        console.error(
            "Upstox authorization failed:",
            error.response?.data || error.message
        );
    }
}

getFeedUrl();