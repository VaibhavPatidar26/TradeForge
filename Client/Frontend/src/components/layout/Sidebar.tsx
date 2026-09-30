import { MarketTicker } from "../SideBarParts/MarketTicker";
import SearchBar from "../SideBarParts/SearchBar";
import BottomPanelNavigation from "../SideBarParts/PanelNavigation";
import MainContent from "../SideBarParts/MainContent";

interface SidePanelProps {
  onSelectStockMobile?: () => void;
}

function SidePanel({ onSelectStockMobile }: SidePanelProps) {
  return (
    // overflow-visible on the outer container so the search dropdown can escape
    <div className="flex flex-col h-full w-full bg-[#0b0e11] text-white border-r border-[#1f242b]">
      <div className="p-3 pb-0 shrink-0 relative">
        <MarketTicker onSelectStockMobile={onSelectStockMobile} />
        <div className="mt-4">
          <SearchBar />
        </div>
      </div>
      
      {/* This component will now safely scroll internally */}
      <MainContent onSelectStockMobile={onSelectStockMobile} />
      
      <div className="shrink-0">
        <BottomPanelNavigation />
      </div>
    </div>
  );
}

export default SidePanel;