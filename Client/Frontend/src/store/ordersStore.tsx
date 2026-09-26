import { create } from "zustand";
import axios from "axios";
import { useUserStore } from "./userStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

export interface Order {
    id: string;
    side: "BUY" | "SELL";
    status: "OPEN" | "COMPLETED" | "PENDING" | "REJECTED";
    orderType: "MARKET" | "LIMIT" | "GTT";
    quantity: number;
    limitPrice: number | null;
    executedPrice: number | null;
    total: number | null;
    stockId: string;
    createdAt: string;
    stock?: {
        name: string;
        trading_symbol: string;
        exchange: string;
    };
}

interface OrdersStore {
    orders: Order[];
    isLoading: boolean;
    error: string | null;
    fetchTodayOrders: (token: string) => Promise<void>;
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: Order["status"], executedPrice?: number) => void;
    cancelOrder: (token: string, orderId: string) => Promise<{ message: string; order: Order }>;
}

export const useOrdersStore = create<OrdersStore>(function (set, get) {
    return {
        orders: [],
        isLoading: false,
        error: null,

        fetchTodayOrders: async function (token: string) {
            set({ isLoading: true, error: null });
            try {
                const response = await axios.get(`${BACKEND_URL}api/orders/today`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                set({ orders: response.data.orders || [], isLoading: false });
            } catch (err: any) {
                set({ error: err.message || "Failed to fetch orders", isLoading: false });
            }
        },

        // Optimistically add a new order when placed
        addOrder: function (order: Order) {
            set({ orders: [order, ...get().orders] });
        },

        // Update an OPEN order to COMPLETED when worker fires WebSocket event
        updateOrderStatus: function (orderId: string, status: Order["status"], executedPrice?: number) {
            set({
                orders: get().orders.map(function (o) {
                    if (o.id !== orderId) return o;
                    return {
                        ...o,
                        status,
                        executedPrice: executedPrice ?? o.executedPrice
                    };
                })
            });
        },

        // Cancel an OPEN order and update local store + user balance
        cancelOrder: async function (token: string, orderId: string) {
            try {
                const response = await axios.post(
                    `${BACKEND_URL}api/orders/cancel/${orderId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                // Update the order in local state to REJECTED (matching schema)
                set({
                    orders: get().orders.map(function (o) {
                        if (o.id !== orderId) return o;
                        return {
                            ...o,
                            status: "REJECTED"
                        };
                    })
                });

                // In case refund was issued for BUY limit order, refresh user balance
                try {
                    await useUserStore.getState().fetchUser(token);
                } catch (_) {
                    // Ignore background refresh failure
                }

                return response.data;
            } catch (err: any) {
                const msg = err.response?.data?.message || err.message || "Failed to cancel order";
                throw new Error(msg);
            }
        }
    };
});
