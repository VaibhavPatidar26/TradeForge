
import { create } from "zustand";



type Stock = {
    instrument_key: string;
    name: string;
    exchange: string;
    trading_symbol: string;
    segment: string;
    instrument_type: string;
};

type StockStore = {
    stock: Stock | null;

    chartUnit: string;
    singleCandleDuration: number;
    fromDate: string;
    toDate: string;

    setStock: (stock: Stock) => void;
    clearStock: () => void;

    setChartConfig: (
        chartUnit: string,
        singleCandleDuration: number,
        fromDate: string,
        toDate: string
    ) => void;
};

function getDefaultFromDate() {

    const date = new Date();

    date.setFullYear(date.getFullYear() - 2);

    return date.toISOString().split("T")[0];
}

function getDefaultToDate() {
    const date = new Date();
    return date.toISOString().split("T")[0];
}

export const useStockStore = create<StockStore>(function (set) {

    return {

        stock: null,

        // Default chart: 3-minute candles
        chartUnit: "minutes",
        singleCandleDuration: 5,

        // Previous complete 1 year
        fromDate: getDefaultFromDate(),
        toDate: getDefaultToDate(),

        setStock: function (stock) {
            set({
                stock: stock
            });
        },

        clearStock: function () {
            set({
                stock: null
            });
        },

        setChartConfig: function (
            chartUnit,
            singleCandleDuration,
            fromDate,
            toDate
        ) {
            set({
                chartUnit: chartUnit,
                singleCandleDuration: singleCandleDuration,
                fromDate: fromDate,
                toDate: toDate
            });
        }
    };
});

