
import axios from "axios";
import React from "react";
import { useAuthStore } from "../../store/authStore";
import StockCard from "../../components/market/StockCard";
import { useWatchlistStore } from "../../store/watchListStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Props = {
    Stocks: any[];
};

export default function FloatingWindow({ Stocks = [] }: Props) {

    const token = useAuthStore(function (state) {
        return state.token;
    });

    // function addToWatchListHandler(stockId: string) {
    //     axios.post(
    //         `${BACKEND_URL}/api/user/addTolist/${stockId}`,
    //         {},
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     );
    // }
    const addToWatchList = useWatchlistStore(function(state){
        return state.addToWatchlist
    })

async function addToWatchListHandler(stockId: string) {
    if (!token) {
        return;
    }

    await addToWatchList(stockId, token);
}

    if (Stocks.length === 0) {
        return null;
    }

    return (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-lg border border-[#252b33] bg-[#11161c] shadow-2xl shadow-black/60">
            {Stocks.map(function (item) {
                return (
                    <StockCard
                        key={item.instrument_key}
                        stock={item}
                        onAdd={addToWatchListHandler}
                    />
                );
            })}
        </div>
    );
}

