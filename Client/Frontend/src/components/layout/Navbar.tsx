import { Bell, Search, User, ChevronDown } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="h-14 w-full shrink-0 border-b border-zinc-800 bg-[#0f0f0f] text-white">
            <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-4 lg:px-6">

                {/* Logo */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-emerald-400 to-emerald-600 font-bold text-black shadow-[0_0_0_1px_rgba(16,185,129,0.25),0_2px_8px_rgba(16,185,129,0.25)]">
                        T
                    </div>

                    <span className="hidden text-lg font-semibold tracking-tight sm:block">
                        TradeForge
                    </span>
                </div>

                {/* Search */}
                <div className="group flex h-9 w-full max-w-[400px] items-center gap-2 rounded-md border border-zinc-800 bg-[#181818] px-3 transition-colors focus-within:border-zinc-600 focus-within:bg-[#1c1c1c] sm:mx-4">
                    <Search
                        size={17}
                        className="shrink-0 text-zinc-500 transition-colors group-focus-within:text-zinc-300"
                    />

                    <input
                        type="text"
                        placeholder="Search stocks..."
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                    />

                    <span className="hidden shrink-0 rounded border border-zinc-700/80 px-1.5 py-0.5 font-mono text-[10px] leading-none text-zinc-500 md:block">
                        Ctrl K
                    </span>
                </div>

                {/* Right section */}
                <div className="flex shrink-0 items-center gap-3 sm:gap-5">

                    {/* Market Status */}
                    <div className="hidden items-center gap-2 text-xs text-zinc-400 lg:flex">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        Market Open
                    </div>

                    {/* Balance */}
                    <div className="hidden text-sm xl:block">
                        <span className="mr-2 text-zinc-500">Balance</span>
                        <span className="font-medium tabular-nums">₹50,000</span>
                    </div>

                    {/* Notifications */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f] rounded-md"
                    >
                        <Bell size={19} />
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-[#0f0f0f]" />
                    </button>

                    {/* Profile */}
                    <button
                        type="button"
                        aria-label="Profile menu"
                        className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-zinc-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800">
                            <User size={15} />
                        </span>
                        <ChevronDown size={14} className="hidden text-zinc-500 sm:block" />
                    </button>
                </div>
            </div>
        </nav>
    );
}