import { useEffect } from "react";
import { useOrdersStore, type Order } from "../../store/ordersStore";
import { useAuthStore } from "../../store/authStore";

function statusBadge(status: Order["status"]) {
    if (status === "COMPLETED") {
        return (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                Executed
            </span>
        );
    }
    if (status === "OPEN") {
        return (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-yellow-950/60 text-yellow-400 border border-yellow-800/40">
                Open
            </span>
        );
    }
    if (status === "REJECTED") {
        return (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-950/60 text-red-400 border border-red-800/40">
                Rejected
            </span>
        );
    }
    return (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-800 text-gray-400 border border-gray-700">
            {status}
        </span>
    );
}

function fmt(n: number) {
    return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function Orders() {
    const token = useAuthStore((s) => s.token);
    const orders = useOrdersStore((s) => s.orders);
    const isLoading = useOrdersStore((s) => s.isLoading);
    const fetchTodayOrders = useOrdersStore((s) => s.fetchTodayOrders);

    useEffect(function () {
        if (token) fetchTodayOrders(token);
    }, [token, fetchTodayOrders]);


    const openOrders  = orders.filter((o) => o.status === "OPEN");
    const doneOrders  = orders.filter((o) => o.status !== "OPEN");

    return (
        <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white p-3 overflow-y-auto">
            <h1 className="text-lg font-semibold mb-3">Today's Orders</h1>

            {isLoading && (
                <div className="text-xs text-gray-500 text-center py-6">Loading orders…</div>
            )}

            {!isLoading && orders.length === 0 && (
                <div className="rounded-lg border border-dashed border-[#252b33] bg-[#11161c]/40 p-6 text-center">
                    <p className="text-xs text-gray-400 font-medium">No orders today</p>
                    <p className="text-[11px] text-gray-500 mt-1">Place a market or limit order to get started</p>
                </div>
            )}

            {/* Open / Pending orders */}
            {openOrders.length > 0 && (
                <div className="mb-4">
                    <p className="text-[10px] uppercase tracking-widest text-yellow-500/70 font-semibold mb-2">
                        Pending
                    </p>
                    <div className="rounded-lg border border-[#252b33] bg-[#11161c] overflow-hidden divide-y divide-[#1f242b]">
                        {openOrders.map((order) => (
                            <OrderRow key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            )}

            {/* Executed / Rejected orders */}
            {doneOrders.length > 0 && (
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                        Executed
                    </p>
                    <div className="rounded-lg border border-[#252b33] bg-[#11161c] overflow-hidden divide-y divide-[#1f242b]">
                        {doneOrders.map((order) => (
                            <OrderRow key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function OrderRow({ order }: { order: Order }) {
    const isBuy  = order.side === "BUY";
    const symbol = order.stock?.trading_symbol ?? order.stockId;
    const name   = order.stock?.name ?? order.stockId;

    const displayPrice =
        order.status === "COMPLETED" && order.executedPrice != null
            ? order.executedPrice
            : order.limitPrice ?? null;

    return (
        <div className="px-3 py-2.5 flex items-center gap-2">
            {/* Side indicator */}
            <div
                className={`w-1 self-stretch rounded-full shrink-0 ${
                    isBuy ? "bg-emerald-500" : "bg-red-500"
                }`}
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-gray-200 truncate">{symbol}</span>
                    <span
                        className={`text-[10px] font-bold ${
                            isBuy ? "text-emerald-400" : "text-red-400"
                        }`}
                    >
                        {order.side}
                    </span>
                    <span className="text-[10px] text-gray-500 bg-[#1f242b] px-1 rounded">
                        {order.orderType}
                    </span>
                </div>
                <p className="text-[10px] text-gray-500 truncate">{name}</p>
            </div>

            {/* Right side */}
            <div className="text-right shrink-0">
                {statusBadge(order.status)}
                <p className="text-[11px] text-gray-300 tabular-nums mt-1">
                    {Number(order.quantity)} qty
                    {displayPrice != null && (
                        <> · ₹{fmt(Number(displayPrice))}</>
                    )}
                </p>
            </div>
        </div>
    );
}
