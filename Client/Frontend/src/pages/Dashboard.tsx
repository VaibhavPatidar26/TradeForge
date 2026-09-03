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
   
         <>
         <div>
          <SidePanel></SidePanel>
         </div>
         </>

      
    
  
  )
}