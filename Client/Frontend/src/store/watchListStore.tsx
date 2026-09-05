import { create } from "zustand";
import { api } from "../api/axios";


type Stock = {
    instrument_key: string;
    name: string;
    exchange: string;
    trading_symbol: string;
    segment: string;
    instrument_type: string;
};

type WatchlistItem = {
    id: string;
    userId: string;
    stockId: string;
    createdAt: string;
    stock: Stock;
};

type WatchlistState = {
    watchlist: WatchlistItem[];
    loading: boolean;

    fetchWatchlist: (token: string) => Promise<void>;
    addToWatchlist: (stockId: string, token: string) => Promise<boolean>;
    removeFromWatchlist: (stockId: string, token: string) => Promise<boolean>;
    isInWatchlist: (stockId: string) => boolean;
};

export const useWatchlistStore = create<WatchlistState>(function (set, get) {
    return {
        watchlist: [],
        loading: false,

        fetchWatchlist: async function (token: string) {
            try {
                set({ loading: true });

                const response = await api.get(
                    `/api/watchlist/fetch`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                set({
                    watchlist: response.data.watchlist
                });
            } catch (error) {
                console.log("Error fetching watchlist:", error);

                set({
                    watchlist: []
                });
            } finally {
                set({
                    loading: false
                });
            }
        },

        addToWatchlist: async function (
            stockId: string,
            token: string
        ) {
            try {
                const response = await api.post(
                    `/api/watchlist/addtolist/${stockId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const newWatchlistItem = response.data.watchlist;

                set(function (state) {
                    return {
                        watchlist: [
                            ...state.watchlist,
                            newWatchlistItem
                        ]
                    };
                });

                return true;
            } catch (error) {
                console.log(
                    "Error adding stock to watchlist:",
                    error
                );

                return false;
            }
        },

        removeFromWatchlist: async function (
            stockId: string,
            token: string
        ) {
            try {
                await api.delete(
                    `/api/watchlist/removefromlist/${stockId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                set(function (state) {
                    return {
                        watchlist: state.watchlist.filter(
                            function (item) {
                                return item.stockId !== stockId;
                            }
                        )
                    };
                });

                return true;
            } catch (error) {
                console.log(
                    "Error removing stock from watchlist:",
                    error
                );

                return false;
            }
        },

        isInWatchlist: function (stockId: string) {
            return get().watchlist.some(function (item) {
                return item.stockId === stockId;
            });
        }
    };
});