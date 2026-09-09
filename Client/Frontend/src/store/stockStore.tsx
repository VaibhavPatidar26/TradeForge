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

    setStock: (stock: Stock) => void;
    clearStock: () => void;
};

export const useStockStore = create<StockStore>(function (set) {
    return {
        stock: null,

        setStock: function (stock) {
            set({
                stock: stock
            });
        },

        clearStock: function () {
            set({
                stock: null
            });
        }
    };
});