import {create} from "zustand";


interface SidebarSearchState {
    searchQuery:string;
    setSearchQuery : (query:string)=>void;
}

export const useSidebarSearchStore = create<SidebarSearchState>()((set) => ({
    searchQuery: "",
    setSearchQuery: (query: string) => set({ searchQuery: query }),
}));