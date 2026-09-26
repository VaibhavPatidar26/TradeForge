import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

export async function cancelOrderApi(token: string, orderId: string) {
    const response = await axios.post(
        `${BACKEND_URL}api/orders/cancel/${orderId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export default cancelOrderApi;
