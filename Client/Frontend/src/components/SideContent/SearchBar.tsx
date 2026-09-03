import React from "react";
import { LucideSearch } from "lucide-react";
import { useSidebarSearchStore } from "../../store/searchStore";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useSidebarSearchStore();

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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