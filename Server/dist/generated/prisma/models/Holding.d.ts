import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Holding
 *
 */
export type HoldingModel = runtime.Types.Result.DefaultSelection<Prisma.$HoldingPayload>;
export type AggregateHolding = {
    _count: HoldingCountAggregateOutputType | null;
    _avg: HoldingAvgAggregateOutputType | null;
    _sum: HoldingSumAggregateOutputType | null;
    _min: HoldingMinAggregateOutputType | null;
    _max: HoldingMaxAggregateOutputType | null;
};
export type HoldingAvgAggregateOutputType = {
    quantity: runtime.Decimal | null;
    avgPrice: runtime.Decimal | null;
};
export type HoldingSumAggregateOutputType = {
    quantity: runtime.Decimal | null;
    avgPrice: runtime.Decimal | null;
};
export type HoldingMinAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    avgPrice: runtime.Decimal | null;
    userId: string | null;
    stockId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HoldingMaxAggregateOutputType = {
    id: string | null;
    quantity: runtime.Decimal | null;
    avgPrice: runtime.Decimal | null;
    userId: string | null;
    stockId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HoldingCountAggregateOutputType = {
    id: number;
    quantity: number;
    avgPrice: number;
    userId: number;
    stockId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type HoldingAvgAggregateInputType = {
    quantity?: true;
    avgPrice?: true;
};
export type HoldingSumAggregateInputType = {
    quantity?: true;
    avgPrice?: true;
};
export type HoldingMinAggregateInputType = {
    id?: true;
    quantity?: true;
    avgPrice?: true;
    userId?: true;
    stockId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HoldingMaxAggregateInputType = {
    id?: true;
    quantity?: true;
    avgPrice?: true;
    userId?: true;
    stockId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HoldingCountAggregateInputType = {
    id?: true;
    quantity?: true;
    avgPrice?: true;
    userId?: true;
    stockId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type HoldingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Holding to aggregate.
     */
    where?: Prisma.HoldingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Holdings to fetch.
     */
    orderBy?: Prisma.HoldingOrderByWithRelationInput | Prisma.HoldingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.HoldingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Holdings
    **/
    _count?: true | HoldingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: HoldingAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: HoldingSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: HoldingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: HoldingMaxAggregateInputType;
};
export type GetHoldingAggregateType<T extends HoldingAggregateArgs> = {
    [P in keyof T & keyof AggregateHolding]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHolding[P]> : Prisma.GetScalarType<T[P], AggregateHolding[P]>;
};
export type HoldingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HoldingWhereInput;
    orderBy?: Prisma.HoldingOrderByWithAggregationInput | Prisma.HoldingOrderByWithAggregationInput[];
    by: Prisma.HoldingScalarFieldEnum[] | Prisma.HoldingScalarFieldEnum;
    having?: Prisma.HoldingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HoldingCountAggregateInputType | true;
    _avg?: HoldingAvgAggregateInputType;
    _sum?: HoldingSumAggregateInputType;
    _min?: HoldingMinAggregateInputType;
    _max?: HoldingMaxAggregateInputType;
};
export type HoldingGroupByOutputType = {
    id: string;
    quantity: runtime.Decimal;
    avgPrice: runtime.Decimal;
    userId: string;
    stockId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: HoldingCountAggregateOutputType | null;
    _avg: HoldingAvgAggregateOutputType | null;
    _sum: HoldingSumAggregateOutputType | null;
    _min: HoldingMinAggregateOutputType | null;
    _max: HoldingMaxAggregateOutputType | null;
};
export type GetHoldingGroupByPayload<T extends HoldingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HoldingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HoldingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HoldingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HoldingGroupByOutputType[P]>;
}>>;
export type HoldingWhereInput = {
    AND?: Prisma.HoldingWhereInput | Prisma.HoldingWhereInput[];
    OR?: Prisma.HoldingWhereInput[];
    NOT?: Prisma.HoldingWhereInput | Prisma.HoldingWhereInput[];
    id?: Prisma.StringFilter<"Holding"> | string;
    quantity?: Prisma.DecimalFilter<"Holding"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFilter<"Holding"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId?: Prisma.StringFilter<"Holding"> | string;
    stockId?: Prisma.StringFilter<"Holding"> | string;
    createdAt?: Prisma.DateTimeFilter<"Holding"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Holding"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    stock?: Prisma.XOR<Prisma.StocksScalarRelationFilter, Prisma.StocksWhereInput>;
};
export type HoldingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    avgPrice?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    stock?: Prisma.StocksOrderByWithRelationInput;
    _relevance?: Prisma.HoldingOrderByRelevanceInput;
};
export type HoldingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_stockId?: Prisma.HoldingUserIdStockIdCompoundUniqueInput;
    AND?: Prisma.HoldingWhereInput | Prisma.HoldingWhereInput[];
    OR?: Prisma.HoldingWhereInput[];
    NOT?: Prisma.HoldingWhereInput | Prisma.HoldingWhereInput[];
    quantity?: Prisma.DecimalFilter<"Holding"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFilter<"Holding"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId?: Prisma.StringFilter<"Holding"> | string;
    stockId?: Prisma.StringFilter<"Holding"> | string;
    createdAt?: Prisma.DateTimeFilter<"Holding"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Holding"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    stock?: Prisma.XOR<Prisma.StocksScalarRelationFilter, Prisma.StocksWhereInput>;
}, "id" | "userId_stockId">;
export type HoldingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    avgPrice?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.HoldingCountOrderByAggregateInput;
    _avg?: Prisma.HoldingAvgOrderByAggregateInput;
    _max?: Prisma.HoldingMaxOrderByAggregateInput;
    _min?: Prisma.HoldingMinOrderByAggregateInput;
    _sum?: Prisma.HoldingSumOrderByAggregateInput;
};
export type HoldingScalarWhereWithAggregatesInput = {
    AND?: Prisma.HoldingScalarWhereWithAggregatesInput | Prisma.HoldingScalarWhereWithAggregatesInput[];
    OR?: Prisma.HoldingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HoldingScalarWhereWithAggregatesInput | Prisma.HoldingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Holding"> | string;
    quantity?: Prisma.DecimalWithAggregatesFilter<"Holding"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalWithAggregatesFilter<"Holding"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId?: Prisma.StringWithAggregatesFilter<"Holding"> | string;
    stockId?: Prisma.StringWithAggregatesFilter<"Holding"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Holding"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Holding"> | Date | string;
};
export type HoldingCreateInput = {
    id?: string;
    quantity?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutHoldingsInput;
    stock: Prisma.StocksCreateNestedOneWithoutHoldingsInput;
};
export type HoldingUncheckedCreateInput = {
    id?: string;
    quantity?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId: string;
    stockId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HoldingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutHoldingsNestedInput;
    stock?: Prisma.StocksUpdateOneRequiredWithoutHoldingsNestedInput;
};
export type HoldingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HoldingCreateManyInput = {
    id?: string;
    quantity?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId: string;
    stockId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HoldingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HoldingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HoldingListRelationFilter = {
    every?: Prisma.HoldingWhereInput;
    some?: Prisma.HoldingWhereInput;
    none?: Prisma.HoldingWhereInput;
};
export type HoldingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HoldingOrderByRelevanceInput = {
    fields: Prisma.HoldingOrderByRelevanceFieldEnum | Prisma.HoldingOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type HoldingUserIdStockIdCompoundUniqueInput = {
    userId: string;
    stockId: string;
};
export type HoldingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    avgPrice?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HoldingAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    avgPrice?: Prisma.SortOrder;
};
export type HoldingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    avgPrice?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HoldingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    avgPrice?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    stockId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HoldingSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    avgPrice?: Prisma.SortOrder;
};
export type HoldingCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.HoldingCreateWithoutUserInput, Prisma.HoldingUncheckedCreateWithoutUserInput> | Prisma.HoldingCreateWithoutUserInput[] | Prisma.HoldingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HoldingCreateOrConnectWithoutUserInput | Prisma.HoldingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.HoldingCreateManyUserInputEnvelope;
    connect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
};
export type HoldingUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.HoldingCreateWithoutUserInput, Prisma.HoldingUncheckedCreateWithoutUserInput> | Prisma.HoldingCreateWithoutUserInput[] | Prisma.HoldingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HoldingCreateOrConnectWithoutUserInput | Prisma.HoldingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.HoldingCreateManyUserInputEnvelope;
    connect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
};
export type HoldingUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.HoldingCreateWithoutUserInput, Prisma.HoldingUncheckedCreateWithoutUserInput> | Prisma.HoldingCreateWithoutUserInput[] | Prisma.HoldingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HoldingCreateOrConnectWithoutUserInput | Prisma.HoldingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.HoldingUpsertWithWhereUniqueWithoutUserInput | Prisma.HoldingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.HoldingCreateManyUserInputEnvelope;
    set?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    disconnect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    delete?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    connect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    update?: Prisma.HoldingUpdateWithWhereUniqueWithoutUserInput | Prisma.HoldingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.HoldingUpdateManyWithWhereWithoutUserInput | Prisma.HoldingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.HoldingScalarWhereInput | Prisma.HoldingScalarWhereInput[];
};
export type HoldingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.HoldingCreateWithoutUserInput, Prisma.HoldingUncheckedCreateWithoutUserInput> | Prisma.HoldingCreateWithoutUserInput[] | Prisma.HoldingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.HoldingCreateOrConnectWithoutUserInput | Prisma.HoldingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.HoldingUpsertWithWhereUniqueWithoutUserInput | Prisma.HoldingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.HoldingCreateManyUserInputEnvelope;
    set?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    disconnect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    delete?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    connect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    update?: Prisma.HoldingUpdateWithWhereUniqueWithoutUserInput | Prisma.HoldingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.HoldingUpdateManyWithWhereWithoutUserInput | Prisma.HoldingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.HoldingScalarWhereInput | Prisma.HoldingScalarWhereInput[];
};
export type HoldingCreateNestedManyWithoutStockInput = {
    create?: Prisma.XOR<Prisma.HoldingCreateWithoutStockInput, Prisma.HoldingUncheckedCreateWithoutStockInput> | Prisma.HoldingCreateWithoutStockInput[] | Prisma.HoldingUncheckedCreateWithoutStockInput[];
    connectOrCreate?: Prisma.HoldingCreateOrConnectWithoutStockInput | Prisma.HoldingCreateOrConnectWithoutStockInput[];
    createMany?: Prisma.HoldingCreateManyStockInputEnvelope;
    connect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
};
export type HoldingUncheckedCreateNestedManyWithoutStockInput = {
    create?: Prisma.XOR<Prisma.HoldingCreateWithoutStockInput, Prisma.HoldingUncheckedCreateWithoutStockInput> | Prisma.HoldingCreateWithoutStockInput[] | Prisma.HoldingUncheckedCreateWithoutStockInput[];
    connectOrCreate?: Prisma.HoldingCreateOrConnectWithoutStockInput | Prisma.HoldingCreateOrConnectWithoutStockInput[];
    createMany?: Prisma.HoldingCreateManyStockInputEnvelope;
    connect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
};
export type HoldingUpdateManyWithoutStockNestedInput = {
    create?: Prisma.XOR<Prisma.HoldingCreateWithoutStockInput, Prisma.HoldingUncheckedCreateWithoutStockInput> | Prisma.HoldingCreateWithoutStockInput[] | Prisma.HoldingUncheckedCreateWithoutStockInput[];
    connectOrCreate?: Prisma.HoldingCreateOrConnectWithoutStockInput | Prisma.HoldingCreateOrConnectWithoutStockInput[];
    upsert?: Prisma.HoldingUpsertWithWhereUniqueWithoutStockInput | Prisma.HoldingUpsertWithWhereUniqueWithoutStockInput[];
    createMany?: Prisma.HoldingCreateManyStockInputEnvelope;
    set?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    disconnect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    delete?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    connect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    update?: Prisma.HoldingUpdateWithWhereUniqueWithoutStockInput | Prisma.HoldingUpdateWithWhereUniqueWithoutStockInput[];
    updateMany?: Prisma.HoldingUpdateManyWithWhereWithoutStockInput | Prisma.HoldingUpdateManyWithWhereWithoutStockInput[];
    deleteMany?: Prisma.HoldingScalarWhereInput | Prisma.HoldingScalarWhereInput[];
};
export type HoldingUncheckedUpdateManyWithoutStockNestedInput = {
    create?: Prisma.XOR<Prisma.HoldingCreateWithoutStockInput, Prisma.HoldingUncheckedCreateWithoutStockInput> | Prisma.HoldingCreateWithoutStockInput[] | Prisma.HoldingUncheckedCreateWithoutStockInput[];
    connectOrCreate?: Prisma.HoldingCreateOrConnectWithoutStockInput | Prisma.HoldingCreateOrConnectWithoutStockInput[];
    upsert?: Prisma.HoldingUpsertWithWhereUniqueWithoutStockInput | Prisma.HoldingUpsertWithWhereUniqueWithoutStockInput[];
    createMany?: Prisma.HoldingCreateManyStockInputEnvelope;
    set?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    disconnect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    delete?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    connect?: Prisma.HoldingWhereUniqueInput | Prisma.HoldingWhereUniqueInput[];
    update?: Prisma.HoldingUpdateWithWhereUniqueWithoutStockInput | Prisma.HoldingUpdateWithWhereUniqueWithoutStockInput[];
    updateMany?: Prisma.HoldingUpdateManyWithWhereWithoutStockInput | Prisma.HoldingUpdateManyWithWhereWithoutStockInput[];
    deleteMany?: Prisma.HoldingScalarWhereInput | Prisma.HoldingScalarWhereInput[];
};
export type HoldingCreateWithoutUserInput = {
    id?: string;
    quantity?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    stock: Prisma.StocksCreateNestedOneWithoutHoldingsInput;
};
export type HoldingUncheckedCreateWithoutUserInput = {
    id?: string;
    quantity?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stockId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HoldingCreateOrConnectWithoutUserInput = {
    where: Prisma.HoldingWhereUniqueInput;
    create: Prisma.XOR<Prisma.HoldingCreateWithoutUserInput, Prisma.HoldingUncheckedCreateWithoutUserInput>;
};
export type HoldingCreateManyUserInputEnvelope = {
    data: Prisma.HoldingCreateManyUserInput | Prisma.HoldingCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type HoldingUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.HoldingWhereUniqueInput;
    update: Prisma.XOR<Prisma.HoldingUpdateWithoutUserInput, Prisma.HoldingUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.HoldingCreateWithoutUserInput, Prisma.HoldingUncheckedCreateWithoutUserInput>;
};
export type HoldingUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.HoldingWhereUniqueInput;
    data: Prisma.XOR<Prisma.HoldingUpdateWithoutUserInput, Prisma.HoldingUncheckedUpdateWithoutUserInput>;
};
export type HoldingUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.HoldingScalarWhereInput;
    data: Prisma.XOR<Prisma.HoldingUpdateManyMutationInput, Prisma.HoldingUncheckedUpdateManyWithoutUserInput>;
};
export type HoldingScalarWhereInput = {
    AND?: Prisma.HoldingScalarWhereInput | Prisma.HoldingScalarWhereInput[];
    OR?: Prisma.HoldingScalarWhereInput[];
    NOT?: Prisma.HoldingScalarWhereInput | Prisma.HoldingScalarWhereInput[];
    id?: Prisma.StringFilter<"Holding"> | string;
    quantity?: Prisma.DecimalFilter<"Holding"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFilter<"Holding"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId?: Prisma.StringFilter<"Holding"> | string;
    stockId?: Prisma.StringFilter<"Holding"> | string;
    createdAt?: Prisma.DateTimeFilter<"Holding"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Holding"> | Date | string;
};
export type HoldingCreateWithoutStockInput = {
    id?: string;
    quantity?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutHoldingsInput;
};
export type HoldingUncheckedCreateWithoutStockInput = {
    id?: string;
    quantity?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HoldingCreateOrConnectWithoutStockInput = {
    where: Prisma.HoldingWhereUniqueInput;
    create: Prisma.XOR<Prisma.HoldingCreateWithoutStockInput, Prisma.HoldingUncheckedCreateWithoutStockInput>;
};
export type HoldingCreateManyStockInputEnvelope = {
    data: Prisma.HoldingCreateManyStockInput | Prisma.HoldingCreateManyStockInput[];
    skipDuplicates?: boolean;
};
export type HoldingUpsertWithWhereUniqueWithoutStockInput = {
    where: Prisma.HoldingWhereUniqueInput;
    update: Prisma.XOR<Prisma.HoldingUpdateWithoutStockInput, Prisma.HoldingUncheckedUpdateWithoutStockInput>;
    create: Prisma.XOR<Prisma.HoldingCreateWithoutStockInput, Prisma.HoldingUncheckedCreateWithoutStockInput>;
};
export type HoldingUpdateWithWhereUniqueWithoutStockInput = {
    where: Prisma.HoldingWhereUniqueInput;
    data: Prisma.XOR<Prisma.HoldingUpdateWithoutStockInput, Prisma.HoldingUncheckedUpdateWithoutStockInput>;
};
export type HoldingUpdateManyWithWhereWithoutStockInput = {
    where: Prisma.HoldingScalarWhereInput;
    data: Prisma.XOR<Prisma.HoldingUpdateManyMutationInput, Prisma.HoldingUncheckedUpdateManyWithoutStockInput>;
};
export type HoldingCreateManyUserInput = {
    id?: string;
    quantity?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    stockId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HoldingUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    stock?: Prisma.StocksUpdateOneRequiredWithoutHoldingsNestedInput;
};
export type HoldingUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stockId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HoldingUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    stockId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HoldingCreateManyStockInput = {
    id?: string;
    quantity?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HoldingUpdateWithoutStockInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutHoldingsNestedInput;
};
export type HoldingUncheckedUpdateWithoutStockInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HoldingUncheckedUpdateManyWithoutStockInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    avgPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HoldingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quantity?: boolean;
    avgPrice?: boolean;
    userId?: boolean;
    stockId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    stock?: boolean | Prisma.StocksDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["holding"]>;
export type HoldingSelectScalar = {
    id?: boolean;
    quantity?: boolean;
    avgPrice?: boolean;
    userId?: boolean;
    stockId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type HoldingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quantity" | "avgPrice" | "userId" | "stockId" | "createdAt" | "updatedAt", ExtArgs["result"]["holding"]>;
export type HoldingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    stock?: boolean | Prisma.StocksDefaultArgs<ExtArgs>;
};
export type $HoldingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Holding";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        stock: Prisma.$StocksPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quantity: runtime.Decimal;
        avgPrice: runtime.Decimal;
        userId: string;
        stockId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["holding"]>;
    composites: {};
};
export type HoldingGetPayload<S extends boolean | null | undefined | HoldingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HoldingPayload, S>;
export type HoldingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HoldingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HoldingCountAggregateInputType | true;
};
export interface HoldingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Holding'];
        meta: {
            name: 'Holding';
        };
    };
    /**
     * Find zero or one Holding that matches the filter.
     * @param {HoldingFindUniqueArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoldingFindUniqueArgs>(args: Prisma.SelectSubset<T, HoldingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HoldingClient<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Holding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HoldingFindUniqueOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoldingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HoldingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HoldingClient<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Holding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoldingFindFirstArgs>(args?: Prisma.SelectSubset<T, HoldingFindFirstArgs<ExtArgs>>): Prisma.Prisma__HoldingClient<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Holding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoldingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HoldingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HoldingClient<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Holdings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holdings
     * const holdings = await prisma.holding.findMany()
     *
     * // Get first 10 Holdings
     * const holdings = await prisma.holding.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const holdingWithIdOnly = await prisma.holding.findMany({ select: { id: true } })
     *
     */
    findMany<T extends HoldingFindManyArgs>(args?: Prisma.SelectSubset<T, HoldingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Holding.
     * @param {HoldingCreateArgs} args - Arguments to create a Holding.
     * @example
     * // Create one Holding
     * const Holding = await prisma.holding.create({
     *   data: {
     *     // ... data to create a Holding
     *   }
     * })
     *
     */
    create<T extends HoldingCreateArgs>(args: Prisma.SelectSubset<T, HoldingCreateArgs<ExtArgs>>): Prisma.Prisma__HoldingClient<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Holdings.
     * @param {HoldingCreateManyArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HoldingCreateManyArgs>(args?: Prisma.SelectSubset<T, HoldingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a Holding.
     * @param {HoldingDeleteArgs} args - Arguments to delete one Holding.
     * @example
     * // Delete one Holding
     * const Holding = await prisma.holding.delete({
     *   where: {
     *     // ... filter to delete one Holding
     *   }
     * })
     *
     */
    delete<T extends HoldingDeleteArgs>(args: Prisma.SelectSubset<T, HoldingDeleteArgs<ExtArgs>>): Prisma.Prisma__HoldingClient<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Holding.
     * @param {HoldingUpdateArgs} args - Arguments to update one Holding.
     * @example
     * // Update one Holding
     * const holding = await prisma.holding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HoldingUpdateArgs>(args: Prisma.SelectSubset<T, HoldingUpdateArgs<ExtArgs>>): Prisma.Prisma__HoldingClient<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Holdings.
     * @param {HoldingDeleteManyArgs} args - Arguments to filter Holdings to delete.
     * @example
     * // Delete a few Holdings
     * const { count } = await prisma.holding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HoldingDeleteManyArgs>(args?: Prisma.SelectSubset<T, HoldingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HoldingUpdateManyArgs>(args: Prisma.SelectSubset<T, HoldingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one Holding.
     * @param {HoldingUpsertArgs} args - Arguments to update or create a Holding.
     * @example
     * // Update or create a Holding
     * const holding = await prisma.holding.upsert({
     *   create: {
     *     // ... data to create a Holding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holding we want to update
     *   }
     * })
     */
    upsert<T extends HoldingUpsertArgs>(args: Prisma.SelectSubset<T, HoldingUpsertArgs<ExtArgs>>): Prisma.Prisma__HoldingClient<runtime.Types.Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingCountArgs} args - Arguments to filter Holdings to count.
     * @example
     * // Count the number of Holdings
     * const count = await prisma.holding.count({
     *   where: {
     *     // ... the filter for the Holdings we want to count
     *   }
     * })
    **/
    count<T extends HoldingCountArgs>(args?: Prisma.Subset<T, HoldingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HoldingCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HoldingAggregateArgs>(args: Prisma.Subset<T, HoldingAggregateArgs>): Prisma.PrismaPromise<GetHoldingAggregateType<T>>;
    /**
     * Group by Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingGroupByArgs} args - Group by arguments.
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
    groupBy<T extends HoldingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HoldingGroupByArgs['orderBy'];
    } : {
        orderBy?: HoldingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HoldingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoldingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Holding model
     */
    readonly fields: HoldingFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Holding.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__HoldingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    stock<T extends Prisma.StocksDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StocksDefaultArgs<ExtArgs>>): Prisma.Prisma__StocksClient<runtime.Types.Result.GetResult<Prisma.$StocksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the Holding model
 */
export interface HoldingFieldRefs {
    readonly id: Prisma.FieldRef<"Holding", 'String'>;
    readonly quantity: Prisma.FieldRef<"Holding", 'Decimal'>;
    readonly avgPrice: Prisma.FieldRef<"Holding", 'Decimal'>;
    readonly userId: Prisma.FieldRef<"Holding", 'String'>;
    readonly stockId: Prisma.FieldRef<"Holding", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Holding", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Holding", 'DateTime'>;
}
/**
 * Holding findUnique
 */
export type HoldingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Holding to fetch.
     */
    where: Prisma.HoldingWhereUniqueInput;
};
/**
 * Holding findUniqueOrThrow
 */
export type HoldingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Holding to fetch.
     */
    where: Prisma.HoldingWhereUniqueInput;
};
/**
 * Holding findFirst
 */
export type HoldingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Holding to fetch.
     */
    where?: Prisma.HoldingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Holdings to fetch.
     */
    orderBy?: Prisma.HoldingOrderByWithRelationInput | Prisma.HoldingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Holdings.
     */
    cursor?: Prisma.HoldingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Holdings.
     */
    distinct?: Prisma.HoldingScalarFieldEnum | Prisma.HoldingScalarFieldEnum[];
};
/**
 * Holding findFirstOrThrow
 */
export type HoldingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Holding to fetch.
     */
    where?: Prisma.HoldingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Holdings to fetch.
     */
    orderBy?: Prisma.HoldingOrderByWithRelationInput | Prisma.HoldingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Holdings.
     */
    cursor?: Prisma.HoldingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Holdings.
     */
    distinct?: Prisma.HoldingScalarFieldEnum | Prisma.HoldingScalarFieldEnum[];
};
/**
 * Holding findMany
 */
