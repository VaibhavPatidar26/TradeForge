import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

async function selling(token: string, stockId: string, quantity: number) {
    const idempotencyKey = crypto.randomUUID();
    const response = await axios.post(
        `${BACKEND_URL}api/orders/sell/market`,
        { stockId: stockId, quantity: quantity },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Idempotency-Key": idempotencyKey
            }
        }
    );
    return response;
}

export default selling;