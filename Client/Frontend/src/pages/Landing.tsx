
import {
    ArrowRight,
    BarChart3,
    BriefcaseBusiness,
    Eye,
    LineChart,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

export default function Landing() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            {/* Navbar */}
            <nav className="border-b border-zinc-800/80 bg-[#0a0a0a]/95">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 font-bold text-black">
                            T
                        </div>

                        <span className="text-lg font-semibold tracking-tight">
                            TradeForge
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-8 md:flex">
                        <a
                            href="#markets"
                            className="text-sm text-zinc-400 transition hover:text-white"
                        >
                            Markets
                        </a>

                        <a
                            href="#features"
                            className="text-sm text-zinc-400 transition hover:text-white"
                        >
                            Features
                        </a>

                        <a
                            href="#about"
                            className="text-sm text-zinc-400 transition hover:text-white"
                        >
                            About
                        </a>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-3 md:flex">
                        <button className="rounded-md px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white">
                            Log in
                        </button>

                        <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        aria-label="Toggle menu"
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

                            <a
                                href="#markets"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-md px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            >
                                Markets
                            </a>

                            <a
                                href="#features"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-md px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            >
                                Features
                            </a>

                            <a
                                href="#about"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-md px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white"
                            >
                                About
                            </a>

                            <div className="mt-3 flex gap-2 border-t border-zinc-800 pt-3">
                                <button className="flex-1 rounded-md px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900">
                                    Log in
                                </button>

                                <button className="flex-1 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-black">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero */}
            <main>
                <section className="relative overflow-hidden">
                    {/* Background glow */}
                    <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

                    <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-32 lg:pt-36">

                        {/* Badge */}
                        <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Real-time market tracking
                        </div>

                        {/* Heading */}
                        <h1 className="mx-auto max-w-4xl text-center text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
                            Your markets.
                            <br />
                            <span className="text-zinc-500">
                                Your strategy.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                            Track markets in real time, manage your portfolio,
                            and make smarter trading decisions with TradeForge.
                        </p>

                        {/* CTA */}
                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <button className="group flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 sm:w-auto">
                                Start Trading

                                <ArrowRight
                                    size={17}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </button>

                            <button className="w-full rounded-md border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white sm:w-auto">
                                Explore Markets
                            </button>
                        </div>

                        {/* Market Preview */}
                        <div
                            id="markets"
                            className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border border-zinc-800 bg-[#111111] shadow-2xl shadow-black/40 sm:mt-20"
                        >
                            {/* Window Header */}
                            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                                </div>

                                <span className="text-xs text-zinc-600">
                                    TradeForge Markets
                                </span>

                                <div className="w-12" />
                            </div>

                            {/* Market Content */}
                            <div className="grid md:grid-cols-[1fr_280px]">

                                {/* Chart Preview */}
                                <div className="min-h-[280px] border-b border-zinc-800 p-4 md:border-b-0 md:border-r sm:p-6">

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-xs text-zinc-500">
                                                RELIANCE · NSE
                                            </p>

                                            <div className="mt-1 flex items-baseline gap-3">
                                                <span className="text-2xl font-semibold">
                                                    ₹1,452.30
                                                </span>

                                                <span className="text-xs text-emerald-400">
                                                    +1.24%
                                                </span>
                                            </div>
                                        </div>

                                        <span className="hidden text-xs text-zinc-600 sm:block">
                                            1D
                                        </span>
                                    </div>

                                    {/* Fake chart */}
                                    <div className="relative mt-8 h-40 overflow-hidden">
                                        <div className="absolute inset-0 flex flex-col justify-between">
                                            <div className="border-t border-zinc-800/60" />
                                            <div className="border-t border-zinc-800/60" />
                                            <div className="border-t border-zinc-800/60" />
                                            <div className="border-t border-zinc-800/60" />
                                        </div>

                                        <svg
                                            viewBox="0 0 800 180"
                                            preserveAspectRatio="none"
                                            className="absolute inset-0 h-full w-full"
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="chartGradient"
                                                    x1="0"
                                                    x2="0"
                                                    y1="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor="currentColor"
                                                        stopOpacity="0.18"
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor="currentColor"
                                                        stopOpacity="0"
                                                    />
                                                </linearGradient>
                                            </defs>

                                            <path
                                                d="M0 145 L50 135 L90 142 L130 120 L170 126 L210 108 L250 115 L290 90 L330 102 L370 78 L410 86 L450 70 L490 82 L530 55 L570 67 L610 48 L650 58 L690 35 L730 45 L800 20 V180 H0 Z"
                                                fill="url(#chartGradient)"
                                                className="text-emerald-500"
                                            />

                                            <path
                                                d="M0 145 L50 135 L90 142 L130 120 L170 126 L210 108 L250 115 L290 90 L330 102 L370 78 L410 86 L450 70 L490 82 L530 55 L570 67 L610 48 L650 58 L690 35 L730 45 L800 20"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="text-emerald-500"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Market List */}
                                <div className="p-4 sm:p-5">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Watchlist
                                        </span>

                                        <Eye
                                            size={16}
                                            className="text-zinc-600"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <MarketRow
                                            symbol="RELIANCE"
                                            price="₹1,452.30"
                                            change="+1.24%"
                                            positive
                                        />

                                        <MarketRow
                                            symbol="TCS"
                                            price="₹3,420.50"
                                            change="-0.42%"
                                        />

                                        <MarketRow
                                            symbol="INFY"
                                            price="₹1,804.20"
                                            change="+0.86%"
                                            positive
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="border-t border-zinc-800 bg-[#0d0d0d]"
                >
                    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">

                        <div className="max-w-2xl">
                            <p className="text-sm font-medium text-emerald-400">
                                Everything you need
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                                Built for modern trading.
                            </h2>

                            <p className="mt-4 text-zinc-400">
                                A focused trading experience with the tools you
                                actually need to monitor and manage your
                                investments.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4">

                            <Feature
                                icon={<LineChart size={20} />}
                                title="Live Markets"
                                description="Track market prices with real-time updates."
                            />

                            <Feature
                                icon={<BriefcaseBusiness size={20} />}
                                title="Portfolio"
                                description="Monitor your holdings and profit or loss."
                            />

                            <Feature
                                icon={<Eye size={20} />}
                                title="Watchlist"
                                description="Keep your favorite assets within reach."
                            />

                            <Feature
                                icon={<BarChart3 size={20} />}
                                title="Market Data"
                                description="Analyze prices and make informed decisions."
                            />
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section
                    id="about"
                    className="border-t border-zinc-800"
                >
                    <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
                        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Ready to enter the market?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
                            Start building your portfolio and experience
                            real-time market tracking with TradeForge.
                        </p>

                        <button className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
                            Get Started
                            <ArrowRight size={17} />
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <span>
                        © 2026 TradeForge
                    </span>

                    <span>
                        Market simulation platform
                    </span>
                </div>
            </footer>
        </div>
    );
}

function MarketRow({
    symbol,
    price,
    change,
    positive = false,
}: {
    symbol: string;
    price: string;
    change: string;
    positive?: boolean;
}) {
    return (
        <div className="flex items-center justify-between rounded-md px-3 py-3 transition hover:bg-zinc-900">
            <div>
                <p className="text-sm font-medium">
                    {symbol}
                </p>

                <p className="mt-0.5 text-xs text-zinc-600">
                    NSE
                </p>
            </div>

            <div className="text-right">
                <p className="text-sm">
                    {price}
                </p>

                <p
                    className={`mt-0.5 text-xs ${positive
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                >
                    {change}
                </p>
            </div>
        </div>
    );
}

function Feature({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-[#111111] p-6 sm:p-7">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-900 text-emerald-400">
                {icon}
            </div>

            <h3 className="mt-5 text-sm font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
            </p>
        </div>
    );
}

