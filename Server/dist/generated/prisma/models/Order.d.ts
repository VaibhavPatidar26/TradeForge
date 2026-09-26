import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Order
 *
 */
export type OrderModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderPayload>;
export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
};
export type OrderAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
    limitPrice: runtime.Decimal | null;
    executedPrice: runtime.Decimal | null;
    total: runtime.Decimal | null;
};
export type OrderSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
    limitPrice: runtime.Decimal | null;
    executedPrice: runtime.Decimal | null;
    total: runtime.Decimal | null;
};
export type OrderMinAggregateOutputType = {
    id: string | null;
    side: $Enums.OrderSide | null;
    status: $Enums.OrderStatus | null;
    orderType: $Enums.OrderType | null;
    quantity: runtime.Decimal | null;
    limitPrice: runtime.Decimal | null;
    executedPrice: runtime.Decimal | null;
    total: runtime.Decimal | null;
    userId: string | null;
    stockId: string | null;
    createdAt: Date | null;
};
export type OrderMaxAggregateOutputType = {
    id: string | null;
    side: $Enums.OrderSide | null;
    status: $Enums.OrderStatus | null;
    orderType: $Enums.OrderType | null;
    quantity: runtime.Decimal | null;
    limitPrice: runtime.Decimal | null;
    executedPrice: runtime.Decimal | null;
    total: runtime.Decimal | null;
    userId: string | null;
    stockId: string | null;
    createdAt: Date | null;
};
export type OrderCountAggregateOutputType = {
    id: number;
    side: number;
    status: number;
    orderType: number;
    quantity: number;
    limitPrice: number;
    executedPrice: number;
    total: number;
    userId: number;
    stockId: number;
    createdAt: number;
    _all: number;
};
export type OrderAvgAggregateInputType = {
    quantity?: true;
    limitPrice?: true;
    executedPrice?: true;
    total?: true;
};
export type OrderSumAggregateInputType = {
    quantity?: true;
    limitPrice?: true;
    executedPrice?: true;
    total?: true;
};
export type OrderMinAggregateInputType = {
    id?: true;
    side?: true;
    status?: true;
    orderType?: true;
    quantity?: true;
    limitPrice?: true;
    executedPrice?: true;
    total?: true;
    userId?: true;
    stockId?: true;
    createdAt?: true;
};
export type OrderMaxAggregateInputType = {
    id?: true;
    side?: true;
    status?: true;
    orderType?: true;
    quantity?: true;
    limitPrice?: true;
    executedPrice?: true;
    total?: true;
    userId?: true;
    stockId?: true;
    createdAt?: true;
};
export type OrderCountAggregateInputType = {
    id?: true;
    side?: true;
    status?: true;
    orderType?: true;
    quantity?: true;
    limitPrice?: true;
    executedPrice?: true;
    total?: true;
    userId?: true;
    stockId?: true;
    createdAt?: true;
    _all?: true;
};
export type OrderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: Prisma.OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType;
};
export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
    [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrder[P]> : Prisma.GetScalarType<T[P], AggregateOrder[P]>;
};
export type OrderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithAggregationInput | Prisma.OrderOrderByWithAggregationInput[];
    by: Prisma.OrderScalarFieldEnum[] | Prisma.OrderScalarFieldEnum;
    having?: Prisma.OrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderCountAggregateInputType | true;
    _avg?: OrderAvgAggregateInputType;
    _sum?: OrderSumAggregateInputType;
    _min?: OrderMinAggregateInputType;
    _max?: OrderMaxAggregateInputType;
};
export type OrderGroupByOutputType = {
    id: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal;
    limitPrice: runtime.Decimal | null;
    executedPrice: runtime.Decimal | null;
    total: runtime.Decimal | null;
    userId: string;
    stockId: string;
    createdAt: Date;
    _count: OrderCountAggregateOutputType | null;
    _avg: OrderAvgAggregateOutputType | null;
    _sum: OrderSumAggregateOutputType | null;
    _min: OrderMinAggregateOutputType | null;
    _max: OrderMaxAggregateOutputType | null;
};
export type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderGroupByOutputType[P]>;
}>>;
export type OrderWhereInput = {
    AND?: Prisma.OrderWhereInput | Prisma.OrderWhereInput[];
    OR?: Prisma.OrderWhereInput[];
    NOT?: Prisma.OrderWhereInput | Prisma.OrderWhereInput[];
    id?: Prisma.StringFilter<"Order"> | string;
    side?: Prisma.EnumOrderSideFilter<"Order"> | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFilter<"Order"> | $Enums.OrderType;
    quantity?: Prisma.DecimalFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.DecimalNullableFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.DecimalNullableFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.DecimalNullableFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId?: Prisma.StringFilter<"Order"> | string;
    stockId?: Prisma.StringFilter<"Order"> | string;
    createdAt?: Prisma.DateTimeFilter<"Order"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    stock?: Prisma.XOR<Prisma.StocksScalarRelationFilter, Prisma.StocksWhereInput>;
    transactions?: Prisma.TransactionListRelationFilter;
};
export type OrderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    orderType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    limitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    executedPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    total?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    stock?: Prisma.StocksOrderByWithRelationInput;
    transactions?: Prisma.TransactionOrderByRelationAggregateInput;
    _relevance?: Prisma.OrderOrderByRelevanceInput;
};
export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OrderWhereInput | Prisma.OrderWhereInput[];
    OR?: Prisma.OrderWhereInput[];
    NOT?: Prisma.OrderWhereInput | Prisma.OrderWhereInput[];
    side?: Prisma.EnumOrderSideFilter<"Order"> | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFilter<"Order"> | $Enums.OrderType;
    quantity?: Prisma.DecimalFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.DecimalNullableFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.DecimalNullableFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.DecimalNullableFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId?: Prisma.StringFilter<"Order"> | string;
    stockId?: Prisma.StringFilter<"Order"> | string;
    createdAt?: Prisma.DateTimeFilter<"Order"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    stock?: Prisma.XOR<Prisma.StocksScalarRelationFilter, Prisma.StocksWhereInput>;
    transactions?: Prisma.TransactionListRelationFilter;
}, "id">;
export type OrderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    orderType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    limitPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    executedPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    total?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OrderCountOrderByAggregateInput;
    _avg?: Prisma.OrderAvgOrderByAggregateInput;
    _max?: Prisma.OrderMaxOrderByAggregateInput;
    _min?: Prisma.OrderMinOrderByAggregateInput;
    _sum?: Prisma.OrderSumOrderByAggregateInput;
};
export type OrderScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderScalarWhereWithAggregatesInput | Prisma.OrderScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderScalarWhereWithAggregatesInput | Prisma.OrderScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Order"> | string;
    side?: Prisma.EnumOrderSideWithAggregatesFilter<"Order"> | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeWithAggregatesFilter<"Order"> | $Enums.OrderType;
    quantity?: Prisma.DecimalWithAggregatesFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.DecimalNullableWithAggregatesFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.DecimalNullableWithAggregatesFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.DecimalNullableWithAggregatesFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId?: Prisma.StringWithAggregatesFilter<"Order"> | string;
    stockId?: Prisma.StringWithAggregatesFilter<"Order"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Order"> | Date | string;
};
export type OrderCreateInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOrdersInput;
    stock: Prisma.StocksCreateNestedOneWithoutOrdersInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutOrderInput;
};
export type OrderUncheckedCreateInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId: string;
    stockId: string;
    createdAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutOrderInput;
};
export type OrderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOrdersNestedInput;
    stock?: Prisma.StocksUpdateOneRequiredWithoutOrdersNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutOrderNestedInput;
};
export type OrderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutOrderNestedInput;
};
export type OrderCreateManyInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId: string;
    stockId: string;
    createdAt?: Date | string;
};
export type OrderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderListRelationFilter = {
    every?: Prisma.OrderWhereInput;
    some?: Prisma.OrderWhereInput;
    none?: Prisma.OrderWhereInput;
};
export type OrderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderOrderByRelevanceInput = {
    fields: Prisma.OrderOrderByRelevanceFieldEnum | Prisma.OrderOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type OrderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    orderType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    limitPrice?: Prisma.SortOrder;
    executedPrice?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    limitPrice?: Prisma.SortOrder;
    executedPrice?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type OrderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    orderType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    limitPrice?: Prisma.SortOrder;
    executedPrice?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    side?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    orderType?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    limitPrice?: Prisma.SortOrder;
    executedPrice?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrderSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    limitPrice?: Prisma.SortOrder;
    executedPrice?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type OrderScalarRelationFilter = {
    is?: Prisma.OrderWhereInput;
    isNot?: Prisma.OrderWhereInput;
};
export type OrderCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutUserInput, Prisma.OrderUncheckedCreateWithoutUserInput> | Prisma.OrderCreateWithoutUserInput[] | Prisma.OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutUserInput | Prisma.OrderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OrderCreateManyUserInputEnvelope;
    connect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
};
export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutUserInput, Prisma.OrderUncheckedCreateWithoutUserInput> | Prisma.OrderCreateWithoutUserInput[] | Prisma.OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutUserInput | Prisma.OrderCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OrderCreateManyUserInputEnvelope;
    connect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
};
export type OrderUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutUserInput, Prisma.OrderUncheckedCreateWithoutUserInput> | Prisma.OrderCreateWithoutUserInput[] | Prisma.OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutUserInput | Prisma.OrderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OrderUpsertWithWhereUniqueWithoutUserInput | Prisma.OrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OrderCreateManyUserInputEnvelope;
    set?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    disconnect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    delete?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    connect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    update?: Prisma.OrderUpdateWithWhereUniqueWithoutUserInput | Prisma.OrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OrderUpdateManyWithWhereWithoutUserInput | Prisma.OrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OrderScalarWhereInput | Prisma.OrderScalarWhereInput[];
};
export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutUserInput, Prisma.OrderUncheckedCreateWithoutUserInput> | Prisma.OrderCreateWithoutUserInput[] | Prisma.OrderUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutUserInput | Prisma.OrderCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OrderUpsertWithWhereUniqueWithoutUserInput | Prisma.OrderUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OrderCreateManyUserInputEnvelope;
    set?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    disconnect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    delete?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    connect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    update?: Prisma.OrderUpdateWithWhereUniqueWithoutUserInput | Prisma.OrderUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OrderUpdateManyWithWhereWithoutUserInput | Prisma.OrderUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OrderScalarWhereInput | Prisma.OrderScalarWhereInput[];
};
export type OrderCreateNestedManyWithoutStockInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutStockInput, Prisma.OrderUncheckedCreateWithoutStockInput> | Prisma.OrderCreateWithoutStockInput[] | Prisma.OrderUncheckedCreateWithoutStockInput[];
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutStockInput | Prisma.OrderCreateOrConnectWithoutStockInput[];
    createMany?: Prisma.OrderCreateManyStockInputEnvelope;
    connect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
};
export type OrderUncheckedCreateNestedManyWithoutStockInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutStockInput, Prisma.OrderUncheckedCreateWithoutStockInput> | Prisma.OrderCreateWithoutStockInput[] | Prisma.OrderUncheckedCreateWithoutStockInput[];
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutStockInput | Prisma.OrderCreateOrConnectWithoutStockInput[];
    createMany?: Prisma.OrderCreateManyStockInputEnvelope;
    connect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
};
export type OrderUpdateManyWithoutStockNestedInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutStockInput, Prisma.OrderUncheckedCreateWithoutStockInput> | Prisma.OrderCreateWithoutStockInput[] | Prisma.OrderUncheckedCreateWithoutStockInput[];
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutStockInput | Prisma.OrderCreateOrConnectWithoutStockInput[];
    upsert?: Prisma.OrderUpsertWithWhereUniqueWithoutStockInput | Prisma.OrderUpsertWithWhereUniqueWithoutStockInput[];
    createMany?: Prisma.OrderCreateManyStockInputEnvelope;
    set?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    disconnect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    delete?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    connect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    update?: Prisma.OrderUpdateWithWhereUniqueWithoutStockInput | Prisma.OrderUpdateWithWhereUniqueWithoutStockInput[];
    updateMany?: Prisma.OrderUpdateManyWithWhereWithoutStockInput | Prisma.OrderUpdateManyWithWhereWithoutStockInput[];
    deleteMany?: Prisma.OrderScalarWhereInput | Prisma.OrderScalarWhereInput[];
};
export type OrderUncheckedUpdateManyWithoutStockNestedInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutStockInput, Prisma.OrderUncheckedCreateWithoutStockInput> | Prisma.OrderCreateWithoutStockInput[] | Prisma.OrderUncheckedCreateWithoutStockInput[];
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutStockInput | Prisma.OrderCreateOrConnectWithoutStockInput[];
    upsert?: Prisma.OrderUpsertWithWhereUniqueWithoutStockInput | Prisma.OrderUpsertWithWhereUniqueWithoutStockInput[];
    createMany?: Prisma.OrderCreateManyStockInputEnvelope;
    set?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    disconnect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    delete?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    connect?: Prisma.OrderWhereUniqueInput | Prisma.OrderWhereUniqueInput[];
    update?: Prisma.OrderUpdateWithWhereUniqueWithoutStockInput | Prisma.OrderUpdateWithWhereUniqueWithoutStockInput[];
    updateMany?: Prisma.OrderUpdateManyWithWhereWithoutStockInput | Prisma.OrderUpdateManyWithWhereWithoutStockInput[];
    deleteMany?: Prisma.OrderScalarWhereInput | Prisma.OrderScalarWhereInput[];
};
export type EnumOrderSideFieldUpdateOperationsInput = {
    set?: $Enums.OrderSide;
};
export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus;
};
export type EnumOrderTypeFieldUpdateOperationsInput = {
    set?: $Enums.OrderType;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type OrderCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutTransactionsInput, Prisma.OrderUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.OrderWhereUniqueInput;
};
export type OrderUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.OrderCreateWithoutTransactionsInput, Prisma.OrderUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.OrderCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.OrderUpsertWithoutTransactionsInput;
    connect?: Prisma.OrderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrderUpdateToOneWithWhereWithoutTransactionsInput, Prisma.OrderUpdateWithoutTransactionsInput>, Prisma.OrderUncheckedUpdateWithoutTransactionsInput>;
};
export type OrderCreateWithoutUserInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    stock: Prisma.StocksCreateNestedOneWithoutOrdersInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutOrderInput;
};
export type OrderUncheckedCreateWithoutUserInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    stockId: string;
    createdAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutOrderInput;
};
export type OrderCreateOrConnectWithoutUserInput = {
    where: Prisma.OrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderCreateWithoutUserInput, Prisma.OrderUncheckedCreateWithoutUserInput>;
};
export type OrderCreateManyUserInputEnvelope = {
    data: Prisma.OrderCreateManyUserInput | Prisma.OrderCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderUpdateWithoutUserInput, Prisma.OrderUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OrderCreateWithoutUserInput, Prisma.OrderUncheckedCreateWithoutUserInput>;
};
export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderUpdateWithoutUserInput, Prisma.OrderUncheckedUpdateWithoutUserInput>;
};
export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OrderScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderUpdateManyMutationInput, Prisma.OrderUncheckedUpdateManyWithoutUserInput>;
};
export type OrderScalarWhereInput = {
    AND?: Prisma.OrderScalarWhereInput | Prisma.OrderScalarWhereInput[];
    OR?: Prisma.OrderScalarWhereInput[];
    NOT?: Prisma.OrderScalarWhereInput | Prisma.OrderScalarWhereInput[];
    id?: Prisma.StringFilter<"Order"> | string;
    side?: Prisma.EnumOrderSideFilter<"Order"> | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFilter<"Order"> | $Enums.OrderType;
    quantity?: Prisma.DecimalFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.DecimalNullableFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.DecimalNullableFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.DecimalNullableFilter<"Order"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId?: Prisma.StringFilter<"Order"> | string;
    stockId?: Prisma.StringFilter<"Order"> | string;
    createdAt?: Prisma.DateTimeFilter<"Order"> | Date | string;
};
export type OrderCreateWithoutStockInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOrdersInput;
    transactions?: Prisma.TransactionCreateNestedManyWithoutOrderInput;
};
export type OrderUncheckedCreateWithoutStockInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId: string;
    createdAt?: Date | string;
    transactions?: Prisma.TransactionUncheckedCreateNestedManyWithoutOrderInput;
};
export type OrderCreateOrConnectWithoutStockInput = {
    where: Prisma.OrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderCreateWithoutStockInput, Prisma.OrderUncheckedCreateWithoutStockInput>;
};
export type OrderCreateManyStockInputEnvelope = {
    data: Prisma.OrderCreateManyStockInput | Prisma.OrderCreateManyStockInput[];
    skipDuplicates?: boolean;
};
export type OrderUpsertWithWhereUniqueWithoutStockInput = {
    where: Prisma.OrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderUpdateWithoutStockInput, Prisma.OrderUncheckedUpdateWithoutStockInput>;
    create: Prisma.XOR<Prisma.OrderCreateWithoutStockInput, Prisma.OrderUncheckedCreateWithoutStockInput>;
};
export type OrderUpdateWithWhereUniqueWithoutStockInput = {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderUpdateWithoutStockInput, Prisma.OrderUncheckedUpdateWithoutStockInput>;
};
export type OrderUpdateManyWithWhereWithoutStockInput = {
    where: Prisma.OrderScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderUpdateManyMutationInput, Prisma.OrderUncheckedUpdateManyWithoutStockInput>;
};
export type OrderCreateWithoutTransactionsInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOrdersInput;
    stock: Prisma.StocksCreateNestedOneWithoutOrdersInput;
};
export type OrderUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId: string;
    stockId: string;
    createdAt?: Date | string;
};
export type OrderCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.OrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderCreateWithoutTransactionsInput, Prisma.OrderUncheckedCreateWithoutTransactionsInput>;
};
export type OrderUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.OrderUpdateWithoutTransactionsInput, Prisma.OrderUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.OrderCreateWithoutTransactionsInput, Prisma.OrderUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.OrderWhereInput;
};
export type OrderUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.OrderWhereInput;
    data: Prisma.XOR<Prisma.OrderUpdateWithoutTransactionsInput, Prisma.OrderUncheckedUpdateWithoutTransactionsInput>;
};
export type OrderUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOrdersNestedInput;
    stock?: Prisma.StocksUpdateOneRequiredWithoutOrdersNestedInput;
};
export type OrderUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderCreateManyUserInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    stockId: string;
    createdAt?: Date | string;
};
export type OrderUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    stock?: Prisma.StocksUpdateOneRequiredWithoutOrdersNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutOrderNestedInput;
};
export type OrderUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    stockId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutOrderNestedInput;
};
export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    stockId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrderCreateManyStockInput = {
    id?: string;
    side: $Enums.OrderSide;
    status: $Enums.OrderStatus;
    orderType: $Enums.OrderType;
    quantity: runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId: string;
    createdAt?: Date | string;
};
export type OrderUpdateWithoutStockInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOrdersNestedInput;
    transactions?: Prisma.TransactionUpdateManyWithoutOrderNestedInput;
};
export type OrderUncheckedUpdateWithoutStockInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.TransactionUncheckedUpdateManyWithoutOrderNestedInput;
};
export type OrderUncheckedUpdateManyWithoutStockInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    side?: Prisma.EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide;
    status?: Prisma.EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus;
    orderType?: Prisma.EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    limitPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    executedPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    total?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type OrderCountOutputType
 */
