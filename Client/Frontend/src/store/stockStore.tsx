
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
    chartInterval: number;
    fromDate: string;
    toDate: string;

    setStock: (stock: Stock) => void;
    clearStock: () => void;

    setChartConfig: (
        unit: string,
        interval: number,
        fromDate: string,
        toDate: string
    ) => void;
};

export const useStockStore = create<StockStore>(function (set) {
    return {
        stock: null,

        chartUnit: "days",
        chartInterval: 1,
        fromDate: "",
        toDate: "",

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
            unit,
            interval,
            fromDate,
            toDate
        ) {
            set({
                chartUnit: unit,
                chartInterval: interval,
                fromDate: fromDate,
                toDate: toDate
            });
        }
    };
});


