import { create } from "zustand";

interface Holding {
    id: string;
    stockId: string;
    quantity: number;
    averagePrice: number;

    stock: {
        instrument_key: string;
        name: string;
        trading_symbol: string;
        exchange: string;
    };
}

interface PortfolioStore {
    holdings: Holding[];
    isLoading: boolean;
    error: string | null;

    fetchPortfolio: (token: string) => Promise<void>;
    clearPortfolio: () => void;
    setHoldings: (holdings: Holding[]) => void;
}

const usePortfolioStore = create<PortfolioStore>(function (set) {
    return {
        holdings: [],
        isLoading: false,
        error: null,

        fetchPortfolio: async function (token: string) {
            set({
                isLoading: true,
                error: null
            });

            try {
                const response = await fetch(
                    "http://localhost:3000/api/search/portfolio",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch portfolio"
                    );
                }

                set({
                    holdings: data.portfolio,
                    isLoading: false
                });

            } catch (err: any) {
                set({
                    error: err.message || "Error fetching portfolio",
                    isLoading: false
                });
            }
        },

        setHoldings: function (holdings: Holding[]) {
            set({
                holdings: holdings
            });
        },

        clearPortfolio: function () {
            set({
                holdings: [],
                error: null
            });
        }
    };
});

export default usePortfolioStore;