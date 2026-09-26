import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Stocks
 *
 */
export type StocksModel = runtime.Types.Result.DefaultSelection<Prisma.$StocksPayload>;
export type AggregateStocks = {
    _count: StocksCountAggregateOutputType | null;
    _min: StocksMinAggregateOutputType | null;
    _max: StocksMaxAggregateOutputType | null;
};
export type StocksMinAggregateOutputType = {
    segment: string | null;
    name: string | null;
    exchange: string | null;
    instrument_type: string | null;
    instrument_key: string | null;
    trading_symbol: string | null;
};
export type StocksMaxAggregateOutputType = {
    segment: string | null;
    name: string | null;
    exchange: string | null;
    instrument_type: string | null;
    instrument_key: string | null;
    trading_symbol: string | null;
};
export type StocksCountAggregateOutputType = {
    segment: number;
    name: number;
    exchange: number;
    instrument_type: number;
    instrument_key: number;
    trading_symbol: number;
    _all: number;
};
export type StocksMinAggregateInputType = {
    segment?: true;
    name?: true;
    exchange?: true;
    instrument_type?: true;
    instrument_key?: true;
    trading_symbol?: true;
};
export type StocksMaxAggregateInputType = {
    segment?: true;
    name?: true;
    exchange?: true;
    instrument_type?: true;
    instrument_key?: true;
    trading_symbol?: true;
};
export type StocksCountAggregateInputType = {
    segment?: true;
    name?: true;
    exchange?: true;
    instrument_type?: true;
    instrument_key?: true;
    trading_symbol?: true;
    _all?: true;
};
export type StocksAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to aggregate.
     */
    where?: Prisma.StocksWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Stocks to fetch.
     */
    orderBy?: Prisma.StocksOrderByWithRelationInput | Prisma.StocksOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StocksWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Stocks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Stocks
    **/
    _count?: true | StocksCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StocksMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StocksMaxAggregateInputType;
};
export type GetStocksAggregateType<T extends StocksAggregateArgs> = {
    [P in keyof T & keyof AggregateStocks]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStocks[P]> : Prisma.GetScalarType<T[P], AggregateStocks[P]>;
};
export type StocksGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StocksWhereInput;
    orderBy?: Prisma.StocksOrderByWithAggregationInput | Prisma.StocksOrderByWithAggregationInput[];
    by: Prisma.StocksScalarFieldEnum[] | Prisma.StocksScalarFieldEnum;
    having?: Prisma.StocksScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StocksCountAggregateInputType | true;
    _min?: StocksMinAggregateInputType;
    _max?: StocksMaxAggregateInputType;
};
export type StocksGroupByOutputType = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    _count: StocksCountAggregateOutputType | null;
    _min: StocksMinAggregateOutputType | null;
    _max: StocksMaxAggregateOutputType | null;
};
export type GetStocksGroupByPayload<T extends StocksGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StocksGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StocksGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StocksGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StocksGroupByOutputType[P]>;
}>>;
export type StocksWhereInput = {
    AND?: Prisma.StocksWhereInput | Prisma.StocksWhereInput[];
    OR?: Prisma.StocksWhereInput[];
    NOT?: Prisma.StocksWhereInput | Prisma.StocksWhereInput[];
    segment?: Prisma.StringFilter<"Stocks"> | string;
    name?: Prisma.StringFilter<"Stocks"> | string;
    exchange?: Prisma.StringFilter<"Stocks"> | string;
    instrument_type?: Prisma.StringFilter<"Stocks"> | string;
    instrument_key?: Prisma.StringFilter<"Stocks"> | string;
    trading_symbol?: Prisma.StringFilter<"Stocks"> | string;
    holdings?: Prisma.HoldingListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    transactions?: Prisma.TransactionListRelationFilter;
    watchlists?: Prisma.WatchlistListRelationFilter;
};
export type StocksOrderByWithRelationInput = {
    segment?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    instrument_type?: Prisma.SortOrder;
    instrument_key?: Prisma.SortOrder;
    trading_symbol?: Prisma.SortOrder;
    holdings?: Prisma.HoldingOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    transactions?: Prisma.TransactionOrderByRelationAggregateInput;
    watchlists?: Prisma.WatchlistOrderByRelationAggregateInput;
    _relevance?: Prisma.StocksOrderByRelevanceInput;
};
export type StocksWhereUniqueInput = Prisma.AtLeast<{
    instrument_key?: string;
    AND?: Prisma.StocksWhereInput | Prisma.StocksWhereInput[];
    OR?: Prisma.StocksWhereInput[];
    NOT?: Prisma.StocksWhereInput | Prisma.StocksWhereInput[];
    segment?: Prisma.StringFilter<"Stocks"> | string;
    name?: Prisma.StringFilter<"Stocks"> | string;
    exchange?: Prisma.StringFilter<"Stocks"> | string;
    instrument_type?: Prisma.StringFilter<"Stocks"> | string;
    trading_symbol?: Prisma.StringFilter<"Stocks"> | string;
    holdings?: Prisma.HoldingListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    transactions?: Prisma.TransactionListRelationFilter;
    watchlists?: Prisma.WatchlistListRelationFilter;
}, "instrument_key">;
export type StocksOrderByWithAggregationInput = {
    segment?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    instrument_type?: Prisma.SortOrder;
    instrument_key?: Prisma.SortOrder;
    trading_symbol?: Prisma.SortOrder;
    _count?: Prisma.StocksCountOrderByAggregateInput;
    _max?: Prisma.StocksMaxOrderByAggregateInput;
    _min?: Prisma.StocksMinOrderByAggregateInput;
};
export type StocksScalarWhereWithAggregatesInput = {
    AND?: Prisma.StocksScalarWhereWithAggregatesInput | Prisma.StocksScalarWhereWithAggregatesInput[];
    OR?: Prisma.StocksScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StocksScalarWhereWithAggregatesInput | Prisma.StocksScalarWhereWithAggregatesInput[];
    segment?: Prisma.StringWithAggregatesFilter<"Stocks"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Stocks"> | string;
    exchange?: Prisma.StringWithAggregatesFilter<"Stocks"> | string;
    instrument_type?: Prisma.StringWithAggregatesFilter<"Stocks"> | string;
    instrument_key?: Prisma.StringWithAggregatesFilter<"Stocks"> | string;
    trading_symbol?: Prisma.StringWithAggregatesFilter<"Stocks"> | string;
};
export type StocksCreateInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    holdings?: Prisma.HoldingCreateNestedManyWithoutStockInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStockInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutStockInput;
    watchlists?: Prisma.WatchlistCreateNestedManyWithoutStockInput;
};
export type StocksUncheckedCreateInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    holdings?: Prisma.HoldingUncheckedCreateNestedManyWithoutStockInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStockInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutStockInput;
    watchlists?: Prisma.WatchlistUncheckedCreateNestedManyWithoutStockInput;
};
export type StocksUpdateInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    holdings?: Prisma.HoldingUpdateManyWithoutStockNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStockNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutStockNestedInput;
    watchlists?: Prisma.WatchlistUpdateManyWithoutStockNestedInput;
};
export type StocksUncheckedUpdateInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    holdings?: Prisma.HoldingUncheckedUpdateManyWithoutStockNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStockNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutStockNestedInput;
    watchlists?: Prisma.WatchlistUncheckedUpdateManyWithoutStockNestedInput;
};
export type StocksCreateManyInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
};
export type StocksUpdateManyMutationInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StocksUncheckedUpdateManyInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StocksOrderByRelevanceInput = {
    fields: Prisma.StocksOrderByRelevanceFieldEnum | Prisma.StocksOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type StocksCountOrderByAggregateInput = {
    segment?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    instrument_type?: Prisma.SortOrder;
    instrument_key?: Prisma.SortOrder;
    trading_symbol?: Prisma.SortOrder;
};
export type StocksMaxOrderByAggregateInput = {
    segment?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    instrument_type?: Prisma.SortOrder;
    instrument_key?: Prisma.SortOrder;
    trading_symbol?: Prisma.SortOrder;
};
export type StocksMinOrderByAggregateInput = {
    segment?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    exchange?: Prisma.SortOrder;
    instrument_type?: Prisma.SortOrder;
    instrument_key?: Prisma.SortOrder;
    trading_symbol?: Prisma.SortOrder;
};
export type StocksScalarRelationFilter = {
    is?: Prisma.StocksWhereInput;
    isNot?: Prisma.StocksWhereInput;
};
export type StocksCreateNestedOneWithoutHoldingsInput = {
    create?: Prisma.XOR<Prisma.StocksCreateWithoutHoldingsInput, Prisma.StocksUncheckedCreateWithoutHoldingsInput>;
    connectOrCreate?: Prisma.StocksCreateOrConnectWithoutHoldingsInput;
    connect?: Prisma.StocksWhereUniqueInput;
};
export type StocksUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: Prisma.XOR<Prisma.StocksCreateWithoutHoldingsInput, Prisma.StocksUncheckedCreateWithoutHoldingsInput>;
    connectOrCreate?: Prisma.StocksCreateOrConnectWithoutHoldingsInput;
    upsert?: Prisma.StocksUpsertWithoutHoldingsInput;
    connect?: Prisma.StocksWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StocksUpdateToOneWithWhereWithoutHoldingsInput, Prisma.StocksUpdateWithoutHoldingsInput>, Prisma.StocksUncheckedUpdateWithoutHoldingsInput>;
};
export type StocksCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.StocksCreateWithoutOrdersInput, Prisma.StocksUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.StocksCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.StocksWhereUniqueInput;
};
export type StocksUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.StocksCreateWithoutOrdersInput, Prisma.StocksUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.StocksCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.StocksUpsertWithoutOrdersInput;
    connect?: Prisma.StocksWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StocksUpdateToOneWithWhereWithoutOrdersInput, Prisma.StocksUpdateWithoutOrdersInput>, Prisma.StocksUncheckedUpdateWithoutOrdersInput>;
};
export type StocksCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.StocksCreateWithoutTransactionsInput, Prisma.StocksUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.StocksCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.StocksWhereUniqueInput;
};
export type StocksUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.StocksCreateWithoutTransactionsInput, Prisma.StocksUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.StocksCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.StocksUpsertWithoutTransactionsInput;
    connect?: Prisma.StocksWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StocksUpdateToOneWithWhereWithoutTransactionsInput, Prisma.StocksUpdateWithoutTransactionsInput>, Prisma.StocksUncheckedUpdateWithoutTransactionsInput>;
};
export type StocksCreateNestedOneWithoutWatchlistsInput = {
    create?: Prisma.XOR<Prisma.StocksCreateWithoutWatchlistsInput, Prisma.StocksUncheckedCreateWithoutWatchlistsInput>;
    connectOrCreate?: Prisma.StocksCreateOrConnectWithoutWatchlistsInput;
    connect?: Prisma.StocksWhereUniqueInput;
};
export type StocksUpdateOneRequiredWithoutWatchlistsNestedInput = {
    create?: Prisma.XOR<Prisma.StocksCreateWithoutWatchlistsInput, Prisma.StocksUncheckedCreateWithoutWatchlistsInput>;
    connectOrCreate?: Prisma.StocksCreateOrConnectWithoutWatchlistsInput;
    upsert?: Prisma.StocksUpsertWithoutWatchlistsInput;
    connect?: Prisma.StocksWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StocksUpdateToOneWithWhereWithoutWatchlistsInput, Prisma.StocksUpdateWithoutWatchlistsInput>, Prisma.StocksUncheckedUpdateWithoutWatchlistsInput>;
};
export type StocksCreateWithoutHoldingsInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    orders?: Prisma.OrderCreateNestedManyWithoutStockInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutStockInput;
    watchlists?: Prisma.WatchlistCreateNestedManyWithoutStockInput;
};
export type StocksUncheckedCreateWithoutHoldingsInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStockInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutStockInput;
    watchlists?: Prisma.WatchlistUncheckedCreateNestedManyWithoutStockInput;
};
export type StocksCreateOrConnectWithoutHoldingsInput = {
    where: Prisma.StocksWhereUniqueInput;
    create: Prisma.XOR<Prisma.StocksCreateWithoutHoldingsInput, Prisma.StocksUncheckedCreateWithoutHoldingsInput>;
};
export type StocksUpsertWithoutHoldingsInput = {
    update: Prisma.XOR<Prisma.StocksUpdateWithoutHoldingsInput, Prisma.StocksUncheckedUpdateWithoutHoldingsInput>;
    create: Prisma.XOR<Prisma.StocksCreateWithoutHoldingsInput, Prisma.StocksUncheckedCreateWithoutHoldingsInput>;
    where?: Prisma.StocksWhereInput;
};
export type StocksUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: Prisma.StocksWhereInput;
    data: Prisma.XOR<Prisma.StocksUpdateWithoutHoldingsInput, Prisma.StocksUncheckedUpdateWithoutHoldingsInput>;
};
export type StocksUpdateWithoutHoldingsInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUpdateManyWithoutStockNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutStockNestedInput;
    watchlists?: Prisma.WatchlistUpdateManyWithoutStockNestedInput;
};
export type StocksUncheckedUpdateWithoutHoldingsInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStockNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutStockNestedInput;
    watchlists?: Prisma.WatchlistUncheckedUpdateManyWithoutStockNestedInput;
};
export type StocksCreateWithoutOrdersInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    holdings?: Prisma.HoldingCreateNestedManyWithoutStockInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutStockInput;
    watchlists?: Prisma.WatchlistCreateNestedManyWithoutStockInput;
};
export type StocksUncheckedCreateWithoutOrdersInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    holdings?: Prisma.HoldingUncheckedCreateNestedManyWithoutStockInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutStockInput;
    watchlists?: Prisma.WatchlistUncheckedCreateNestedManyWithoutStockInput;
};
export type StocksCreateOrConnectWithoutOrdersInput = {
    where: Prisma.StocksWhereUniqueInput;
    create: Prisma.XOR<Prisma.StocksCreateWithoutOrdersInput, Prisma.StocksUncheckedCreateWithoutOrdersInput>;
};
export type StocksUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.StocksUpdateWithoutOrdersInput, Prisma.StocksUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.StocksCreateWithoutOrdersInput, Prisma.StocksUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.StocksWhereInput;
};
export type StocksUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.StocksWhereInput;
    data: Prisma.XOR<Prisma.StocksUpdateWithoutOrdersInput, Prisma.StocksUncheckedUpdateWithoutOrdersInput>;
};
export type StocksUpdateWithoutOrdersInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    holdings?: Prisma.HoldingUpdateManyWithoutStockNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutStockNestedInput;
    watchlists?: Prisma.WatchlistUpdateManyWithoutStockNestedInput;
};
export type StocksUncheckedUpdateWithoutOrdersInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    holdings?: Prisma.HoldingUncheckedUpdateManyWithoutStockNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutStockNestedInput;
    watchlists?: Prisma.WatchlistUncheckedUpdateManyWithoutStockNestedInput;
};
export type StocksCreateWithoutTransactionsInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    holdings?: Prisma.HoldingCreateNestedManyWithoutStockInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStockInput;
    watchlists?: Prisma.WatchlistCreateNestedManyWithoutStockInput;
};
export type StocksUncheckedCreateWithoutTransactionsInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    holdings?: Prisma.HoldingUncheckedCreateNestedManyWithoutStockInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStockInput;
    watchlists?: Prisma.WatchlistUncheckedCreateNestedManyWithoutStockInput;
};
export type StocksCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.StocksWhereUniqueInput;
    create: Prisma.XOR<Prisma.StocksCreateWithoutTransactionsInput, Prisma.StocksUncheckedCreateWithoutTransactionsInput>;
};
export type StocksUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.StocksUpdateWithoutTransactionsInput, Prisma.StocksUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.StocksCreateWithoutTransactionsInput, Prisma.StocksUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.StocksWhereInput;
};
export type StocksUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.StocksWhereInput;
    data: Prisma.XOR<Prisma.StocksUpdateWithoutTransactionsInput, Prisma.StocksUncheckedUpdateWithoutTransactionsInput>;
};
export type StocksUpdateWithoutTransactionsInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    holdings?: Prisma.HoldingUpdateManyWithoutStockNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStockNestedInput;
    watchlists?: Prisma.WatchlistUpdateManyWithoutStockNestedInput;
};
export type StocksUncheckedUpdateWithoutTransactionsInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    holdings?: Prisma.HoldingUncheckedUpdateManyWithoutStockNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStockNestedInput;
    watchlists?: Prisma.WatchlistUncheckedUpdateManyWithoutStockNestedInput;
};
export type StocksCreateWithoutWatchlistsInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    holdings?: Prisma.HoldingCreateNestedManyWithoutStockInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStockInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutStockInput;
};
export type StocksUncheckedCreateWithoutWatchlistsInput = {
    segment: string;
    name: string;
    exchange: string;
    instrument_type: string;
    instrument_key: string;
    trading_symbol: string;
    holdings?: Prisma.HoldingUncheckedCreateNestedManyWithoutStockInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStockInput;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutStockInput;
};
export type StocksCreateOrConnectWithoutWatchlistsInput = {
    where: Prisma.StocksWhereUniqueInput;
    create: Prisma.XOR<Prisma.StocksCreateWithoutWatchlistsInput, Prisma.StocksUncheckedCreateWithoutWatchlistsInput>;
};
export type StocksUpsertWithoutWatchlistsInput = {
    update: Prisma.XOR<Prisma.StocksUpdateWithoutWatchlistsInput, Prisma.StocksUncheckedUpdateWithoutWatchlistsInput>;
    create: Prisma.XOR<Prisma.StocksCreateWithoutWatchlistsInput, Prisma.StocksUncheckedCreateWithoutWatchlistsInput>;
    where?: Prisma.StocksWhereInput;
};
export type StocksUpdateToOneWithWhereWithoutWatchlistsInput = {
    where?: Prisma.StocksWhereInput;
    data: Prisma.XOR<Prisma.StocksUpdateWithoutWatchlistsInput, Prisma.StocksUncheckedUpdateWithoutWatchlistsInput>;
};
export type StocksUpdateWithoutWatchlistsInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    holdings?: Prisma.HoldingUpdateManyWithoutStockNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStockNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutStockNestedInput;
};
export type StocksUncheckedUpdateWithoutWatchlistsInput = {
    segment?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    exchange?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_type?: Prisma.StringFieldUpdateOperationsInput | string;
    instrument_key?: Prisma.StringFieldUpdateOperationsInput | string;
    trading_symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    holdings?: Prisma.HoldingUncheckedUpdateManyWithoutStockNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStockNestedInput;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutStockNestedInput;
};
/**
 * Count Type StocksCountOutputType
 */
