
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { LoginApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [Email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    const [errorMsg, setErrorMsg] = useState<string>("");
    const { login } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const token = useAuthStore.getState().token;
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const data = await LoginApi(Email, Password);
            if (data.success) {
                login(data.token, data.refreshToken, data.user.id);
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                setErrorMsg(data.message || "Login failed");
            }
        } catch (error: any) {
            const msg =
                error?.response?.data?.message ||
                "Invalid email or password";
            setErrorMsg(msg);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            {/* Background glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-[140px]" />
            </div>

            {/* Header */}
            <header className="relative border-b border-zinc-800/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

                    <button
                        type="button"
                        className="group flex items-center gap-2.5"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 font-bold text-black">
                            T
                        </div>

                        <span className="text-lg font-semibold tracking-tight">
                            TradeForge
                        </span>
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6">

                <div className="w-full max-w-md">

                    {/* Back */}
                    <button
                        type="button"
                        className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                        onClick={() => {
                            navigate("/");
                            console.log("clicked");
                        }}
                    >
                        <ArrowLeft size={16} />
                        Back to home
                    </button>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                            Sign in to continue to your TradeForge account.
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="rounded-xl border border-zinc-800 bg-[#111111] p-5 shadow-2xl shadow-black/20 sm:p-7">

                        <form className="space-y-5"
                            onSubmit={handleLogin}
                        >

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-zinc-300"
                                >
                                    Email
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={17}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                                    />

                                    <input
                                        id="email"
                                        type="email"
                                        value={Email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder="you@example.com"
                                        className="h-11 w-full rounded-md border border-zinc-800 bg-[#0c0c0c] pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-zinc-300"
                                    >
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs text-emerald-400 transition hover:text-emerald-300"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <div className="relative">
                                    <Lock
                                        size={17}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                                    />

                                    <input
                                        id="password"
                                        value={Password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="h-11 w-full rounded-md border border-zinc-800 bg-[#0c0c0c] pl-10 pr-11 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20"
                                    />

                                    <button
                                        type="button"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 transition hover:text-zinc-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-emerald-500"
                                />

                                <label
                                    htmlFor="remember"
                                    className="text-xs text-zinc-500"
                                >
                                    Remember me
                                </label>
                            </div>

                            {/* Error message */}
                            {errorMsg && (
                                <p className="text-sm text-red-400 text-center -mt-1">
                                    {errorMsg}
                                </p>
                            )}

                            {/* Login */}
                            <button
                                type="submit"
                                // onClick={handleLogin}
                                className="flex h-11 w-full items-center justify-center rounded-md bg-emerald-500 text-sm font-semibold text-black transition hover:bg-emerald-400"
                            >
                                Sign in
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-zinc-800" />

                            <span className="text-xs text-zinc-600">
                                OR
                            </span>

                            <div className="h-px flex-1 bg-zinc-800" />
                        </div>

                        {/* Demo login */}
                        <button
                            type="button"
                            className="flex h-11 w-full items-center justify-center rounded-md border border-zinc-800 bg-[#0c0c0c] text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                        >
                            Continue with demo account
                        </button>
                    </div>

                    {/* Signup */}
                    <p className="mt-6 text-center text-sm text-zinc-500">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => { navigate("/signup") }}

                            className="font-medium text-emerald-400 transition hover:text-emerald-300 hover:cursor-pointer"
                        >
                            Create one
                        </button>
                    </p>

                    {/* Disclaimer */}
                    <p className="mt-8 text-center text-xs leading-5 text-zinc-600">
                        TradeForge is a simulated trading platform.
                        Market data and trading activity are for demonstration
                        purposes.
                    </p>
                </div>
            </main>
        </div>
    );
}