export type OrderCountOutputType = {
    transactions: number;
};
export type OrderCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | OrderCountOutputTypeCountTransactionsArgs;
};
/**
 * OrderCountOutputType without action
 */
export type OrderCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: Prisma.OrderCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * OrderCountOutputType without action
 */
export type OrderCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
};
export type OrderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    side?: boolean;
    status?: boolean;
    orderType?: boolean;
    quantity?: boolean;
    limitPrice?: boolean;
    executedPrice?: boolean;
    total?: boolean;
    userId?: boolean;
    stockId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    stock?: boolean | Prisma.StocksDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Order$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.OrderCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["order"]>;
export type OrderSelectScalar = {
    id?: boolean;
    side?: boolean;
    status?: boolean;
    orderType?: boolean;
    quantity?: boolean;
    limitPrice?: boolean;
    executedPrice?: boolean;
    total?: boolean;
    userId?: boolean;
    stockId?: boolean;
    createdAt?: boolean;
};
export type OrderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "side" | "status" | "orderType" | "quantity" | "limitPrice" | "executedPrice" | "total" | "userId" | "stockId" | "createdAt", ExtArgs["result"]["order"]>;
export type OrderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    stock?: boolean | Prisma.StocksDefaultArgs<ExtArgs>;
    transactions?: boolean | Prisma.Order$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.OrderCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $OrderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Order";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        stock: Prisma.$StocksPayload<ExtArgs>;
        transactions: Prisma.$TransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        side: $Enums.OrderSide;
        status: $Enums.OrderStatus;
        orderType: $Enums.OrderType;
        quantity: runtime.Decimal;
        limitPrice: runtime.Decimal | null;
        executedPrice: runtime.Decimal | null;
        total: runtime.Decimal | null;
        userId: string;
        stockId: string;
        createdAt: Date;
    }, ExtArgs["result"]["order"]>;
    composites: {};
};
export type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderPayload, S>;
export type OrderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderCountAggregateInputType | true;
};
export interface OrderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Order'];
        meta: {
            name: 'Order';
        };
    };
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     *
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OrderFindManyArgs>(args?: Prisma.SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     *
     */
    create<T extends OrderCreateArgs>(args: Prisma.SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OrderCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     *
     */
    delete<T extends OrderDeleteArgs>(args: Prisma.SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OrderUpdateArgs>(args: Prisma.SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OrderUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: Prisma.SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(args?: Prisma.Subset<T, OrderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Prisma.Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>;
    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OrderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Order model
     */
    readonly fields: OrderFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Order.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OrderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    stock<T extends Prisma.StocksDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StocksDefaultArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    transactions<T extends Prisma.Order$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Order$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Order model
 */
export interface OrderFieldRefs {
    readonly id: Prisma.FieldRef<"Order", 'String'>;
    readonly side: Prisma.FieldRef<"Order", 'OrderSide'>;
    readonly status: Prisma.FieldRef<"Order", 'OrderStatus'>;
    readonly orderType: Prisma.FieldRef<"Order", 'OrderType'>;
    readonly quantity: Prisma.FieldRef<"Order", 'Decimal'>;
    readonly limitPrice: Prisma.FieldRef<"Order", 'Decimal'>;
    readonly executedPrice: Prisma.FieldRef<"Order", 'Decimal'>;
    readonly total: Prisma.FieldRef<"Order", 'Decimal'>;
    readonly userId: Prisma.FieldRef<"Order", 'String'>;
    readonly stockId: Prisma.FieldRef<"Order", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Order", 'DateTime'>;
}
/**
 * Order findUnique
 */
export type OrderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Order to fetch.
     */
    where: Prisma.OrderWhereUniqueInput;
};
/**
 * Order findUniqueOrThrow
 */
export type OrderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Order to fetch.
     */
    where: Prisma.OrderWhereUniqueInput;
};
/**
 * Order findFirst
 */
export type OrderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Order to fetch.
     */
    where?: Prisma.OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: Prisma.OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * Order findFirstOrThrow
 */
export type OrderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Order to fetch.
     */
    where?: Prisma.OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orders.
     */
    cursor?: Prisma.OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * Order findMany
 */
export type OrderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Orders to fetch.
     */
    where?: Prisma.OrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orders to fetch.
     */
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Orders.
     */
    cursor?: Prisma.OrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orders.
     */
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * Order create
 */
export type OrderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Order.
     */
    data: Prisma.XOR<Prisma.OrderCreateInput, Prisma.OrderUncheckedCreateInput>;
};
/**
 * Order createMany
 */
export type OrderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: Prisma.OrderCreateManyInput | Prisma.OrderCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Order update
 */
export type OrderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Order.
     */
    data: Prisma.XOR<Prisma.OrderUpdateInput, Prisma.OrderUncheckedUpdateInput>;
    /**
     * Choose, which Order to update.
     */
    where: Prisma.OrderWhereUniqueInput;
};
/**
 * Order updateMany
 */
export type OrderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: Prisma.XOR<Prisma.OrderUpdateManyMutationInput, Prisma.OrderUncheckedUpdateManyInput>;
    /**
     * Filter which Orders to update
     */
    where?: Prisma.OrderWhereInput;
    /**
     * Limit how many Orders to update.
     */
    limit?: number;
};
/**
 * Order upsert
 */
export type OrderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: Prisma.OrderWhereUniqueInput;
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: Prisma.XOR<Prisma.OrderCreateInput, Prisma.OrderUncheckedCreateInput>;
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OrderUpdateInput, Prisma.OrderUncheckedUpdateInput>;
};
/**
 * Order delete
 */
export type OrderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Order to delete.
     */
    where: Prisma.OrderWhereUniqueInput;
};
/**
 * Order deleteMany
 */
export type OrderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: Prisma.OrderWhereInput;
    /**
     * Limit how many Orders to delete.
     */
    limit?: number;
};
/**
 * Order.transactions
 */
export type Order$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Order without action
 */
export type OrderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=Order.d.ts.map