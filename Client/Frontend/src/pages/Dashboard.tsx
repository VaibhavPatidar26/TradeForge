import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import SidePanel from "../components/layout/Sidebar";
import useWebSocket from "../hooks/UseWebSocket";
import OrderPanel from "../components/layout/OrderPanel";
import Chart from "../components/layout/Chart";
import { LineChart, ListFilter, ArrowRightLeft } from "lucide-react";

export type MobileTab = "chart" | "watchlist" | "trade";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const [mobileTab, setMobileTab] = useState<MobileTab>("chart");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Handles auth_connection handshake + PRICE_UPDATE -> watchListStore wiring
  useWebSocket();

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] sm:h-[calc(100dvh-3.5rem)] w-full overflow-hidden bg-[#0b0e11]">
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar (Watchlist/Portfolio/Orders) */}
        <div className={`h-full ${mobileTab === "watchlist" ? "flex w-full" : "hidden"} lg:flex lg:w-70 lg:shrink-0`}>
          <SidePanel onSelectStockMobile={() => setMobileTab("chart")} />
        </div>
        
        {/* Main Charting/Trading Interface (Center Content) */}
        <div className={`flex-1 text-white flex flex-col overflow-hidden ${mobileTab === "chart" ? "flex w-full" : "hidden lg:flex"}`}>
          <Chart />
        </div>
        
        {/* OrderPanel (Right / Mobile Trade View) */}
        <div className={`h-full ${mobileTab === "trade" ? "flex w-full" : "hidden"} lg:flex lg:w-[300px] lg:shrink-0`}>
          <OrderPanel />
        </div>
        
      </div>

      {/* Mobile Bottom Navigation Bar (< lg screens) */}
      <div className="lg:hidden flex items-center justify-around border-t border-[#1f242b] bg-[#0b0e11] py-2 shrink-0 select-none z-40">
        <button
          type="button"
          onClick={() => setMobileTab("watchlist")}
          className={`flex flex-col items-center gap-1 text-xs px-4 py-1 rounded-md transition-colors cursor-pointer ${
            mobileTab === "watchlist"
              ? "text-emerald-400 font-medium"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <ListFilter size={18} />
          <span>Watchlist</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab("chart")}
          className={`flex flex-col items-center gap-1 text-xs px-4 py-1 rounded-md transition-colors cursor-pointer ${
            mobileTab === "chart"
              ? "text-emerald-400 font-medium"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <LineChart size={18} />
          <span>Chart</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab("trade")}
          className={`flex flex-col items-center gap-1 text-xs px-4 py-1 rounded-md transition-colors cursor-pointer ${
            mobileTab === "trade"
              ? "text-emerald-400 font-medium"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <ArrowRightLeft size={18} />
          <span>Trade</span>
        </button>
      </div>
    </div>
  );
}