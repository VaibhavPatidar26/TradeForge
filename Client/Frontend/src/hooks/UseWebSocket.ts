import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { usePriceStore } from "../store/priceStore";
import { useOrdersStore } from "../store/ordersStore";
import usePortfolioStore from "../store/portFolioStore";
import { useUserStore } from "../store/userStore";

function useWebSocket() {
    const token = useAuthStore((s) => s.token);
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!token) return;

        let isUnmounted = false;

        function connect() {
            if (isUnmounted) return;

            const socketUrl = import.meta.env.VITE_SOCKET_URL || "ws://localhost:8080";
            const ws = new WebSocket(socketUrl);
            socketRef.current = ws;

            ws.onopen = function () {
                console.log("[WebSocket] Connected to server");
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
                        const currentToken = useAuthStore.getState().token;
                        useOrdersStore.getState().updateOrderStatus(message.orderId, "COMPLETED", message.price);
                        if (currentToken) {
                            usePortfolioStore.getState().fetchPortfolio(currentToken);
                            useOrdersStore.getState().fetchTodayOrders(currentToken);
                            useUserStore.getState().fetchUser(currentToken);
                        }
                    }

                } catch (_) {
                    // Safely ignore non-JSON welcome messages
                }
            };

            ws.onerror = function (e) {
                console.error("[WebSocket] Error:", e);
            };

            ws.onclose = function () {
                console.log("[WebSocket] Disconnected from server.");
                if (!isUnmounted) {
                    // Reconnect after 3 seconds
                    reconnectTimerRef.current = setTimeout(() => {
                        console.log("[WebSocket] Attempting reconnect...");
                        connect();
                    }, 3000);
                }
            };
        }

        connect();

        return function cleanup() {
            isUnmounted = true;
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }
            if (socketRef.current) {
                if (socketRef.current.readyState === WebSocket.OPEN) {
                    socketRef.current.close();
                } else if (socketRef.current.readyState === WebSocket.CONNECTING) {
                    socketRef.current.onopen = function () {
                        socketRef.current?.close();
                    };
                }
            }
        };
    }, [token]);
}

export default useWebSocket;