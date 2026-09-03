import {create} from "zustand";


interface SidebarSearchState {
    searchQuery:string;
    setSearchQuery : (query:string)=>void;
}
interface PanelState{
    currentPanel:string;
    setCurrentPanel:(panel:string)=>void;
}

export const useSidebarSearchStore = create<SidebarSearchState>()((set) => ({
    searchQuery: "",
    setSearchQuery: (query: string) => set({ searchQuery: query }),
}));

export const usePanelStore = create<PanelState>()((set) => ({
    currentPanel: "watchlist",
    setCurrentPanel: (panel: string) => set({ currentPanel: panel })
}));