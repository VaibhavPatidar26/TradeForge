import React, { useEffect } from "react";
import { usePanelStore } from "../../store/SideBarStore";
import { useWatchlistStore } from "../../store/watchListStore";
import { useAuthStore } from "../../store/authStore";

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

    useEffect(function () {
        if (token) {
            fetchWatchlist(token);
        }
    }, [token, fetchWatchlist]);


    if (currentPanel === "watchlist") {
        return (
            <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white p-3">
                <h1 className="text-lg font-semibold">Watchlist</h1>

                {watchlist.map(function (item) {
                    return (
                        <div key={item.id}>
                            {item.stock.name}
                        </div>
                    );
                })}
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