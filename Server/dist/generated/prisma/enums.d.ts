export declare const OrderSide: {
    readonly BUY: 'BUY';
    readonly SELL: 'SELL';
};
export type OrderSide = (typeof OrderSide)[keyof typeof OrderSide];
export declare const OrderStatus: {
    readonly COMPLETED: 'COMPLETED';
    readonly PENDING: 'PENDING';
    readonly OPEN: 'OPEN';
    readonly REJECTED: 'REJECTED';
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const OrderType: {
    readonly MARKET: 'MARKET';
    readonly LIMIT: 'LIMIT';
    readonly GTT: 'GTT';
};
export type OrderType = (typeof OrderType)[keyof typeof OrderType];
export declare const TransactionType: {
    readonly BUY: 'BUY';
    readonly SELL: 'SELL';
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
//# sourceMappingURL=enums.d.ts.map