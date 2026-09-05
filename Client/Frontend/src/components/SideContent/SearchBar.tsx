import { LucideSearch } from "lucide-react";
import FloatingWindow from "../ui/FloatingWindow";
import { useState, useEffect, useRef } from "react"
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

export default function SearchBar() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const accesstoken = useAuthStore(function(state){
    return state.token;
  });

  const [searchStockName, setSearchStockName] = useState<string>("");
  const [availableStocks, SetavailableStocks] = useState<Array<any>>([]);
  
  // 1. Create a ref to track the search component's boundaries
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 2. Add an event listener to detect clicks outside the ref
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchStockName(""); // Clears the search text
        SetavailableStocks([]); // Closes the floating window
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(function(){
    if(searchStockName.trim() === ""){
      SetavailableStocks([]);
      return;
    }
    
    const timer = setTimeout(function() {
      async function SearchStock(name:string){
        try {
          const response = await axios.get(`${BACKEND_URL}api/search/searchStock?stockName=${name}`,{
            headers:{
              Authorization : `Bearer ${accesstoken}`
            }
          });
          SetavailableStocks(response.data.availableStocks||[]);
        } catch (error) {
          console.error("Search failed:", error);
        }
      }
      SearchStock(searchStockName);
    }, 300);
    
    return function(){
      clearTimeout(timer);
    };
  }, [searchStockName, accesstoken, BACKEND_URL]);

  return (
    // 3. Attach the ref to the parent container
    <div className="relative" ref={searchContainerRef}>
      <input
        type="text"
        value={searchStockName}
        onChange={(e) => setSearchStockName(e.target.value)}
        placeholder="Search stocks"
        className="w-full h-9 pl-3 pr-9 rounded-md bg-[#11161c] border border-[#252b33] text-sm text-gray-200 placeholder:text-gray-500 outline-none focus:border-gray-500 transition-colors"
      />
      <LucideSearch
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
      
      {/* 4. Only render the FloatingWindow if there are stocks to show */}
      {availableStocks.length > 0 && (
        <FloatingWindow Stocks={availableStocks}></FloatingWindow>
      )}
    </div>
  );
}