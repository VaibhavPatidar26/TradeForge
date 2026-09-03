import React from "react";
import { LucideSearch } from "lucide-react";
import { useSidebarSearchStore } from "../../store/SideBarStore";
import {useState,useEffect} from "react"
import axios from "axios";
import { useAuthStore } from "../../store/authStore";


export default function SearchBar() {

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const accesstoken = useAuthStore(function(state){
  return state.token;
})
console.log("token is",accesstoken);
const [searchStockName,setSearchStockName] = useState<string>("");
const [availableStocks,SetavailableStocks] = useState<Array<string>>([]);

// const logoutfunc = useAuthStore((state)=>{
// return state.logout;
// })
// logoutfunc();

useEffect(function(){
  const timer = setTimeout(function() {
    async function SearchStock(name:string){
     const response = await axios.get(`${BACKEND_URL}api/search/searchStock?stockName=${name}`,{headers:{
      Authorization : `Bearer ${accesstoken}`
     }
     })
     SetavailableStocks(response.data.availableStocks);
    
   
   }
    SearchStock(searchStockName);
  }, 300);

  return function(){
    clearTimeout(timer);
  }


},[searchStockName])

console.log(availableStocks);

 


  // const { searchQuery, setSearchQuery } = useSidebarSearchStore();

  return (
    <div className="relative">
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
    </div>
  );
}