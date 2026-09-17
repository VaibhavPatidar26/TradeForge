import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import SidePanel from "../components/layout/Sidebar";
import useWebSocket from "../hooks/UseWebSocket";
import OrderPanel from "../components/layout/OrderPanel";
import Chart from "../components/layout/Chart";

export default function Dashboard() {
  const navigate = useNavigate();




  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Handles auth_connection handshake + PRICE_UPDATE -> watchListStore wiring
  useWebSocket();

return (
    <div className="flex flex-col h-[90.5vh] w-full overflow-hidden bg-[#0b0e11]">
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar locked to the left */}
        <SidePanel />
        
        {/* Main Charting/Trading Interface (Center Content) */}
        <div className="flex-1 text-white flex flex-col overflow-hidden">
          {/* Chart fills all available space */}
          <Chart></Chart>
        </div>
        
        {/* OrderPanel locked to the right */}
        <OrderPanel />
        
      </div>
    </div>
  );
}