export type StocksCountOutputType = {
    holdings: number;
    orders: number;
    transactions: number;
    watchlists: number;
};
export type StocksCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    holdings?: boolean | StocksCountOutputTypeCountHoldingsArgs;
    orders?: boolean | StocksCountOutputTypeCountOrdersArgs;
    transactions?: boolean | StocksCountOutputTypeCountTransactionsArgs;
    watchlists?: boolean | StocksCountOutputTypeCountWatchlistsArgs;
};
/**
 * StocksCountOutputType without action
 */
export type StocksCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StocksCountOutputType
     */
    select?: Prisma.StocksCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * StocksCountOutputType without action
 */
export type StocksCountOutputTypeCountHoldingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HoldingWhereInput;
};
/**
 * StocksCountOutputType without action
 */
export type StocksCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
/**
 * StocksCountOutputType without action
 */
export type StocksCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
/**
 * StocksCountOutputType without action
 */
export type StocksCountOutputTypeCountWatchlistsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WatchlistWhereInput;
};
export type StocksSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    segment?: boolean;
    name?: boolean;
    exchange?: boolean;
    instrument_type?: boolean;
    instrument_key?: boolean;
    trading_symbol?: boolean;
    holdings?: boolean | Prisma.Stocks$holdingsArgs<ExtArgs>;
    orders?: boolean | Prisma.Stocks$ordersArgs<ExtArgs>;
    transactions?: boolean | Prisma.Stocks$transactionsArgs<ExtArgs>;
    watchlists?: boolean | Prisma.Stocks$watchlistsArgs<ExtArgs>;
    _count?: boolean | Prisma.StocksCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stocks"]>;
