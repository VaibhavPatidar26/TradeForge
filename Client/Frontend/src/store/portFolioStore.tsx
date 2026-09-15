import { create } from "zustand";
import axios from "axios";

interface Holding {
    id: string;
    stockId: string;
    quantity: number;
    avgPrice: number;
    lastPrice?: number;

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

    fetchPortfolio: (token: string) => Promise<Holding[] | null>;
    clearPortfolio: () => void;
    setHoldings: (holdings: Holding[]) => void;
}

const usePortfolioStore = create<PortfolioStore>(function (set) {
    return {
        holdings: [],
        isLoading: false,
        error: null,

        fetchPortfolio: async function (token: string): Promise<Holding[] | null> {
            set({
                isLoading: true,
                error: null
            });

            try {
                const response: any = await axios.get(
                    "http://localhost:3000/api/search/fetchportfolio",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data: any = response.data;

                if (data.success === false) {
                    console.log("unable to fetch portfolio");

                    set({
                        isLoading: false
                    });

                    return null;
                }

                const portfolio: Holding[] = data.portfolio;

                set({
                    holdings: portfolio,
                    isLoading: false
                });

                return portfolio;

            } catch (err: any) {
                set({
                    error: err.message || "Error fetching portfolio",
                    isLoading: false
                });

                return null;
            }
        },

        setHoldings: function (holdings: Holding[]): void {
            set({
                holdings: holdings
            });
        },

        clearPortfolio: function (): void {
            set({
                holdings: [],
                error: null
            });
        }
    };
});

export default usePortfolioStore;