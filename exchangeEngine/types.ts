export enum OrderSide {
    BUY = "BUY",
    SELL = "SELL"
}

export enum OrderType {
    LIMIT = "LIMIT",
    MARKET = "MARKET"
}

export interface Order {
    id: string;
    userId: string;
    stockId: string;
    side: OrderSide;
    type: OrderType;
    price: number;
    quantity: number;
    remainingQuantity: number;
    timestamp: number;
}

export interface Trade {
    buyOrderId: string;
    sellOrderId: string;
    stockId: string;
    price: number;
    quantity: number;
    timestamp: number;
}
