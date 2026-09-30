import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

export async function limitSell(token: string, stockId: string, quantity: number, limitPrice: number) {
    const idempotencyKey = crypto.randomUUID();
    return axios.post(
        `${BACKEND_URL}api/orders/sell/limit`,
        { stockId, quantity, userRequiredPrice: limitPrice },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Idempotency-Key": idempotencyKey
            }
        }
    );
}
