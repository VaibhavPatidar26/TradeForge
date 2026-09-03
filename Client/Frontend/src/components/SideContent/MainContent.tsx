import React from "react";
import { usePanelStore } from "../../store/SideBarStore";

export default function MainContent() {
    const { currentPanel } = usePanelStore();

    if (currentPanel === "watchlist") {
        return (
            <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white p-3">
                <h1 className="text-lg font-semibold">Watchlist</h1>
                {/* Watchlist content goes here */}
            </div>
        );
    } else if (currentPanel === "portfolio") {
        return (
            <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white p-3">
                <h1 className="text-lg font-semibold">Portfolio</h1>
                {/* Portfolio content goes here */}
            </div>
        );
    }
}