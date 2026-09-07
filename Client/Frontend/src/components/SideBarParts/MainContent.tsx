import React, { useEffect } from "react";
import { usePanelStore } from "../../store/SideBarStore";
import { useWatchlistStore } from "../../store/watchListStore";
import { useAuthStore } from "../../store/authStore";
import StockCard from "../market/StockCard";

export default function MainContent() {
    const { currentPanel } = usePanelStore();
    const token = useAuthStore(function (state) {
        return state.token;
    });

    const watchlist = useWatchlistStore(function (state) {
        return state.watchlist;
    });
    
    const fetchWatchlist = useWatchlistStore(function (state) {
        return state.fetchWatchlist;
    });

    const removeFromWatchlist = useWatchlistStore(function (state) {
        return state.removeFromWatchlist;
    });

    useEffect(function () {
        if (token) {
            fetchWatchlist(token);
        }
    }, [token, fetchWatchlist]);

    if (currentPanel === "watchlist") {
        return (
            <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white p-3 overflow-y-auto">
                <h1 className="text-lg font-semibold mb-3">Watchlist</h1>
                <div className="rounded-lg border border-[#252b33] bg-[#11161c] overflow-hidden">
                    {watchlist.length > 0 ? (
                        watchlist.filter(Boolean).map(function (item) {
                            return (
                                <StockCard 
                                    key={item.id} 
                                    stock={item.stock}
                                    isWatchlistView={true}
                                    onRemove={(stockId) => {
                                        if (token) removeFromWatchlist(stockId, token);
                                    }}
                                />
                            );
                        })
                    ) : (
                        <div className="p-4 text-center text-sm text-gray-500">
                            Your watchlist is empty
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (currentPanel === "portfolio") {
        return (
            <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white p-3">
                <h1 className="text-lg font-semibold">Portfolio</h1>
            </div>
        );
    }

    return null;
}