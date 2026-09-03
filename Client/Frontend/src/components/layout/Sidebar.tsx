import React from "react";
import  {MarketTicker}  from "../SideContent/MarketTicker";
import { SearchBar } from "../SideContent/SearchBar";

function SidePanel() {
  return (
    <div className="h-screen w-70 bg-[#0b0e11] text-white border-r border-[#1f242b] p-3">
      <MarketTicker />
      <SearchBar />
      
      {/* Future MainContentArea goes here */}
    </div>
  );
}

export default SidePanel;