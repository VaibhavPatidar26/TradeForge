
import { useAuthStore } from "../../store/authStore";
import usePortfolioStore from "../../store/portFolioStore";
import { useEffect } from "react";
import { usePriceStore } from "../../store/priceStore";
import { useStockStore } from "../../store/stockStore";

export function Portfolio() {

    const setStock = useStockStore(function (state) {
        return state.setStock;
    });

    const token: string | null = useAuthStore(function (state) {
        return state.token;
    });

    const holdings = usePortfolioStore(function (state) {
        return state.holdings;
    });

    const isLoading: boolean = usePortfolioStore(function (state) {
        return state.isLoading;
    });

    const fetchPortfolio = usePortfolioStore(function (state) {
        return state.fetchPortfolio;
    });

    useEffect(function () {
        async function fetchHoldings(): Promise<void> {
            if (!token) return;
            await fetchPortfolio(token);
        }
        fetchHoldings();
    }, [token, fetchPortfolio]);

    const livePrice: Record<string, number> = usePriceStore(function (state) {
        return state.prices;
    });

    if (isLoading) {
        return (
            <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white p-4 flex flex-col gap-3">
                {/* Skeleton summary card */}
                <div className="rounded-xl bg-[#11161c] border border-[#252b33] p-4 animate-pulse">
                    <div className="h-3 w-24 bg-[#252b33] rounded mb-3" />
                    <div className="h-6 w-36 bg-[#252b33] rounded mb-2" />
                    <div className="h-3 w-20 bg-[#252b33] rounded" />
                </div>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg bg-[#11161c] border border-[#252b33] p-3 animate-pulse">
                        <div className="flex justify-between mb-2">
                            <div className="h-3 w-28 bg-[#252b33] rounded" />
                            <div className="h-3 w-16 bg-[#252b33] rounded" />
                        </div>
                        <div className="flex justify-between">
                            <div className="h-3 w-20 bg-[#252b33] rounded" />
                            <div className="h-3 w-12 bg-[#252b33] rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // ─── Portfolio-level totals ───────────────────────────────────────────────
    let totalInvested = 0;
    let totalCurrent  = 0;

    const enriched = holdings.map(function (holding) {
        const currentPrice = livePrice[holding.stock.instrument_key];
        const invested     = holding.avgPrice * holding.quantity;
        const current      = currentPrice !== undefined
            ? currentPrice * holding.quantity
            : invested; // fallback to invested when price not yet available

        const pnl        = current - invested;
        const pnlPct     = invested > 0 ? (pnl / invested) * 100 : 0;
        const hasLive    = currentPrice !== undefined;

        totalInvested += invested;
        totalCurrent  += current;

        return { ...holding, currentPrice, invested, current, pnl, pnlPct, hasLive };
    });

    const totalPnL    = totalCurrent - totalInvested;
    const totalPnLPct = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;
    const isProfit    = totalPnL >= 0;

    function fmt(n: number): string {
        return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    return (
        <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white flex flex-col overflow-hidden">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <div className="shrink-0 px-4 pt-4 pb-3">
                <h1 className="text-base font-semibold text-gray-200 tracking-wide">Portfolio</h1>
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-[#252b33]">

                {holdings.length === 0 ? (
                    /* ── Empty state ─────────────────────────────────────────────── */
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                        <div className="w-12 h-12 rounded-full bg-[#11161c] border border-[#252b33] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                className="text-gray-600">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500">No holdings yet</p>
                        <p className="text-xs text-gray-600">Your portfolio will appear here once you place your first trade.</p>
                    </div>
                ) : (
                    <>
                        {/* ── Summary Card ─────────────────────────────────────────── */}
                        <div className={`rounded-xl border p-4 ${isProfit ? "bg-emerald-950/20 border-emerald-800/30" : "bg-red-950/20 border-red-800/30"}`}>
                            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">Total Portfolio Value</p>

                            <p className="text-2xl font-bold text-gray-100 tabular-nums">
                                ₹{fmt(totalCurrent)}
                            </p>

                            <div className="flex items-center gap-2 mt-1.5">
                                {/* PnL badge */}
                                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${isProfit ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                                    {isProfit ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="18 15 12 9 6 15" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    )}
                                    {isProfit ? "+" : ""}{fmt(totalPnL)} ({isProfit ? "+" : ""}{totalPnLPct.toFixed(2)}%)
                                </span>
                                <span className="text-[11px] text-gray-500">Invested ₹{fmt(totalInvested)}</span>
                            </div>

                            {/* Mini stats row */}
                            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] text-gray-600 mb-0.5">Holdings</p>
                                    <p className="text-sm font-medium text-gray-300">{holdings.length}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-600 mb-0.5">Day P&amp;L</p>
                                    <p className={`text-sm font-medium ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
                                        {isProfit ? "+" : ""}₹{fmt(totalPnL)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── Holdings list ─────────────────────────────────────────── */}
                        <div className="flex flex-col gap-2">
                            {enriched.map(function (holding) {

                                const positive = holding.pnl >= 0;

                                return (
                                    <div
                                        key={holding.id}
                                        onClick={function () {
                                            setStock({
                                                instrument_key: holding.stock.instrument_key,
                                                name: holding.stock.name,
                                                trading_symbol: holding.stock.trading_symbol,
                                                exchange: holding.stock.exchange,
                                                segment: "",
                                                instrument_type: ""
                                            });
                                        }}
                                        className="cursor-pointer rounded-lg bg-[#11161c] border border-[#1f2630] hover:border-[#2a3340] transition-colors p-3"
                                    >
                                        {/* Row 1 — Name + Current price */}
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="min-w-0">
                                                <p className="text-[13px] font-semibold text-gray-200 truncate leading-tight">
                                                    {holding.stock.name}
                                                </p>
                                                <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1.5">
                                                    <span>{holding.stock.trading_symbol}</span>
                                                    <span className="rounded border border-[#252b33] px-1 py-px text-[9px] uppercase tracking-wide">
                                                        {holding.stock.exchange}
                                                    </span>
                                                </p>
                                            </div>

                                            {/* Current price + live indicator */}
                                            <div className="flex flex-col items-end shrink-0 tabular-nums">
                                                {holding.hasLive ? (
                                                    <>
                                                        <span className="text-[13px] font-semibold text-gray-200">
                                                            ₹{fmt(holding.currentPrice!)}
                                                        </span>
                                                        <span className="text-[9px] text-emerald-500/80 font-medium">● Live</span>
                                                    </>
                                                ) : (
                                                    <span className="text-xs text-gray-600">—</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Row 2 — qty / avg / invested / current */}
                                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-2">
                                            <div className="flex justify-between">
                                                <span className="text-[10px] text-gray-600">Qty</span>
                                                <span className="text-[10px] text-gray-400 tabular-nums">{holding.quantity}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[10px] text-gray-600">Avg</span>
                                                <span className="text-[10px] text-gray-400 tabular-nums">₹{fmt(holding.avgPrice)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[10px] text-gray-600">Invested</span>
                                                <span className="text-[10px] text-gray-400 tabular-nums">₹{fmt(holding.invested)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[10px] text-gray-600">Current</span>
                                                <span className="text-[10px] text-gray-400 tabular-nums">
                                                    {holding.hasLive ? `₹${fmt(holding.current)}` : "—"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 3 — PnL pill */}
                                        <div className={`flex items-center justify-between rounded-md px-2 py-1.5 ${positive ? "bg-emerald-500/8" : "bg-red-500/8"}`}>
                                            <span className="text-[10px] text-gray-600">Net P&amp;L</span>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[11px] font-semibold tabular-nums ${positive ? "text-emerald-400" : "text-red-400"}`}>
                                                    {positive ? "+" : ""}₹{fmt(holding.pnl)}
                                                </span>
                                                <span className={`text-[10px] font-medium px-1.5 py-px rounded-full tabular-nums ${positive ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                                                    {positive ? "▲" : "▼"} {Math.abs(holding.pnlPct).toFixed(2)}%
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
