import { create } from "zustand";

interface PriceState {
    prices: Record<string, number>;
    updatePrice: (stockId: string, price: number) => void;
    updateMultiplePrices: (newPrices: Record<string, number>) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
    prices: {},
    updatePrice: (stockId, price) => 
        set((state) => ({
            prices: {
                ...state.prices,
                [stockId]: price
            }
        })),
    updateMultiplePrices: (newPrices) =>
        set((state) => ({
            prices: {
                ...state.prices,
                ...newPrices
            }
        }))
}));
