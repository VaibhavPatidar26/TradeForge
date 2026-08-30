import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  LogOut,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);


  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header / Portfolio Summary */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">Total Portfolio Value</p>
            <div className="mt-1 flex items-baseline gap-4">
              <h1 className="text-4xl font-semibold tracking-tight">₹1,24,500.80</h1>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-sm font-medium text-emerald-400">
                <TrendingUp size={16} />
                +₹3,240.50 (2.6%)
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-500">Available to trade: <span className="text-zinc-300">₹45,000.00</span></p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-zinc-800 border border-zinc-800"
            >
              <LogOut size={16} />
              Logout
            </button>
            <button className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 border border-zinc-800">
              <Wallet size={16} />
              Add Funds
            </button>
            <button className="flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400">
              Trade Now
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Main Chart Section (Takes up 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Chart Card */}
            <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5 shadow-2xl shadow-black/40">
              <div className="mb-6 flex items-center justify-between border-b border-zinc-800/60 pb-4">
                <div>
                  <h2 className="text-lg font-medium">Portfolio Performance</h2>
                  <p className="text-xs text-zinc-500">Past 30 days</p>
                </div>
                <div className="flex gap-2 rounded-md bg-zinc-900 p-1">
                  {['1D', '1W', '1M', '1Y', 'ALL'].map((tf) => (
                    <button 
                      key={tf}
                      className={`rounded px-3 py-1 text-xs font-medium transition ${tf === '1M' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Graphic reused from Landing pattern */}
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-t border-zinc-800/40" />
                    <div className="border-t border-zinc-800/40" />
                    <div className="border-t border-zinc-800/40" />
                    <div className="border-t border-zinc-800/40" />
                    <div className="border-t border-zinc-800/40" />
                </div>
                <svg viewBox="0 0 800 220" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                    <defs>
                        <linearGradient id="dashboardChartGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M0 180 L50 160 L100 170 L150 130 L200 140 L250 100 L300 120 L350 80 L400 90 L450 60 L500 80 L550 40 L600 50 L650 30 L700 40 L800 10 V220 H0 Z" fill="url(#dashboardChartGradient)" className="text-emerald-500" />
                    <path d="M0 180 L50 160 L100 170 L150 130 L200 140 L250 100 L300 120 L350 80 L400 90 L450 60 L500 80 L550 40 L600 50 L650 30 L700 40 L800 10" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500" />
                </svg>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5">
              <h2 className="mb-4 text-sm font-medium">Recent Activity</h2>
              <div className="space-y-1">
                <ActivityRow type="buy" symbol="RELIANCE" qty="10" price="₹1,452.30" date="Today, 10:24 AM" />
                <ActivityRow type="sell" symbol="TCS" qty="5" price="₹3,420.50" date="Yesterday, 2:15 PM" />
                <ActivityRow type="deposit" symbol="FUNDS" qty="--" price="+₹10,000.00" date="Oct 12, 09:00 AM" />
              </div>
            </div>

          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            
            {/* Quick Trade Widget */}
            <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5">
              <h2 className="mb-4 text-sm font-medium">Quick Trade</h2>
              <div className="space-y-4">
                <div className="flex rounded-md bg-zinc-900 p-1">
                  <button className="flex-1 rounded bg-zinc-800 py-1.5 text-xs font-medium text-white shadow">Buy</button>
                  <button className="flex-1 rounded py-1.5 text-xs font-medium text-zinc-500 hover:text-white transition">Sell</button>
                </div>
                
                <div>
                  <label className="mb-1.5 block text-xs text-zinc-500">Asset</label>
                  <select className="w-full rounded-lg border border-zinc-800 bg-[#0a0a0a] px-3 py-2 text-sm text-white focus:border-emerald-500/50 focus:outline-none">
                    <option>RELIANCE (NSE)</option>
                    <option>TCS (NSE)</option>
                    <option>INFY (NSE)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 flex justify-between text-xs text-zinc-500">
                    <span>Quantity</span>
                    <span>Max: 30</span>
                  </label>
                  <input type="number" defaultValue="1" className="w-full rounded-lg border border-zinc-800 bg-[#0a0a0a] px-3 py-2 text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                </div>

                <div className="flex justify-between border-t border-zinc-800 pt-4 text-sm">
                  <span className="text-zinc-500">Estimated Cost</span>
                  <span className="font-medium">₹1,452.30</span>
                </div>

                <button className="w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400 active:scale-[0.98]">
                  Place Order
                </button>
              </div>
            </div>

            {/* Watchlist reused from Landing */}
            <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5">
              <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-medium">Watchlist</h2>
                  <button className="text-xs text-emerald-400 hover:text-emerald-300">View All</button>
              </div>
              <div className="space-y-1">
                  <MarketRow symbol="RELIANCE" price="₹1,452.30" change="+1.24%" positive />
                  <MarketRow symbol="TCS" price="₹3,420.50" change="-0.42%" />
                  <MarketRow symbol="INFY" price="₹1,804.20" change="+0.86%" positive />
                  <MarketRow symbol="HDFCBANK" price="₹1,520.10" change="+0.12%" positive />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Components tailored for the Dashboard

function MarketRow({ symbol, price, change, positive = false }: { symbol: string, price: string, change: string, positive?: boolean }) {
  return (
      <div className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 transition hover:bg-zinc-900 border border-transparent hover:border-zinc-800">
          <div>
              <p className="text-sm font-medium">{symbol}</p>
              <p className="mt-0.5 text-xs text-zinc-500">NSE</p>
          </div>
          <div className="text-right">
              <p className="text-sm">{price}</p>
              <p className={`mt-0.5 text-xs font-medium flex items-center justify-end gap-0.5 ${positive ? "text-emerald-400" : "text-red-400"}`}>
                  {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {change}
              </p>
          </div>
      </div>
  );
}

function ActivityRow({ type, symbol, qty, price, date }: { type: 'buy' | 'sell' | 'deposit', symbol: string, qty: string, price: string, date: string }) {
  return (
    <div className="flex items-center justify-between rounded-md px-3 py-3 transition hover:bg-zinc-900 border border-transparent hover:border-zinc-800">
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${type === 'buy' ? 'bg-emerald-500/10 text-emerald-400' : type === 'sell' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
          {type === 'buy' ? <TrendingUp size={16} /> : type === 'sell' ? <TrendingUp size={16} className="rotate-180" /> : <Wallet size={16} />}
        </div>
        <div>
          <p className="text-sm font-medium capitalize">{type} {type !== 'deposit' && symbol}</p>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Clock size={12} /> {date}
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{price}</p>
        <p className="text-xs text-zinc-500">Qty: {qty}</p>
      </div>
    </div>
  )
}