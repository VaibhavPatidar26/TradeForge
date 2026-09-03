import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import SidePanel from "../components/layout/Sidebar";
import {
  LogOut,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);


  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

 return (
    <div className="flex flex-col h-[90.5vh] w-full overflow-hidden bg-[#0b0e11]">
      
      {/* 1. Your Top Navigation Bar (TradeForge, Search, Balance, etc.) goes here */}
      {/* <TopNavigationBar /> */}

      {/* 2. The main workspace takes the remaining vertical space */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar locked to the left */}
        <SidePanel />
        
        {/* Main Charting/Trading Interface */}
        <div className="flex-1 overflow-y-auto p-4 text-white">
          {/* Dashboard content */}
        </div>
        
      </div>
    </div>
  );
}