export type StocksSelectScalar = {
    segment?: boolean;
    name?: boolean;
    exchange?: boolean;
    instrument_type?: boolean;
    instrument_key?: boolean;
    trading_symbol?: boolean;
};
export type StocksOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"segment" | "name" | "exchange" | "instrument_type" | "instrument_key" | "trading_symbol", ExtArgs["result"]["stocks"]>;
export type StocksInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    holdings?: boolean | Prisma.Stocks$holdingsArgs<ExtArgs>;
    orders?: boolean | Prisma.Stocks$ordersArgs<ExtArgs>;
    transactions?: boolean | Prisma.Stocks$transactionsArgs<ExtArgs>;
    watchlists?: boolean | Prisma.Stocks$watchlistsArgs<ExtArgs>;
    _count?: boolean | Prisma.StocksCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $StocksPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Stocks";
    objects: {
        holdings: Prisma.$HoldingPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
        transactions: Prisma.$TransactionPayload<ExtArgs>[];
        watchlists: Prisma.$WatchlistPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        segment: string;
        name: string;
        exchange: string;
        instrument_type: string;
        instrument_key: string;
        trading_symbol: string;
    }, ExtArgs["result"]["stocks"]>;
    composites: {};
};
export type StocksGetPayload<S extends boolean | null | undefined | StocksDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StocksPayload, S>;
export type StocksCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StocksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StocksCountAggregateInputType | true;
};
export interface StocksDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Stocks'];
        meta: {
            name: 'Stocks';
        };
    };
    /**
     * Find zero or one Stocks that matches the filter.
     * @param {StocksFindUniqueArgs} args - Arguments to find a Stocks
     * @example
     * // Get one Stocks
     * const stocks = await prisma.stocks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StocksFindUniqueArgs>(args: Prisma.SelectSubset<T, StocksFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Stocks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StocksFindUniqueOrThrowArgs} args - Arguments to find a Stocks
     * @example
     * // Get one Stocks
     * const stocks = await prisma.stocks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StocksFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StocksFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StocksFindFirstArgs} args - Arguments to find a Stocks
     * @example
     * // Get one Stocks
     * const stocks = await prisma.stocks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StocksFindFirstArgs>(args?: Prisma.SelectSubset<T, StocksFindFirstArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Stocks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StocksFindFirstOrThrowArgs} args - Arguments to find a Stocks
     * @example
     * // Get one Stocks
     * const stocks = await prisma.stocks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StocksFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StocksFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StocksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stocks
     * const stocks = await prisma.stocks.findMany()
     *
     * // Get first 10 Stocks
     * const stocks = await prisma.stocks.findMany({ take: 10 })
     *
     * // Only select the `segment`
     * const stocksWithSegmentOnly = await prisma.stocks.findMany({ select: { segment: true } })
     *
     */
    findMany<T extends StocksFindManyArgs>(args?: Prisma.SelectSubset<T, StocksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Stocks.
     * @param {StocksCreateArgs} args - Arguments to create a Stocks.
     * @example
     * // Create one Stocks
     * const Stocks = await prisma.stocks.create({
     *   data: {
     *     // ... data to create a Stocks
     *   }
     * })
     *
     */
    create<T extends StocksCreateArgs>(args: Prisma.SelectSubset<T, StocksCreateArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Stocks.
     * @param {StocksCreateManyArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stocks = await prisma.stocks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StocksCreateManyArgs>(args?: Prisma.SelectSubset<T, StocksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a Stocks.
     * @param {StocksDeleteArgs} args - Arguments to delete one Stocks.
     * @example
     * // Delete one Stocks
     * const Stocks = await prisma.stocks.delete({
     *   where: {
     *     // ... filter to delete one Stocks
     *   }
     * })
     *
     */
    delete<T extends StocksDeleteArgs>(args: Prisma.SelectSubset<T, StocksDeleteArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Stocks.
     * @param {StocksUpdateArgs} args - Arguments to update one Stocks.
     * @example
     * // Update one Stocks
     * const stocks = await prisma.stocks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StocksUpdateArgs>(args: Prisma.SelectSubset<T, StocksUpdateArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Stocks.
     * @param {StocksDeleteManyArgs} args - Arguments to filter Stocks to delete.
     * @example
     * // Delete a few Stocks
     * const { count } = await prisma.stocks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StocksDeleteManyArgs>(args?: Prisma.SelectSubset<T, StocksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StocksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stocks
     * const stocks = await prisma.stocks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StocksUpdateManyArgs>(args: Prisma.SelectSubset<T, StocksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one Stocks.
     * @param {StocksUpsertArgs} args - Arguments to update or create a Stocks.
     * @example
     * // Update or create a Stocks
     * const stocks = await prisma.stocks.upsert({
     *   create: {
     *     // ... data to create a Stocks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stocks we want to update
     *   }
     * })
     */
    upsert<T extends StocksUpsertArgs>(args: Prisma.SelectSubset<T, StocksUpsertArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StocksCountArgs} args - Arguments to filter Stocks to count.
     * @example
     * // Count the number of Stocks
     * const count = await prisma.stocks.count({
     *   where: {
     *     // ... the filter for the Stocks we want to count
     *   }
     * })
    **/
    count<T extends StocksCountArgs>(args?: Prisma.Subset<T, StocksCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StocksCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StocksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StocksAggregateArgs>(args: Prisma.Subset<T, StocksAggregateArgs>): Prisma.PrismaPromise<GetStocksAggregateType<T>>;
    /**
     * Group by Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StocksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends StocksGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StocksGroupByArgs['orderBy'];
    } : {
        orderBy?: StocksGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StocksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStocksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Stocks model
     */
    readonly fields: StocksFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Stocks.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StocksClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    holdings<T extends Prisma.Stocks$holdingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Stocks$holdingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.Stocks$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Stocks$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    transactions<T extends Prisma.Stocks$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Stocks$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    watchlists<T extends Prisma.Stocks$watchlistsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Stocks$watchlistsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Stocks model
 */
export interface StocksFieldRefs {
    readonly segment: Prisma.FieldRef<"Stocks", 'String'>;
    readonly name: Prisma.FieldRef<"Stocks", 'String'>;
    readonly exchange: Prisma.FieldRef<"Stocks", 'String'>;
    readonly instrument_type: Prisma.FieldRef<"Stocks", 'String'>;
    readonly instrument_key: Prisma.FieldRef<"Stocks", 'String'>;
    readonly trading_symbol: Prisma.FieldRef<"Stocks", 'String'>;
}
/**
 * Stocks findUnique
 */
export type StocksFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
    /**
     * Filter, which Stocks to fetch.
     */
    where: Prisma.StocksWhereUniqueInput;
};
/**
 * Stocks findUniqueOrThrow
 */
export type StocksFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
    /**
     * Filter, which Stocks to fetch.
     */
    where: Prisma.StocksWhereUniqueInput;
};
/**
 * Stocks findFirst
 */
export type StocksFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
    /**
     * Filter, which Stocks to fetch.
     */
    where?: Prisma.StocksWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Stocks to fetch.
     */
    orderBy?: Prisma.StocksOrderByWithRelationInput | Prisma.StocksOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Stocks.
     */
    cursor?: Prisma.StocksWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Stocks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Stocks.
     */
    distinct?: Prisma.StocksScalarFieldEnum | Prisma.StocksScalarFieldEnum[];
};
/**
 * Stocks findFirstOrThrow
 */
export type StocksFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
    /**
     * Filter, which Stocks to fetch.
     */
    where?: Prisma.StocksWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Stocks to fetch.
     */
    orderBy?: Prisma.StocksOrderByWithRelationInput | Prisma.StocksOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Stocks.
     */
    cursor?: Prisma.StocksWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Stocks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Stocks.
     */
    distinct?: Prisma.StocksScalarFieldEnum | Prisma.StocksScalarFieldEnum[];
};
/**
 * Stocks findMany
 */
export type StocksFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
    /**
     * Filter, which Stocks to fetch.
     */
    where?: Prisma.StocksWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Stocks to fetch.
     */
    orderBy?: Prisma.StocksOrderByWithRelationInput | Prisma.StocksOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Stocks.
     */
    cursor?: Prisma.StocksWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Stocks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Stocks.
     */
    distinct?: Prisma.StocksScalarFieldEnum | Prisma.StocksScalarFieldEnum[];
};
/**
 * Stocks create
 */
export type StocksCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
    /**
     * The data needed to create a Stocks.
     */
    data: Prisma.XOR<Prisma.StocksCreateInput, Prisma.StocksUncheckedCreateInput>;
};
/**
 * Stocks createMany
 */
export type StocksCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stocks.
     */
    data: Prisma.StocksCreateManyInput | Prisma.StocksCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Stocks update
 */
export type StocksUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
    /**
     * The data needed to update a Stocks.
     */
    data: Prisma.XOR<Prisma.StocksUpdateInput, Prisma.StocksUncheckedUpdateInput>;
    /**
     * Choose, which Stocks to update.
     */
    where: Prisma.StocksWhereUniqueInput;
};
/**
 * Stocks updateMany
 */
export type StocksUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Stocks.
     */
    data: Prisma.XOR<Prisma.StocksUpdateManyMutationInput, Prisma.StocksUncheckedUpdateManyInput>;
    /**
     * Filter which Stocks to update
     */
    where?: Prisma.StocksWhereInput;
    /**
     * Limit how many Stocks to update.
     */
    limit?: number;
};
/**
 * Stocks upsert
 */
export type StocksUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
    /**
     * The filter to search for the Stocks to update in case it exists.
     */
    where: Prisma.StocksWhereUniqueInput;
    /**
     * In case the Stocks found by the `where` argument doesn't exist, create a new Stocks with this data.
     */
    create: Prisma.XOR<Prisma.StocksCreateInput, Prisma.StocksUncheckedCreateInput>;
    /**
     * In case the Stocks was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StocksUpdateInput, Prisma.StocksUncheckedUpdateInput>;
};
/**
 * Stocks delete
 */
export type StocksDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
    /**
     * Filter which Stocks to delete.
     */
    where: Prisma.StocksWhereUniqueInput;
};
/**
 * Stocks deleteMany
 */
