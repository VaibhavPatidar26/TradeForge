import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, User, ChevronDown } from "lucide-react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import FloatingWindow from "../ui/FloatingWindow";

export default function AuthNavbar() {
    const logout = useAuthStore((state) => state.logout);
    const token = useAuthStore((state) => state.token);
    const user = useUserStore((state) => state.user);
    const balance = useUserStore((state) => state.balance);
    const fetchUser = useUserStore((state) => state.fetchUser);
    const clearUser = useUserStore((state) => state.clearUser);

    const [profileClicked, setProfileClicked] = useState(false);
    const [searchStockName, setSearchStockName] = useState<string>("");
    const [availableStocks, setAvailableStocks] = useState<Array<any>>([]);

    const searchContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (token) {
            fetchUser(token);
        }
    }, [token, fetchUser]);

    // Close search dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setSearchStockName("");
                setAvailableStocks([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Keyboard shortcut Ctrl+K / Cmd+K to focus search input
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Debounced search API request
    useEffect(() => {
        if (searchStockName.trim() === "") {
            setAvailableStocks([]);
            return;
        }

        const timer = setTimeout(() => {
            async function searchStock(name: string) {
                try {
                    const response = await axios.get(
                        `${BACKEND_URL}api/search/searchStock?stockName=${name}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setAvailableStocks(response.data.availableStocks || []);
                } catch (error) {
                    console.error("Top bar search failed:", error);
                }
            }
            searchStock(searchStockName);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchStockName, token, BACKEND_URL]);

    function LogoutHandler() {
        clearUser();
        logout();
    }

    function fmt(n: number) {
        return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

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

                {/* Search Bar */}
                <div
                    ref={searchContainerRef}
                    className="relative group flex h-9 flex-1 min-w-0 max-w-[180px] sm:max-w-[400px] items-center gap-2 rounded-md border border-zinc-800 bg-[#181818] px-2.5 sm:px-3 transition-colors focus-within:border-zinc-600 focus-within:bg-[#1c1c1c] mx-1 sm:mx-4"
                >
                    <Search
                        size={17}
                        className="shrink-0 text-zinc-500 transition-colors group-focus-within:text-zinc-300"
                    />
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchStockName}
                        onChange={(e) => setSearchStockName(e.target.value)}
                        placeholder="Search stocks..."
                        className="w-full bg-transparent text-xs sm:text-sm text-white outline-none placeholder:text-zinc-500 min-w-0"
                    />
                    <span className="hidden shrink-0 rounded border border-zinc-700/80 px-1.5 py-0.5 font-mono text-[10px] leading-none text-zinc-500 md:block">
                        Ctrl K
                    </span>

                    {/* Floating Search Results Dropdown */}
                    {availableStocks.length > 0 && (
                        <FloatingWindow Stocks={availableStocks} />
                    )}
                </div>

                {/* Right section */}
                <div className="relative flex shrink-0 items-center gap-3 sm:gap-5">
                    {/* Balance */}
                    <div className="hidden text-sm xl:block">
                        <span className="mr-2 text-zinc-500">Balance</span>
                        <span className="font-semibold tabular-nums text-emerald-400">
                            {balance != null ? `₹${fmt(balance)}` : "—"}
                        </span>
                    </div>

                    {/* Profile */}
                    <button
                        onClick={() => {
                            setProfileClicked((prev) => !prev);
                        }}
                        type="button"
                        aria-label="Profile menu"
                        className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-zinc-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-gray-200">
                            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={15} />}
                        </span>
                        <ChevronDown size={14} className="hidden text-zinc-500 sm:block" />
                    </button>

                    {profileClicked ? (
                        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-[#252b33] bg-[#11161c] shadow-2xl shadow-black/60 overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#252b33]">
                                <p className="text-sm font-semibold text-gray-200 truncate">
                                    {user?.name || "Account"}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5 truncate">
                                    {user?.email || "Signed in"}
                                </p>
                                <div className="mt-2 pt-2 border-t border-[#1f2630] flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Cash:</span>
                                    <span className="font-medium text-emerald-400 tabular-nums">
                                        {balance != null ? `₹${fmt(balance)}` : "—"}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={LogoutHandler}
                                className="w-full px-4 py-2.5 text-left text-xs font-medium text-red-400 hover:bg-[#1a2028] transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </nav>
    );
}
