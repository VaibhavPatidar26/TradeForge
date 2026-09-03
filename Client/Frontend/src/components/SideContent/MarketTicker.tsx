import React from "react";

export function MarketTicker() {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="flex flex-col">
        <span className="text-[11px] text-gray-500 uppercase tracking-wide">
          Sensex
        </span>
        <span className="text-sm font-medium text-gray-200">
          50,000.00
        </span>
      </div>

      <div className="h-7 w-px bg-[#252b33]" />

      <div className="flex flex-col">
        <span className="text-[11px] text-gray-500 uppercase tracking-wide">
          Nifty 50
        </span>
        <span className="text-sm font-medium text-gray-200">
          18,000.00
        </span>
      </div>
    </div>
  );
}