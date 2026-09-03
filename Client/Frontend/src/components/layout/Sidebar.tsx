import React from "react";
import { MarketTicker } from "../SideContent/MarketTicker";
import  SearchBar from "../SideContent/SearchBar";
import BottomPanelNavigation from "../SideContent/PanelNavigation";
import MainContent from "../SideContent/MainContent";

function SidePanel() {
  return (
    // overflow-visible on the outer container so the search dropdown can escape
    <div className="flex flex-col h-full w-70 bg-[#0b0e11] text-white border-r border-[#1f242b]">
      <div className="p-3 pb-0 shrink-0 relative">
        <MarketTicker />
        <div className="mt-4">
          <SearchBar />
        </div>
      </div>
      
      {/* This component will now safely scroll internally */}
      <MainContent />
      
      <div className="shrink-0">
        <BottomPanelNavigation />
      </div>
    </div>
  );
}


export default SidePanel;