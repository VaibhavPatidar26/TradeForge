import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { usePriceStore } from "../store/priceStore";
import { useOrdersStore } from "../store/ordersStore";
import usePortfolioStore from "../store/portFolioStore";

function useWebSocket() {
    const token = useAuthStore((s) => s.token);

    useEffect(function () {
        if (!token) return;

        const ws = new WebSocket(import.meta.env.VITE_SOCKET_URL);

        ws.onopen = function () {
            console.log("Connected from frontend");
            ws.send(JSON.stringify({ token, type: "auth_connection" }));
        };

        ws.onmessage = function (event) {
            try {
                const message = JSON.parse(event.data);

                // ── Live price tick ──────────────────────────────────────
                if (message.type === "PRICE_UPDATE") {
                    usePriceStore.getState().updatePrice(message.instrumentKey, message.price);
                }

                // ── Limit order executed by the worker ───────────────────
                if (message.type === "LIMIT_ORDER_EXECUTED") {
                    useOrdersStore.getState().updateOrderStatus(message.orderId, "COMPLETED", message.price);
                    usePortfolioStore.getState().fetchPortfolio(token);
                    useOrdersStore.getState().fetchTodayOrders(token);
                    useUserStore.getState().fetchUser(token);
                }

            } catch (_) {
                // Safely ignore non-JSON welcome messages
            }
        };

        ws.onerror = function (e) {
            console.error("WebSocket error:", e);
        };

        return function () {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            } else if (ws.readyState === WebSocket.CONNECTING) {
                ws.onopen = function () {
                    ws.close();
                };
            }
        };
    }, [token]);
}

export default useWebSocket;