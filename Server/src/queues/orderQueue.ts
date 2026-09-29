import { Queue } from "bullmq";
import redis from "../redis/client.js";

export type OrderSide = "BUY" | "SELL";
export type OrderType = "LIMIT" | "MARKET" | "SL" | "SLM" | "GTT";

export type Order = {
    id: string;
    orderSide: OrderSide;
    tradingsymbol?: string;
    quantity: number;
    price: number;
    limitprice?: number;
    orderType: OrderType;
    orderExpiry?: string;
    expiresAt?: Date;
};

const orderQueue = new Queue<Order>("OrderExecutionQueue", { connection: redis as any });

export default orderQueue;