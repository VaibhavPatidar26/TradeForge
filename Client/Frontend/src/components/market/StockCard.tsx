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
    onAdd: (stockId: string) => void;
};

export default function StockCard({ stock, onAdd }: Props) {

    const isInWatchList = useWatchlistStore(function (state) {
        return state.isInWatchlist;
    });

    const alreadyAdded = isInWatchList(stock.instrument_key);

    return (
        <div
            className="flex cursor-pointer items-center gap-3 border-b border-[#1a2028] px-3 py-2.5 transition-colors last:border-b-0 hover:bg-[#1a2028]"
        >
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

            <button
                onClick={function (e) {
                    e.stopPropagation();

                    if (!alreadyAdded) {
                        onAdd(stock.instrument_key);
                    }
                }}
                className="shrink-0 rounded p-1 text-gray-500 transition-colors hover:bg-[#252b33] hover:text-white"
                title={
                    alreadyAdded
                        ? "Already in watchlist"
                        : "Add to watchlist"
                }
            >
                {alreadyAdded ? (
                    <span className="text-green-500">✓</span>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                    </svg>
                )}
            </button>
        </div>
    );
}