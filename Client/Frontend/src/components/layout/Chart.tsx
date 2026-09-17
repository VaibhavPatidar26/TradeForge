import { useState } from "react";
import { useStockStore } from "../../store/stockStore";
import { useAuthStore } from "../../store/authStore";
import {
    ChartToolbar,
    EmptyChartState,
    ChartCanvas,
    TIMEFRAMES,
} from "../ChartParts";
import type { DrawingTool } from "../ChartParts";

function Chart() {
    const stock               = useStockStore((state) => state.stock);
    const chartUnit           = useStockStore((state) => state.chartUnit);
    const singleCandleDuration = useStockStore((state) => state.singleCandleDuration);
    const fromDate            = useStockStore((state) => state.fromDate);
    const toDate              = useStockStore((state) => state.toDate);
    const setChartConfig      = useStockStore((state) => state.setChartConfig);
    const token               = useAuthStore((state) => state.token);

    const [isLoading, setIsLoading]             = useState(true);
    const [isLazyLoading, setIsLazyLoading]       = useState(false);
    const [activeTool, setActiveTool]           = useState<DrawingTool>(null);
    const [drawingStep, setDrawingStep]         = useState<number>(1);
    const [totalLinesCount, setTotalLinesCount]   = useState<number>(0);

    function getFromDate(historyDays: number): string {
        const date = new Date();
        date.setDate(date.getDate() - historyDays);
        return date.toISOString().split("T")[0];
    }

    function getToDate(): string {
        const date = new Date();
        return date.toISOString().split("T")[0];
    }

    function handleTimeframeChange(unit: string, duration: number, initialDays: number) {
        setChartConfig(unit, duration, getFromDate(initialDays), getToDate());
    }

    function handleClearAll() {
        window.dispatchEvent(new CustomEvent("tradeforge-clear-drawings"));
    }

    if (!stock || stock.instrument_key === "") {
        return <EmptyChartState />;
    }

    return (
        <div className="flex flex-col w-full h-full">
            <ChartToolbar
                stock={stock}
                timeframes={TIMEFRAMES}
                chartUnit={chartUnit}
                singleCandleDuration={singleCandleDuration}
                activeTool={activeTool}
                drawingStep={drawingStep}
                totalLinesCount={totalLinesCount}
                isLazyLoading={isLazyLoading}
                onTimeframeChange={handleTimeframeChange}
                onToggleTool={setActiveTool}
                onClearAll={handleClearAll}
            />

            <ChartCanvas
                stock={stock}
                chartUnit={chartUnit}
                singleCandleDuration={singleCandleDuration}
                fromDate={fromDate}
                toDate={toDate}
                token={token}
                timeframes={TIMEFRAMES}
                activeTool={activeTool}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setIsLazyLoading={setIsLazyLoading}
                setDrawingStep={setDrawingStep}
                setActiveTool={setActiveTool}
                setTotalLinesCount={setTotalLinesCount}
            />
        </div>
    );
}

export default Chart;