import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

export async function limitBuy(token: string, stockId: string, quantity: number, limitPrice: number) {
    const idempotencyKey = crypto.randomUUID();
    return axios.post(
        `${BACKEND_URL}api/orders/buy/limit`,
        { stockId, quantity, userRequiredPrice: limitPrice },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Idempotency-Key": idempotencyKey
            }
        }
    );
}
