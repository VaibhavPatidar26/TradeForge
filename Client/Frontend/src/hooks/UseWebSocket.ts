import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { usePriceStore } from "../store/priceStore";

function useWebSocket() {
    const token = useAuthStore(function(state){
        return state.token;
    })  
    const updatePrice = usePriceStore(function(state){
        return state.updatePrice;
    })
    useEffect(function () {
        if (!token) return;

        const ws = new WebSocket(import.meta.env.VITE_SOCKET_URL);

        ws.onopen = function () {
            console.log("Connected from frontend");
            
            ws.send(JSON.stringify({
                token: token,
                type: "auth_connection"
            }));
        };

        ws.onmessage = function (event) {
            try {
                const message = JSON.parse(event.data);

                if (message.type === "PRICE_UPDATE") {
                    updatePrice(message.instrumentKey, message.price);
                }
            } catch (err) {
                // Safely ignore non-JSON messages (like welcome string)
            }
        };

        return function () {
            ws.close();
        };

    }, [token, updatePrice]);
}


export default useWebSocket