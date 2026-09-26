import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: 'User';
    readonly Stocks: 'Stocks';
    readonly Holding: 'Holding';
    readonly Order: 'Order';
    readonly Transaction: 'Transaction';
    readonly Watchlist: 'Watchlist';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly email: 'email';
    readonly password: 'password';
    readonly balance: 'balance';
    readonly refreshToken: 'refreshToken';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const StocksScalarFieldEnum: {
    readonly segment: 'segment';
    readonly name: 'name';
    readonly exchange: 'exchange';
    readonly instrument_type: 'instrument_type';
    readonly instrument_key: 'instrument_key';
    readonly trading_symbol: 'trading_symbol';
};
export type StocksScalarFieldEnum = (typeof StocksScalarFieldEnum)[keyof typeof StocksScalarFieldEnum];
export declare const HoldingScalarFieldEnum: {
    readonly id: 'id';
    readonly quantity: 'quantity';
    readonly avgPrice: 'avgPrice';
    readonly userId: 'userId';
    readonly stockId: 'stockId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type HoldingScalarFieldEnum = (typeof HoldingScalarFieldEnum)[keyof typeof HoldingScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: 'id';
    readonly side: 'side';
    readonly status: 'status';
    readonly orderType: 'orderType';
    readonly quantity: 'quantity';
    readonly limitPrice: 'limitPrice';
    readonly executedPrice: 'executedPrice';
    readonly total: 'total';
    readonly userId: 'userId';
    readonly stockId: 'stockId';
    readonly createdAt: 'createdAt';
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const TransactionScalarFieldEnum: {
    readonly id: 'id';
    readonly type: 'type';
    readonly quantity: 'quantity';
    readonly price: 'price';
    readonly total: 'total';
    readonly userId: 'userId';
    readonly stockId: 'stockId';
    readonly orderId: 'orderId';
    readonly createdAt: 'createdAt';
};
export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum];
export declare const WatchlistScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly stockId: 'stockId';
    readonly createdAt: 'createdAt';
};
export type WatchlistScalarFieldEnum = (typeof WatchlistScalarFieldEnum)[keyof typeof WatchlistScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const UserOrderByRelevanceFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly email: 'email';
    readonly password: 'password';
    readonly refreshToken: 'refreshToken';
};
export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum];
export declare const StocksOrderByRelevanceFieldEnum: {
    readonly segment: 'segment';
    readonly name: 'name';
    readonly exchange: 'exchange';
    readonly instrument_type: 'instrument_type';
    readonly instrument_key: 'instrument_key';
    readonly trading_symbol: 'trading_symbol';
};
export type StocksOrderByRelevanceFieldEnum = (typeof StocksOrderByRelevanceFieldEnum)[keyof typeof StocksOrderByRelevanceFieldEnum];
export declare const HoldingOrderByRelevanceFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly stockId: 'stockId';
};
export type HoldingOrderByRelevanceFieldEnum = (typeof HoldingOrderByRelevanceFieldEnum)[keyof typeof HoldingOrderByRelevanceFieldEnum];
export declare const OrderOrderByRelevanceFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly stockId: 'stockId';
};
export type OrderOrderByRelevanceFieldEnum = (typeof OrderOrderByRelevanceFieldEnum)[keyof typeof OrderOrderByRelevanceFieldEnum];
export declare const TransactionOrderByRelevanceFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly stockId: 'stockId';
    readonly orderId: 'orderId';
};
export type TransactionOrderByRelevanceFieldEnum = (typeof TransactionOrderByRelevanceFieldEnum)[keyof typeof TransactionOrderByRelevanceFieldEnum];
export declare const WatchlistOrderByRelevanceFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly stockId: 'stockId';
};
export type WatchlistOrderByRelevanceFieldEnum = (typeof WatchlistOrderByRelevanceFieldEnum)[keyof typeof WatchlistOrderByRelevanceFieldEnum];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map