import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, Search, User, ChevronDown, Menu, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function Navbar() {
    const token = useAuthStore((state) => state.token);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // ---------------------------------------------------------------------------
    // AUTHENTICATED NAVBAR
    // ---------------------------------------------------------------------------
    if (token) {
        return (
            <nav className="h-14 w-full shrink-0 border-b border-zinc-800 bg-[#0f0f0f] text-white">
                <div className="flex h-full items-center justify-between gap-3 px-3 sm:px-4 lg:px-6">
                    {/* Logo */}
                    <Link onClick={() => {
                        navigate('/dashboard')
                    }} to="/dashboard" className="flex shrink-0 items-center gap-2 sm:gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-emerald-400 to-emerald-600 font-bold text-black shadow-[0_0_0_1px_rgba(16,185,129,0.25),0_2px_8px_rgba(16,185,129,0.25)]">
                            T
                        </div>
                        <span className="hidden text-lg font-semibold tracking-tight sm:block">
                            TradeForge
                        </span>
                    </Link>

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
                            className="relative rounded-md text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
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

    // ---------------------------------------------------------------------------
    // UNAUTHENTICATED NAVBAR (Landing Page)
    // ---------------------------------------------------------------------------
    return (
        <nav className="border-b border-zinc-800/80 bg-[#0a0a0a]/95 text-white sticky top-0 z-50 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 font-bold text-black">
                        T
                    </div>
                    <span className="text-lg font-semibold tracking-tight">
                        TradeForge
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <a href="#markets" className="text-sm text-zinc-400 transition hover:text-white">
                        Markets
                    </a>
                    <a href="#features" className="text-sm text-zinc-400 transition hover:text-white">
                        Features
                    </a>
                    <a href="#about" className="text-sm text-zinc-400 transition hover:text-white">
                        About
                    </a>
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <button
                        onClick={() => navigate("/login")}
                        className="rounded-md px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                    >
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-md p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white md:hidden"
                >
                    {menuOpen ? <X size={21} /> : <Menu size={21} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="border-t border-zinc-800 px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-1">
                        <a href="#markets" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white">
                            Markets
                        </a>
                        <a href="#features" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white">
                            Features
                        </a>
                        <a href="#about" onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white">
                            About
                        </a>
                        <div className="mt-3 flex gap-2 border-t border-zinc-800 pt-3">
                            <button
                                onClick={() => { setMenuOpen(false); navigate("/login"); }}
                                className="flex-1 rounded-md px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => { setMenuOpen(false); navigate("/signup"); }}
                                className="flex-1 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-black"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}