import { useStockStore } from "../../store/stockStore";
import buying from "../../api/buying";
import selling from "../../api/selling";
import { useAuthStore } from "../../store/authStore";
import { usePriceStore } from "../../store/priceStore";
import usePortfolioStore from "../../store/portFolioStore";
import { useState } from "react";

export default function OrderPanel() {

  const [qty, setQty] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const currentStock = useStockStore(function(state) {
    return state.stock;
  });

  const token = useAuthStore(function(state) {
    return state.token;
  });

  const livePrices = usePriceStore(function(state) {
    return state.prices;
  });

  const holdings = usePortfolioStore(function(state) {
    return state.holdings;
  });

  const fetchPortfolio = usePortfolioStore(function(state) {
    return state.fetchPortfolio;
  });

  const currentPrice = currentStock ? livePrices[currentStock.instrument_key] : undefined;

  const currentHolding = holdings.find(function(item) {
    return (
      item.stockId === currentStock?.instrument_key ||
      item.stock?.instrument_key === currentStock?.instrument_key
    );
  });

  const holdingQty = currentHolding ? currentHolding.quantity : 0;

  async function handleBuy() {
    if (!token || !currentStock || !qty || qty <= 0) {
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await buying(
        token,
        currentStock.instrument_key,
        qty
      );

      console.log(currentStock);
      console.log("this is response", response);

      setStatusMessage({
        type: "success",
        text: response?.data?.message || "Buy order completed successfully"
      });
      setQty(undefined);
      await fetchPortfolio(token);
    } catch (err: any) {
      console.error("BUY ERROR:", err);
      setStatusMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to execute buy order"
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSell() {
    if (!token || !currentStock || !qty || qty <= 0) {
      return;
    }

    if (qty > holdingQty) {
      setStatusMessage({
        type: "error",
        text: `Insufficient quantity. You hold ${holdingQty} shares.`
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await selling(
        token,
        currentStock.instrument_key,
        qty
      );

      console.log(currentStock);
      console.log("this is response", response);

      setStatusMessage({
        type: "success",
        text: response?.data?.message || "Stock sold successfully"
      });
      setQty(undefined);
      await fetchPortfolio(token);
    } catch (err: any) {
      console.error("SELL ERROR:", err);
      setStatusMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to sell stock"
      });
    } finally {
      setLoading(false);
    }
  }

  function fmt(n: number): string {
    return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return (
    <div className="w-[300px] h-full bg-[#0b0e14] border-l border-[#1f2937] p-4 flex flex-col">

      {/* Header */}
      <h2 className="text-lg font-semibold text-white mb-4">
        Market Order
      </h2>

      {/* Stock details */}
      {currentStock ? (
        <div className="rounded-lg border border-[#1f2630] bg-[#11161c] p-3 mb-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-200 truncate">
                {currentStock.name}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1.5">
                <span>{currentStock.trading_symbol}</span>
                {currentStock.exchange && (
                  <span className="rounded border border-[#252b33] px-1 py-px text-[9px] uppercase tracking-wide text-gray-400">
                    {currentStock.exchange}
                  </span>
                )}
              </p>
            </div>

            {/* Current Price */}
            <div className="flex flex-col items-end shrink-0 tabular-nums">
              {currentPrice !== undefined ? (
                <>
                  <span className="text-sm font-semibold text-gray-200">
                    ₹{fmt(currentPrice)}
                  </span>
                  <span className="text-[9px] text-emerald-500/90 font-medium">● Live</span>
                </>
              ) : (
                <span className="text-xs text-gray-500">—</span>
              )}
            </div>
          </div>

          {/* Holding badge */}
          <div className="mt-2.5 pt-2 border-t border-[#1f2630] flex items-center justify-between text-xs">
            <span className="text-gray-500">Holdings:</span>
            <span className={`font-medium tabular-nums ${holdingQty > 0 ? "text-emerald-400" : "text-gray-400"}`}>
              {holdingQty} shares
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-[#252b33] bg-[#11161c]/40 p-4 text-center mb-5">
          <p className="text-xs text-gray-400 font-medium">No stock selected</p>
          <p className="text-[11px] text-gray-500 mt-1">Pick a stock from Watchlist or Portfolio to trade</p>
        </div>
      )}

      {/* Input Section */}
      <div className="flex flex-col gap-2 mb-4">

        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            Quantity
          </label>
          {holdingQty > 0 && (
            <button
              type="button"
              onClick={function() {
                setQty(holdingQty);
              }}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer transition-colors"
            >
              Sell Max ({holdingQty})
            </button>
          )}
        </div>

        <input
          type="number"
          min="1"
          value={qty ?? ""}
          onChange={function(e) {
            const val = e.target.value;
            setQty(val === "" ? undefined : Number(val));
          }}
          placeholder="0"
          className="h-10 w-full bg-[#131722] text-white border border-[#2a2e39] rounded px-3 focus:outline-none focus:border-[#089981] placeholder-gray-600 transition-colors"
        />

      </div>

      {/* Estimated Value */}
      {currentPrice !== undefined && qty && qty > 0 ? (
        <div className="rounded-lg bg-[#11161c] border border-[#1f2630] p-3 mb-4 text-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span>Estimated Value:</span>
            <span className="text-gray-100 font-semibold tabular-nums">
              ₹{fmt(currentPrice * qty)}
            </span>
          </div>
        </div>
      ) : null}

      {/* Feedback Message */}
      {statusMessage && (
        <div className={`mb-4 rounded-lg p-2.5 text-xs ${
          statusMessage.type === "success"
            ? "bg-emerald-950/40 border border-emerald-800/50 text-emerald-400"
            : "bg-red-950/40 border border-red-800/50 text-red-400"
        }`}>
          {statusMessage.text}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto mb-4">

        <button
          onClick={handleBuy}
          disabled={!currentStock || !qty || qty <= 0 || loading}
          className="flex-1 bg-[#089981] hover:bg-[#067a67] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded transition-colors"
        >
          {loading ? "..." : "BUY"}
        </button>

        <button
          onClick={handleSell}
          disabled={!currentStock || !qty || qty <= 0 || loading || holdingQty <= 0}
          className="flex-1 bg-[#f23645] hover:bg-[#c22b37] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded transition-colors"
        >
          {loading ? "..." : "SELL"}
        </button>

      </div>

    </div>
  );
}