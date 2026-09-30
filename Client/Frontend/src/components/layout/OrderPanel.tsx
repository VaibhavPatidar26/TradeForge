import { useStockStore } from "../../store/stockStore";
import buying from "../../api/buying";
import selling from "../../api/selling";
import { limitBuy } from "../../api/limitBuying";
import { limitSell } from "../../api/limitSelling";
import { useAuthStore } from "../../store/authStore";
import { usePriceStore } from "../../store/priceStore";
import usePortfolioStore from "../../store/portFolioStore";
import { useOrdersStore } from "../../store/ordersStore";
import { useUserStore } from "../../store/userStore";
import { useState, useEffect } from "react";

type OrderMode = "MARKET" | "LIMIT";

export default function OrderPanel() {
  const [orderMode, setOrderMode]         = useState<OrderMode>("MARKET");
  const [qty, setQty]                     = useState<number>();
  const [limitPrice, setLimitPrice]       = useState<number>();
  const [loading, setLoading]             = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const currentStock     = useStockStore((s) => s.stock);
  const token            = useAuthStore((s) => s.token);
  const livePrices       = usePriceStore((s) => s.prices);
  const holdings         = usePortfolioStore((s) => s.holdings);
  const fetchPortfolio   = usePortfolioStore((s) => s.fetchPortfolio);
  const fetchTodayOrders = useOrdersStore((s) => s.fetchTodayOrders);
  const balance          = useUserStore((s) => s.balance);
  const fetchUser        = useUserStore((s) => s.fetchUser);

  useEffect(() => {
    if (token) fetchUser(token);
  }, [token, fetchUser]);

  const isIndex = currentStock ? (
    currentStock.segment === "INDEX" ||
    currentStock.instrument_type === "INDEX" ||
    currentStock.instrument_key?.includes("INDEX")
  ) : false;

  const currentPrice  = currentStock ? livePrices[currentStock.instrument_key] : undefined;
  const currentHolding = holdings.find(
    (h) =>
      h.stockId === currentStock?.instrument_key ||
      h.stock?.instrument_key === currentStock?.instrument_key
  );
  const holdingQty = currentHolding ? Number(currentHolding.quantity) : 0;

  // Estimated value shown below the inputs
  const execPrice  = orderMode === "LIMIT" ? limitPrice : currentPrice;
  const estValue   = execPrice && qty && qty > 0 ? execPrice * qty : null;

  function resetForm() {
    setQty(undefined);
    setLimitPrice(undefined);
    setStatusMessage(null);
  }

  async function handleBuy() {
    if (isIndex || !token || !currentStock || !qty || qty <= 0) return;
    if (orderMode === "LIMIT" && (!limitPrice || limitPrice <= 0)) {
      setStatusMessage({ type: "error", text: "Please enter a valid limit price" });
      return;
    }
    setLoading(true);
    setStatusMessage(null);
    try {
      let response: any;
      if (orderMode === "MARKET") {
        response = await buying(token, currentStock.instrument_key, qty);
      } else {
        response = await limitBuy(token, currentStock.instrument_key, qty, limitPrice!);
      }
      setStatusMessage({ type: "success", text: response?.data?.message || "Order placed" });
      setQty(undefined);
      setLimitPrice(undefined);
      await Promise.all([
        fetchPortfolio(token),
        fetchTodayOrders(token),
        fetchUser(token)
      ]);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.response?.data?.message || "Failed to place order" });
    } finally {
      setLoading(false);
    }
  }

  async function handleSell() {
    if (isIndex || !token || !currentStock || !qty || qty <= 0) return;
    if (orderMode === "LIMIT" && (!limitPrice || limitPrice <= 0)) {
      setStatusMessage({ type: "error", text: "Please enter a valid limit price" });
      return;
    }
    setLoading(true);
    setStatusMessage(null);
    try {
      let response: any;
      if (orderMode === "MARKET") {
        response = await selling(token, currentStock.instrument_key, qty);
      } else {
        response = await limitSell(token, currentStock.instrument_key, qty, limitPrice!);
      }
      setStatusMessage({ type: "success", text: response?.data?.message || "Order placed" });
      setQty(undefined);
      setLimitPrice(undefined);
      await Promise.all([
        fetchPortfolio(token),
        fetchTodayOrders(token),
        fetchUser(token)
      ]);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.response?.data?.message || "Failed to place order" });
    } finally {
      setLoading(false);
    }
  }

  function fmt(n: number) {
    return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return (
    <div className="w-full h-full bg-[#0b0e14] border-l border-[#1f2937] flex flex-col">

      {/* ── Mode toggle header ──────────────────────────────────────────── */}
      <div className="flex border-b border-[#1f2937] shrink-0">
        <button
          onClick={() => { setOrderMode("MARKET"); resetForm(); }}
          className={`flex-1 py-3 text-xs font-semibold tracking-wide transition-colors border-b-2 ${
            orderMode === "MARKET"
              ? "border-emerald-500 text-emerald-400 bg-[#11161c]"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          Market Order
        </button>
        <button
          onClick={() => { setOrderMode("LIMIT"); resetForm(); }}
          className={`flex-1 py-3 text-xs font-semibold tracking-wide transition-colors border-b-2 ${
            orderMode === "LIMIT"
              ? "border-blue-500 text-blue-400 bg-[#11161c]"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          Limit Order
        </button>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

        {/* Stock details card */}
        {currentStock ? (
          <div className="rounded-lg border border-[#1f2630] bg-[#11161c] p-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-200 truncate">{currentStock.name}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1.5">
                  <span>{currentStock.trading_symbol}</span>
                  {currentStock.exchange && (
                    <span className="rounded border border-[#252b33] px-1 py-px text-[9px] uppercase tracking-wide text-gray-400">
                      {currentStock.exchange}
                    </span>
                  )}
                </p>
              </div>
              {/* Live price */}
              <div className="flex flex-col items-end shrink-0 tabular-nums">
                {currentPrice !== undefined ? (
                  <>
                    <span className="text-sm font-semibold text-gray-200">₹{fmt(currentPrice)}</span>
                    <span className="text-[9px] text-emerald-500/90 font-medium">● Live</span>
                  </>
                ) : (
                  <span className="text-xs text-gray-500">—</span>
                )}
              </div>
            </div>
            {/* Holdings & Balance rows */}
            <div className="pt-2 border-t border-[#1f2630] flex items-center justify-between text-xs">
              <span className="text-gray-500">Position / Holdings:</span>
              <span className={`font-medium tabular-nums ${holdingQty > 0 ? "text-emerald-400" : holdingQty < 0 ? "text-red-400" : "text-gray-400"}`}>
                {holdingQty > 0
                  ? `${holdingQty} shares (LONG)`
                  : holdingQty < 0
                  ? `${Math.abs(holdingQty)} shares (SHORT)`
                  : "0 shares"}
              </span>
            </div>
            <div className="pt-1.5 flex items-center justify-between text-xs">
              <span className="text-gray-500">Avail. Cash:</span>
              <span className="font-medium tabular-nums text-emerald-400">
                {balance != null ? `₹${fmt(balance)}` : "—"}
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#252b33] bg-[#11161c]/40 p-4 text-center">
            <p className="text-xs text-gray-400 font-medium">No stock selected</p>
            <p className="text-[11px] text-gray-500 mt-1">Pick a stock from Watchlist or Portfolio</p>
          </div>
        )}

        {/* Index Notice */}
        {isIndex && (
          <div className="rounded-lg border border-emerald-900/40 bg-emerald-950/20 p-3 text-xs text-emerald-300">
            <p className="font-semibold">Market Index Selected</p>
            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
              You are currently analyzing {currentStock?.name} on the interactive chart. To place Buy or Sell orders, select an individual stock.
            </p>
          </div>
        )}

        {/* ── Inputs ──────────────────────────────────────────────────── */}
        {!isIndex && (
          <div className="flex flex-col gap-3">

            {/* Quantity */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Quantity</label>
                {holdingQty !== 0 && (
                  <button
                    type="button"
                    onClick={() => setQty(Math.abs(holdingQty))}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    {holdingQty > 0 ? `Max (${holdingQty})` : `Cover All (${Math.abs(holdingQty)})`}
                  </button>
                )}
              </div>
              <input
                type="number"
                min="1"
                value={qty ?? ""}
                onChange={(e) => setQty(e.target.value === "" ? undefined : Number(e.target.value))}
                placeholder="0"
                className="h-10 w-full bg-[#131722] text-white border border-[#2a2e39] rounded px-3 focus:outline-none focus:border-[#089981] placeholder-gray-600 transition-colors text-sm"
              />
            </div>

            {/* Limit Price — only shown in LIMIT mode */}
            {orderMode === "LIMIT" && (
              <div>
                <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1 block">
                  Limit Price (₹)
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.05"
                  value={limitPrice ?? ""}
                  onChange={(e) => setLimitPrice(e.target.value === "" ? undefined : Number(e.target.value))}
                  placeholder={currentPrice != null ? fmt(currentPrice) : "0.00"}
                  className="h-10 w-full bg-[#131722] text-white border border-[#2a2e39] rounded px-3 focus:outline-none focus:border-blue-500 placeholder-gray-600 transition-colors text-sm"
                />
                {/* Helper hint */}
                {currentPrice && limitPrice && (
                  <p className={`text-[10px] mt-1 ${
                    limitPrice < currentPrice ? "text-emerald-400/70" : "text-blue-400/70"
                  }`}>
                    {limitPrice < currentPrice
                      ? `BUY will trigger below ₹${fmt(currentPrice)}`
                      : `SELL will trigger above ₹${fmt(currentPrice)}`}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Estimated value */}
        {!isIndex && estValue != null && (
          <div className="rounded-lg bg-[#11161c] border border-[#1f2630] p-3 text-xs">
            <div className="flex items-center justify-between text-gray-400">
              <span>{orderMode === "LIMIT" ? "Est. Value @ limit:" : "Est. Value:"}</span>
              <span className="text-gray-100 font-semibold tabular-nums">₹{fmt(estValue)}</span>
            </div>
            {orderMode === "LIMIT" && (
              <p className="text-[10px] text-gray-600 mt-1">
                ₹{fmt(limitPrice! * qty!)} locked from balance immediately
              </p>
            )}
          </div>
        )}

        {/* Feedback */}
        {statusMessage && (
          <div className={`rounded-lg p-2.5 text-xs ${
            statusMessage.type === "success"
              ? "bg-emerald-950/40 border border-emerald-800/50 text-emerald-400"
              : "bg-red-950/40 border border-red-800/50 text-red-400"
          }`}>
            {statusMessage.text}
          </div>
        )}
      </div>

      {/* ── Action buttons ────────────────────────────────────────────── */}
      <div className="flex gap-3 p-4 shrink-0 border-t border-[#1f2937]">
        <button
          onClick={handleBuy}
          disabled={isIndex || !currentStock || !qty || qty <= 0 || loading || (orderMode === "LIMIT" && (!limitPrice || limitPrice <= 0))}
          className="flex-1 bg-[#089981] hover:bg-[#067a67] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded transition-colors text-sm"
        >
          {loading ? "…" : holdingQty < 0 ? "BUY (COVER)" : "BUY"}
        </button>
        <button
          onClick={handleSell}
          disabled={isIndex || !currentStock || !qty || qty <= 0 || loading || (orderMode === "LIMIT" && (!limitPrice || limitPrice <= 0))}
          className="flex-1 bg-[#f23645] hover:bg-[#c22b37] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded transition-colors text-sm"
        >
          {loading ? "…" : holdingQty <= 0 ? "SHORT SELL" : "SELL"}
        </button>
      </div>
    </div>
  );
}