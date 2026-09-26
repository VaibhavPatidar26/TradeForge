export declare function broadcastPrice(instrumentKey: string, price: number): void;
export declare function broadcastExecution(userId: string, payload: {
    side: "BUY" | "SELL";
    stockId: string;
    quantity: number;
    price: number;
    orderId: string;
}): void;
//# sourceMappingURL=sendToFront.d.ts.map