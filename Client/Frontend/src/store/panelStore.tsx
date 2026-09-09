import { create } from "zustand";

interface PanelState {
    currentPanel: string;
    setCurrentPanel: (panel: string) => void;
}

export const usePanelStore = create<PanelState>()((set) => ({
    currentPanel: "watchlist",
    setCurrentPanel: (panel: string) => set({ currentPanel: panel })
}));
