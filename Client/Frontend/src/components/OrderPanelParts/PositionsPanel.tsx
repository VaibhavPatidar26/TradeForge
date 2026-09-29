import { useEffect, useMemo, useRef, useState } from "react";
import usePortfolioStore from "../../store/portFolioStore";
import { usePriceStore } from "../../store/priceStore";
import { useOrdersStore } from "../../store/ordersStore";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import selling from "../../api/selling";

const MIN_HEIGHT = 80;
const DEFAULT_HEIGHT = 140;
const MAX_VIEWPORT_PERCENT = 0.40; // Max 40% of viewport height

function fmt(n: number) {
    return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PositionsPanel() {
    const [panelHeight, setPanelHeight] = useState(DEFAULT_HEIGHT);
    const [activeTab, setActiveTab] = useState<"positions" | "pending">("positions");
    const dragStartY  = useRef<number>(0);
    const dragStartH  = useRef<number>(DEFAULT_HEIGHT);

    const token            = useAuthStore((s) => s.token);
    const holdings         = usePortfolioStore((s) => s.holdings);
    const fetchPortfolio   = usePortfolioStore((s) => s.fetchPortfolio);
    const prices           = usePriceStore((s) => s.prices);
    const orders           = useOrdersStore((s) => s.orders);
    const fetchTodayOrders = useOrdersStore((s) => s.fetchTodayOrders);
    const cancelOrder      = useOrdersStore((s) => s.cancelOrder);
    const fetchUser        = useUserStore((s) => s.fetchUser);

    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [exitingStockId, setExitingStockId] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            fetchPortfolio(token);
            fetchTodayOrders(token);
            fetchUser(token);
        }
    }, [token, fetchPortfolio, fetchTodayOrders, fetchUser]);

    async function handleCancel(orderId: string) {
        if (!token) return;
        setCancellingId(orderId);
        try {
            await cancelOrder(token, orderId);
        } catch (err: any) {
            console.error("Cancel order error:", err);
        } finally {
            setCancellingId(null);
        }
    }

    async function handleExit(stockId: string, quantity: number) {
        if (!token || quantity <= 0) return;
        setExitingStockId(stockId);
        try {
            await selling(token, stockId, quantity);
            await Promise.all([
                fetchPortfolio(token),
                fetchTodayOrders(token),
                fetchUser(token)
            ]);
        } catch (err: any) {
            console.error("Failed to exit position:", err);
            alert(err?.response?.data?.message || err?.message || "Failed to exit position");
        } finally {
            setExitingStockId(null);
        }
    }

    // Ensure panelHeight never exceeds 40% viewport height on resize
    useEffect(() => {
        function handleWindowResize() {
            const maxHeight = Math.floor(window.innerHeight * MAX_VIEWPORT_PERCENT);
            setPanelHeight((prev) => Math.min(prev, maxHeight));
        }
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const openOrders = useMemo(() => {
        return orders.filter((o) => o.status === "OPEN");
    }, [orders]);

    // ── Drag-to-resize ────────────────────────────────────────────────────────
    function onMouseDown(e: React.MouseEvent) {
        e.preventDefault();
        dragStartY.current = e.clientY;
        dragStartH.current = panelHeight;

        document.body.style.cursor = "ns-resize";
        document.body.style.userSelect = "none";

        function onMove(ev: MouseEvent) {
            const maxHeight = Math.floor(window.innerHeight * MAX_VIEWPORT_PERCENT);
            const delta = dragStartY.current - ev.clientY; // dragging UP = bigger panel
            const next  = Math.min(maxHeight, Math.max(MIN_HEIGHT, dragStartH.current + delta));
            setPanelHeight(next);
        }

        function onUp() {
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        }

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    }

    return (
        <div
            className="flex flex-col border-t border-[#1f242b] bg-[#0b0e11] shrink-0 select-none"
            style={{ height: panelHeight }}
        >
            {/* ── Drag handle ─────────────────────────────────────────────── */}
            <div
                onMouseDown={onMouseDown}
                className="h-1.5 w-full flex items-center justify-center cursor-ns-resize group shrink-0"
                title="Drag to resize"
            >
                <div className="w-12 h-0.5 rounded-full bg-[#2a2e39] group-hover:bg-emerald-600 transition-colors" />
            </div>

            {/* ── Tab bar ─────────────────────────────────────────────────── */}
            <div className="flex items-center border-b border-[#1f242b] shrink-0 px-3 gap-4">
                <button
                    onClick={() => setActiveTab("positions")}
                    className={`py-1.5 text-xs font-medium transition-colors border-b-2 -mb-px ${
                        activeTab === "positions"
                            ? "border-emerald-500 text-emerald-400"
                            : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                >
                    Positions
                    {holdings.length > 0 && (
                        <span className="ml-1.5 bg-[#1f2630] text-gray-400 text-[9px] px-1 rounded">
                            {holdings.length}
                        </span>
                    )}
                </button>

                <button
                    onClick={() => setActiveTab("pending")}
                    className={`py-1.5 text-xs font-medium transition-colors border-b-2 -mb-px ${
                        activeTab === "pending"
                            ? "border-yellow-500 text-yellow-400"
                            : "border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                >
                    Pending
                    {openOrders.length > 0 && (
                        <span className="ml-1.5 bg-yellow-950/60 text-yellow-400 text-[9px] px-1 rounded">
                            {openOrders.length}
                        </span>
                    )}
                </button>
            </div>

            {/* ── Scrollable content ──────────────────────────────────────── */}
            <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden">
                {activeTab === "positions" && (
                    <PositionsTable
                        holdings={holdings}
                        prices={prices}
                        onExit={handleExit}
                        exitingStockId={exitingStockId}
                    />
                )}
                {activeTab === "pending" && (
                    <PendingTable
                        orders={openOrders}
                        onCancel={handleCancel}
                        cancellingId={cancellingId}
                    />
                )}
            </div>
        </div>
    );
}

// ── Positions table ────────────────────────────────────────────────────────────
function PositionsTable({
    holdings,
    prices,
    onExit,
    exitingStockId
}: {
    holdings: any[];
    prices: Record<string, number>;
    onExit: (stockId: string, quantity: number) => void;
    exitingStockId: string | null;
}) {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    function updateQty(holdingId: string, val: number, maxQty: number) {
        const clamped = Math.max(1, Math.min(maxQty, Math.floor(val)));
        setQuantities((prev) => ({ ...prev, [holdingId]: clamped }));
    }

    if (holdings.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-xs text-gray-600">
                No open positions
            </div>
        );
    }

    return (
        <table className="w-full text-xs">
            <thead>
                <tr className="text-gray-600 border-b border-[#1f242b]">
                    <th className="text-left px-3 py-1.5 font-medium">Symbol</th>
                    <th className="text-right px-3 py-1.5 font-medium">Qty</th>
                    <th className="text-right px-3 py-1.5 font-medium">Avg</th>
                    <th className="text-right px-3 py-1.5 font-medium">LTP</th>
                    <th className="text-right px-3 py-1.5 font-medium">P&L</th>
                    <th className="text-right px-3 py-1.5 font-medium">P&L %</th>
                    <th className="text-right px-3 py-1.5 font-medium">Exit Position</th>
                </tr>
            </thead>
            <tbody>
                {holdings.map(function (h) {
                    const ltp      = prices[h.stockId] ?? prices[h.stock?.instrument_key] ?? null;
                    const avg      = Number(h.avgPrice);
                    const qty      = Number(h.quantity);
                    const pnl      = ltp != null ? (ltp - avg) * qty : null;
                    const pnlPct   = ltp != null ? ((ltp - avg) / avg) * 100 : null;
                    const positive = pnl != null && pnl >= 0;

                    const currentExitQty = Math.min(quantities[h.id] ?? qty, qty);
                    const isExiting = exitingStockId === h.stockId;

                    return (
                        <tr
                            key={h.id}
                            className="border-b border-[#1a1e24] hover:bg-[#11161c] transition-colors"
                        >
                            <td className="px-3 py-2">
                                <span className="font-semibold text-gray-200">
                                    {h.stock?.trading_symbol ?? h.stockId}
                                </span>
                                <span className="ml-1.5 text-[10px] text-gray-600">
                                    {h.stock?.exchange}
                                </span>
                            </td>
                            <td className="px-3 py-2 text-right text-gray-300 tabular-nums">{qty}</td>
                            <td className="px-3 py-2 text-right text-gray-400 tabular-nums">₹{fmt(avg)}</td>
                            <td className="px-3 py-2 text-right tabular-nums">
                                {ltp != null ? (
                                    <span className="text-gray-200">₹{fmt(ltp)}</span>
                                ) : (
                                    <span className="text-gray-600">—</span>
                                )}
                            </td>
                            <td className={`px-3 py-2 text-right tabular-nums font-medium ${
                                pnl == null ? "text-gray-600" :
                                positive ? "text-emerald-400" : "text-red-400"
                            }`}>
                                {pnl != null ? `${positive ? "+" : ""}₹${fmt(Math.abs(pnl))}` : "—"}
                            </td>
                            <td className={`px-3 py-2 text-right tabular-nums text-[11px] ${
                                pnlPct == null ? "text-gray-600" :
                                positive ? "text-emerald-400" : "text-red-400"
                            }`}>
                                {pnlPct != null
                                    ? `${positive ? "+" : ""}${pnlPct.toFixed(2)}%`
                                    : "—"}
                            </td>
                            <td className="px-3 py-1.5 text-right">
                                <div className="inline-flex items-center gap-1.5 justify-end">
                                    <div className="flex items-center border border-[#2a2e39] bg-[#131722] rounded px-1 py-0.5">
                                        <button
                                            type="button"
                                            onClick={() => updateQty(h.id, currentExitQty - 1, qty)}
                                            disabled={currentExitQty <= 1 || isExiting}
                                            className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer text-xs select-none"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            max={qty}
                                            value={currentExitQty}
                                            onChange={(e) => {
                                                const v = Number(e.target.value);
                                                if (!isNaN(v)) updateQty(h.id, v, qty);
                                            }}
                                            disabled={isExiting}
                                            className="w-10 text-center bg-transparent text-gray-200 text-xs focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => updateQty(h.id, currentExitQty + 1, qty)}
                                            disabled={currentExitQty >= qty || isExiting}
                                            className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer text-xs select-none"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => onExit(h.stockId, currentExitQty)}
                                        disabled={isExiting || currentExitQty <= 0}
                                        className="text-[11px] text-red-400 hover:text-red-300 disabled:opacity-50 px-2 py-0.5 rounded border border-red-900/40 hover:border-red-700 bg-red-950/20 cursor-pointer transition-colors"
                                    >
                                        {isExiting ? "Exiting..." : "Exit"}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

// ── Pending limit orders table ─────────────────────────────────────────────────
function PendingTable({
    orders,
    onCancel,
    cancellingId
}: {
    orders: any[];
    onCancel: (orderId: string) => void;
    cancellingId: string | null;
}) {
    if (orders.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-xs text-gray-600">
                No pending limit orders
            </div>
        );
    }

    return (
        <table className="w-full text-xs">
            <thead>
                <tr className="text-gray-600 border-b border-[#1f242b]">
                    <th className="text-left px-3 py-1.5 font-medium">Symbol</th>
                    <th className="text-left px-3 py-1.5 font-medium">Side</th>
                    <th className="text-right px-3 py-1.5 font-medium">Qty</th>
                    <th className="text-right px-3 py-1.5 font-medium">Limit Price</th>
                    <th className="text-right px-3 py-1.5 font-medium">Placed</th>
                    <th className="text-right px-3 py-1.5 font-medium">Action</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(function (o) {
                    const isBuy = o.side === "BUY";
                    const isCancelling = cancellingId === o.id;
                    const time  = new Date(o.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                    return (
                        <tr
                            key={o.id}
                            className="border-b border-[#1a1e24] hover:bg-[#11161c] transition-colors"
                        >
                            <td className="px-3 py-2">
                                <div
                                    className={`inline-flex items-center gap-1.5 px-1 border-l-2 ${
                                        isBuy ? "border-emerald-500" : "border-red-500"
                                    }`}
                                >
                                    <span className="font-semibold text-gray-200">
                                        {o.stock?.trading_symbol ?? o.stockId}
                                    </span>
                                </div>
                            </td>
                            <td className={`px-3 py-2 font-bold ${isBuy ? "text-emerald-400" : "text-red-400"}`}>
                                {o.side}
                            </td>
                            <td className="px-3 py-2 text-right text-gray-300 tabular-nums">
                                {Number(o.quantity)}
                            </td>
                            <td className="px-3 py-2 text-right text-gray-200 tabular-nums">
                                ₹{fmt(Number(o.limitPrice))}
                            </td>
                            <td className="px-3 py-2 text-right text-gray-500 tabular-nums">{time}</td>
                            <td className="px-3 py-2 text-right">
                                <button
                                    onClick={() => onCancel(o.id)}
                                    disabled={isCancelling}
                                    className="text-[11px] text-red-400 hover:text-red-300 disabled:opacity-50 px-2 py-0.5 rounded border border-red-900/40 hover:border-red-700 bg-red-950/20 cursor-pointer transition-colors"
                                >
                                    {isCancelling ? "Cancelling..." : "Cancel"}
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