export type StocksDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to delete
     */
    where?: Prisma.StocksWhereInput;
    /**
     * Limit how many Stocks to delete.
     */
    limit?: number;
};
/**
 * Stocks.holdings
 */
export type Stocks$holdingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: Prisma.HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: Prisma.HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HoldingInclude<ExtArgs> | null;
    where?: Prisma.HoldingWhereInput;
    orderBy?: Prisma.HoldingOrderByWithRelationInput | Prisma.HoldingOrderByWithRelationInput[];
    cursor?: Prisma.HoldingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HoldingScalarFieldEnum | Prisma.HoldingScalarFieldEnum[];
};
/**
 * Stocks.orders
 */
export type Stocks$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: Prisma.OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * Stocks.transactions
 */
export type Stocks$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
/**
 * Stocks.watchlists
 */
export type Stocks$watchlistsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: Prisma.WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: Prisma.WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WatchlistInclude<ExtArgs> | null;
    where?: Prisma.WatchlistWhereInput;
    orderBy?: Prisma.WatchlistOrderByWithRelationInput | Prisma.WatchlistOrderByWithRelationInput[];
    cursor?: Prisma.WatchlistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WatchlistScalarFieldEnum | Prisma.WatchlistScalarFieldEnum[];
};
/**
 * Stocks without action
 */
export type StocksDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stocks
     */
    select?: Prisma.StocksSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stocks
     */
    omit?: Prisma.StocksOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StocksInclude<ExtArgs> | null;
};
//# sourceMappingURL=Stocks.d.ts.map