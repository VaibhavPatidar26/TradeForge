import { useMemo } from "react";
import { usePanelStore } from "../../store/panelStore";
import { useOrdersStore } from "../../store/ordersStore";

export default function BottomPanelNavigation() {
  const { currentPanel, setCurrentPanel } = usePanelStore();
  const orders = useOrdersStore((s) => s.orders);
  const openCount = useMemo(() => orders.filter((o) => o.status === "OPEN").length, [orders]);


  const base     = "flex-1 py-3 text-xs font-medium transition-all duration-200 outline-none relative";
  const active   = "text-emerald-500 border-t-2 border-emerald-500 bg-[#11161c]";
  const inactive = "text-gray-500 border-t-2 border-transparent hover:text-gray-300 hover:bg-[#11161c]/50";

  return (
    <div className="flex w-full bg-[#0b0e11] border-t border-[#1f242b] shrink-0">
      <button
        onClick={() => setCurrentPanel("watchlist")}
        className={`${base} ${currentPanel === "watchlist" ? active : inactive}`}
      >
        Watchlist
      </button>

      <button
        onClick={() => setCurrentPanel("portfolio")}
        className={`${base} ${currentPanel === "portfolio" ? active : inactive}`}
      >
        Portfolio
      </button>

      <button
        onClick={() => setCurrentPanel("orders")}
        className={`${base} ${currentPanel === "orders" ? active : inactive}`}
      >
        Orders
        {/* Badge showing count of OPEN (pending) limit orders */}
        {openCount > 0 && (
          <span className="absolute top-1.5 right-2.5 min-w-[14px] h-[14px] bg-yellow-500 text-[9px] text-black font-bold rounded-full flex items-center justify-center px-0.5">
            {openCount}
          </span>
        )}
      </button>
    </div>
  );
}