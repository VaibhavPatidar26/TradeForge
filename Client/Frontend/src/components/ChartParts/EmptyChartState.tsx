import { BarChart2 } from "lucide-react";

export function EmptyChartState() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#0b0e11] text-gray-400 select-none">
            <BarChart2 className="w-16 h-16 text-gray-600 mb-4 stroke-1" />
            <h3 className="text-lg font-medium text-gray-300 mb-1">No Stock Selected</h3>
            <p className="text-sm text-gray-500 max-w-sm text-center">
                Select a stock from your watchlist or search bar to view interactive live price charts and technical drawing tools.
            </p>
        </div>
    );
}

export default EmptyChartState;
