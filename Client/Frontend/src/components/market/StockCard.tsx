import React from "react";
import { useWatchlistStore } from "../../store/watchListStore";

type Stock = {
    instrument_key: string;
    name: string;
    exchange: string;
    trading_symbol: string;
};

type Props = {
    stock: Stock;
    onAdd?: (stockId: string) => void;
    onRemove?: (stockId: string) => void;
    isWatchlistView?: boolean;
};

export default function StockCard({ stock, onAdd, onRemove, isWatchlistView = false }: Props) {
    // Subscribe directly to the watchlist array for instant re-renders
    const watchlist = useWatchlistStore((state) => state.watchlist);

    // Check if item exists in watchlist
    const alreadyAdded = watchlist.some((item) => 
        item?.stockId === stock?.instrument_key || item?.stock?.instrument_key === stock?.instrument_key
    );

    return (
        <div className="flex cursor-pointer items-center gap-3 border-b border-[#1a2028] px-3 py-2.5 transition-colors last:border-b-0 hover:bg-[#1a2028]">
            <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium text-gray-200">
                    {stock.name}
                </span>
                <span className="truncate text-[11px] text-gray-500">
                    {stock.trading_symbol}
                </span>
            </div>
            {stock.exchange && (
                <span className="shrink-0 rounded border border-[#252b33] px-1.5 py-0.5 text-[10px] font-medium uppercase text-gray-500">
                    {stock.exchange}
                </span>
            )}
            
            {isWatchlistView ? (
                /* Watchlist view: Show delete button */
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onRemove) onRemove(stock.instrument_key);
                    }}
                    className="shrink-0 rounded p-1 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-500"
                    title="Remove from watchlist"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            ) : (
                /* Search floating window: Show + or Green Tick */
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!alreadyAdded && onAdd) {
                            onAdd(stock.instrument_key);
                        }
                    }}
                    className={`shrink-0 rounded p-1 transition-colors ${
                        alreadyAdded ? "text-emerald-500 cursor-default" : "text-gray-500 hover:bg-[#252b33] hover:text-white"
                    }`}
                    title={alreadyAdded ? "Already in watchlist" : "Add to watchlist"}
                >
                    {alreadyAdded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
}