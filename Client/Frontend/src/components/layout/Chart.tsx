import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

function Chart() {

    const chartContainer = useRef<HTMLDivElement | null>(null);

    useEffect(function () {

        if (!chartContainer.current) return;

        const chart = createChart(chartContainer.current, {
            width: 800,
            height: 500
        });

        const series = chart.addSeries(CandlestickSeries);

        return function () {
            chart.remove();
        };

    }, []);

    return (
        <div
            ref={chartContainer}
            className="w-full h-[500px]"
        >
        </div>
    );
}

export default Chart;