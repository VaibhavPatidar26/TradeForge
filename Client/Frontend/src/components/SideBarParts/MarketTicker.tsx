import { usePriceStore } from "../../store/priceStore";
import { useStockStore } from "../../store/stockStore";

export const SENSEX_INDEX = {
  instrument_key: "BSE_INDEX|SENSEX",
  name: "SENSEX",
  trading_symbol: "SENSEX",
  exchange: "BSE",
  segment: "INDEX",
  instrument_type: "INDEX"
};

export const NIFTY_INDEX = {
  instrument_key: "NSE_INDEX|Nifty 50",
  name: "NIFTY 50",
  trading_symbol: "NIFTY 50",
  exchange: "NSE",
  segment: "INDEX",
  instrument_type: "INDEX"
};

interface MarketTickerProps {
  onSelectStockMobile?: () => void;
}

export function MarketTicker({ onSelectStockMobile }: MarketTickerProps) {
  const prices = usePriceStore((state) => state.prices);
  const currentStock = useStockStore((state) => state.stock);
  const setStock = useStockStore((state) => state.setStock);

  const sensexPrice = prices[SENSEX_INDEX.instrument_key] ?? prices["BSE_INDEX|1"] ?? prices["SENSEX"];
  const niftyPrice = prices[NIFTY_INDEX.instrument_key] ?? prices["NSE_INDEX|26000"] ?? prices["NIFTY 50"];

  const isSensexSelected = currentStock?.instrument_key === SENSEX_INDEX.instrument_key;
  const isNiftySelected = currentStock?.instrument_key === NIFTY_INDEX.instrument_key;

  function fmt(n: number) {
    return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function handleSelect(stockObj: typeof SENSEX_INDEX) {
    setStock(stockObj);
    if (onSelectStockMobile) {
      onSelectStockMobile();
    }
  }

  return (
    <div className="flex items-center justify-between mb-4 px-1 gap-2">
      {/* Sensex Card */}
      <button
        type="button"
        onClick={() => handleSelect(SENSEX_INDEX)}
        className={`flex-1 flex flex-col p-2.5 rounded-lg border transition-all text-left cursor-pointer ${
          isSensexSelected
            ? "border-emerald-500/80 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
            : "border-[#252b33] bg-[#11161c]/60 hover:bg-[#11161c] hover:border-gray-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
            Sensex
          </span>
          <span className="text-[9px] text-gray-400 border border-zinc-700/60 px-1 rounded">BSE</span>
        </div>
        <span className="text-sm font-semibold text-gray-100 tabular-nums mt-1">
          {sensexPrice ? `₹${fmt(sensexPrice)}` : "74,250.00"}
        </span>
        <span className="text-[10px] text-emerald-400/90 font-medium mt-0.5">
          {sensexPrice ? "● Live Index" : "● Index"}
        </span>
      </button>

      <div className="h-9 w-px bg-[#252b33] shrink-0 self-center" />

      {/* Nifty 50 Card */}
      <button
        type="button"
        onClick={() => handleSelect(NIFTY_INDEX)}
        className={`flex-1 flex flex-col p-2.5 rounded-lg border transition-all text-left cursor-pointer ${
          isNiftySelected
            ? "border-emerald-500/80 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
            : "border-[#252b33] bg-[#11161c]/60 hover:bg-[#11161c] hover:border-gray-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
            Nifty 50
          </span>
          <span className="text-[9px] text-gray-400 border border-zinc-700/60 px-1 rounded">NSE</span>
        </div>
        <span className="text-sm font-semibold text-gray-100 tabular-nums mt-1">
          {niftyPrice ? `₹${fmt(niftyPrice)}` : "22,500.00"}
        </span>
        <span className="text-[10px] text-emerald-400/90 font-medium mt-0.5">
          {niftyPrice ? "● Live Index" : "● Index"}
        </span>
      </button>
    </div>
  );
}

export default MarketTicker;