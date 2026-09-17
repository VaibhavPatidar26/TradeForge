import { Loader2, TrendingUp, Trash2 } from "lucide-react";
import type { Stock, TimeframeConfig, DrawingTool } from "./types";

interface ChartToolbarProps {
    stock: Stock;
    timeframes: TimeframeConfig[];
    chartUnit: string;
    singleCandleDuration: number;
    activeTool: DrawingTool;
    drawingStep?: number;
    totalLinesCount: number;
    isLazyLoading: boolean;
    onTimeframeChange: (unit: string, duration: number, initialDays: number) => void;
    onToggleTool: (tool: DrawingTool) => void;
    onClearAll: () => void;
}

export function ChartToolbar({
    stock,
    timeframes,
    chartUnit,
    singleCandleDuration,
    activeTool,
    drawingStep = 1,
    totalLinesCount,
    isLazyLoading,
    onTimeframeChange,
    onToggleTool,
    onClearAll,
}: ChartToolbarProps) {
    return (
        <div className="flex items-center gap-1 px-3 py-2 bg-[#0f1318] border-b border-[#1f242b] shrink-0 overflow-x-auto select-none">
            {/* Stock Symbol & Exchange */}
            <span className="text-white font-semibold text-sm mr-2 shrink-0">
                {stock.trading_symbol}
                <span className="text-[#6b7280] font-normal ml-1 text-xs">{stock.exchange}</span>
            </span>

            <div className="w-px h-4 bg-[#1f242b] mr-2 shrink-0" />

            {/* Timeframe selector pills */}
            <div className="flex items-center gap-1 shrink-0">
                {timeframes.map((tf) => {
                    const isActive = chartUnit === tf.unit && singleCandleDuration === tf.duration;
                    return (
                        <button
                            key={tf.label}
                            onClick={() => onTimeframeChange(tf.unit, tf.duration, tf.initialDays)}
                            className={`
                                px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer
                                ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-[#9ca3af] hover:text-white hover:bg-[#1f242b]"
                                }
                            `}
                        >
                            {tf.label}
                        </button>
                    );
                })}
            </div>

            <div className="w-px h-4 bg-[#1f242b] mx-2 shrink-0" />

            {/* Drawing Tools Section */}
            <div className="flex items-center gap-1 shrink-0">
                {/* Trendline Tool */}
                <button
                    title="Click 2 points on chart to draw trendline"
                    onClick={() => onToggleTool(activeTool === "trendline" ? null : "trendline")}
                    className={`
                        px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium border
                        ${activeTool === "trendline"
                            ? "bg-blue-600 text-white border-blue-500 shadow-xs"
                            : "text-[#9ca3af] border-transparent hover:text-white hover:bg-[#1f242b]"
                        }
                    `}
                >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Trendline</span>
                    {activeTool === "trendline" && (
                        <span className="ml-1 px-1.5 py-0.5 rounded bg-blue-700 text-[10px] text-blue-100 font-normal">
                            {drawingStep === 2 ? "Click end point" : "Click start point"}
                        </span>
                    )}
                </button>

                {/* Clear All Drawings Button */}
                {totalLinesCount > 0 && (
                    <button
                        title="Clear all trendlines"
                        onClick={onClearAll}
                        className="px-2.5 py-1 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer flex items-center gap-1 text-xs border border-transparent hover:border-red-500/20"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear ({totalLinesCount})</span>
                    </button>
                )}
            </div>

            {/* Lazy Loading Indicator Badge */}
            {isLazyLoading && (
                <div className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-medium shrink-0">
                    <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                    <span>Loading history…</span>
                </div>
            )}
        </div>
    );
}

export default ChartToolbar;
