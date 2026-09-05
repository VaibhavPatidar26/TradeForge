import React from "react";
import { useAuthStore } from "../../store/authStore";
import StockCard from "../../components/market/StockCard";
import { useWatchlistStore } from "../../store/watchListStore";

type Props = {
    Stocks: any[];
};

export default function FloatingWindow({ Stocks = [] }: Props) {
    const token = useAuthStore((state) => state.token);
    const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);

    async function addToWatchListHandler(stockId: string) {
        if (!token) return;
        await addToWatchlist(stockId, token);
    }

    if (Stocks.length === 0) {
        return null;
    }

    return (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-lg border border-[#252b33] bg-[#11161c] shadow-2xl shadow-black/60">
            {Stocks.map((item) => (
                <StockCard
                    key={item.instrument_key}
                    stock={item}
                    onAdd={addToWatchListHandler}
                />
            ))}
        </div>
    );
}