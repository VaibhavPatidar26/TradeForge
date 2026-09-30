import { useEffect } from "react";
import { usePanelStore } from "../../store/panelStore";
import { useWatchlistStore } from "../../store/watchListStore";
import { useAuthStore } from "../../store/authStore";
import StockCard from "../market/StockCard";
import { Portfolio } from "./Portfolio";
import { Orders } from "./Orders";

export default function MainContent({ onSelectStockMobile }: { onSelectStockMobile?: () => void }) {
    const { currentPanel } = usePanelStore();
    const token = useAuthStore((s) => s.token);

    const watchlist          = useWatchlistStore((s) => s.watchlist);
    const fetchWatchlist     = useWatchlistStore((s) => s.fetchWatchlist);
    const removeFromWatchlist = useWatchlistStore((s) => s.removeFromWatchlist);

    useEffect(function () {
        if (token) fetchWatchlist(token);
    }, [token, fetchWatchlist]);

    if (currentPanel === "watchlist") {
        return (
            <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white p-3 overflow-y-auto">
                <h1 className="text-lg font-semibold mb-3">Watchlist</h1>
                <div className="rounded-lg border border-[#252b33] bg-[#11161c] overflow-hidden">
                    {watchlist.length > 0 ? (
                        watchlist.filter(Boolean).map((item) => (
                            <StockCard
                                key={item.id}
                                stock={item.stock}
                                isWatchlistView={true}
                                onRemove={(stockId) => {
                                    if (token) removeFromWatchlist(stockId, token);
                                }}
                                onSelect={onSelectStockMobile}
                            />
                        ))
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
        return <Portfolio />;
    }

    if (currentPanel === "orders") {
        return <Orders />;
    }

    return null;
}