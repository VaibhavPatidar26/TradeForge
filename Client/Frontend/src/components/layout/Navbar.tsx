import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

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