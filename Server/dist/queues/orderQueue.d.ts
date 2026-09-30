import { Queue } from "bullmq";
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
declare const orderQueue: Queue<Order, any, string, Order, any, string, import("bullmq").RedisQueueBackend, import("bullmq").ConnectionOptions>;
export default orderQueue;
//# sourceMappingURL=orderQueue.d.ts.map