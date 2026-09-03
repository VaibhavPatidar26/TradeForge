import React from "react";
import { usePanelStore } from "../../store/SideBarStore";

export default function BottomPanelNavigation() {
  const { currentPanel, setCurrentPanel } = usePanelStore();

  // Define our base and conditional styles
  const baseTabStyle = "flex-1 py-3 text-xs font-medium transition-all duration-200 outline-none";
  const activeTabStyle = "text-emerald-500 border-t-2 border-emerald-500 bg-[#11161c]";
  const inactiveTabStyle = "text-gray-500 border-t-2 border-transparent hover:text-gray-300 hover:bg-[#11161c]/50";

  return (
    <div className="flex w-full bg-[#0b0e11] border-t border-[#1f242b] shrink-0">
      <button
        onClick={() => setCurrentPanel("watchlist")}
        className={`${baseTabStyle} ${
          currentPanel === "watchlist" ? activeTabStyle : inactiveTabStyle
        }`}
      >
        Watchlist
      </button>
      
      <button
        onClick={() => setCurrentPanel("portfolio")}
        className={`${baseTabStyle} ${
          currentPanel === "portfolio" ? activeTabStyle : inactiveTabStyle
        }`}
      >
        Portfolio
      </button>
    </div>
  );
}