export type HoldingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Holdings to fetch.
     */
    where?: Prisma.HoldingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Holdings to fetch.
     */
    orderBy?: Prisma.HoldingOrderByWithRelationInput | Prisma.HoldingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Holdings.
     */
    cursor?: Prisma.HoldingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Holdings.
     */
    distinct?: Prisma.HoldingScalarFieldEnum | Prisma.HoldingScalarFieldEnum[];
};
/**
 * Holding create
 */
export type HoldingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Holding.
     */
    data: Prisma.XOR<Prisma.HoldingCreateInput, Prisma.HoldingUncheckedCreateInput>;
};
/**
 * Holding createMany
 */
export type HoldingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Holdings.
     */
    data: Prisma.HoldingCreateManyInput | Prisma.HoldingCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Holding update
 */
export type HoldingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Holding.
     */
    data: Prisma.XOR<Prisma.HoldingUpdateInput, Prisma.HoldingUncheckedUpdateInput>;
    /**
     * Choose, which Holding to update.
     */
    where: Prisma.HoldingWhereUniqueInput;
};
/**
 * Holding updateMany
 */
export type HoldingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Holdings.
     */
    data: Prisma.XOR<Prisma.HoldingUpdateManyMutationInput, Prisma.HoldingUncheckedUpdateManyInput>;
    /**
     * Filter which Holdings to update
     */
    where?: Prisma.HoldingWhereInput;
    /**
     * Limit how many Holdings to update.
     */
    limit?: number;
};
/**
 * Holding upsert
 */
export type HoldingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Holding to update in case it exists.
     */
    where: Prisma.HoldingWhereUniqueInput;
    /**
     * In case the Holding found by the `where` argument doesn't exist, create a new Holding with this data.
     */
    create: Prisma.XOR<Prisma.HoldingCreateInput, Prisma.HoldingUncheckedCreateInput>;
    /**
     * In case the Holding was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.HoldingUpdateInput, Prisma.HoldingUncheckedUpdateInput>;
};
/**
 * Holding delete
 */
export type HoldingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Holding to delete.
     */
    where: Prisma.HoldingWhereUniqueInput;
};
/**
 * Holding deleteMany
 */
export type HoldingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Holdings to delete
     */
    where?: Prisma.HoldingWhereInput;
    /**
     * Limit how many Holdings to delete.
     */
    limit?: number;
};
/**
 * Holding without action
 */
export type HoldingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=Holding.d.ts.map