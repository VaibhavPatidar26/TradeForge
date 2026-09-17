import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, RefreshCw, ShieldCheck, Mail } from "lucide-react";
import { VerifyOtpApi, ResendOtpApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export default function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate();
    const loginStore = useAuthStore((state) => state.login);
    const token = useAuthStore((state) => state.token);

    const [email, setEmail] = useState<string>(location.state?.email || "");
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [resendCooldown, setResendCooldown] = useState(30);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    // Resend countdown timer
    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    const handleOtpChange = (index: number, value: string) => {
        if (/[^0-9]/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (errorMessage) setErrorMessage(null);

        // Move to next input if filled
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split("");
            setOtp(digits);
            inputRefs.current[5]?.focus();
            if (errorMessage) setErrorMessage(null);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        const fullOtp = otp.join("");
        if (fullOtp.length !== 6) {
            setErrorMessage("Please enter all 6 digits of the OTP.");
            return;
        }

        if (!email) {
            setErrorMessage("Email address is missing. Please return to login.");
            return;
        }

        setIsLoading(true);

        try {
            const data = await VerifyOtpApi(email, fullOtp);
            if (data.success) {
                loginStore(data.token, data.refreshToken || "", data.user?.id || data.user?._id || "");
                navigate("/dashboard");
            } else {
                setErrorMessage(data.message || "Invalid OTP. Please try again.");
            }
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "OTP verification failed. Please try again.";
            setErrorMessage(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0 || isResending) return;
        if (!email) {
            setErrorMessage("Email address is missing.");
            return;
        }

        setIsResending(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const data = await ResendOtpApi(email);
            if (data.success) {
                setSuccessMessage("A new OTP has been sent to your email.");
                setResendCooldown(30);
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
            } else {
                setErrorMessage(data.message || "Failed to resend OTP.");
            }
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Failed to resend OTP.";
            setErrorMessage(msg);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-12">
            {/* Background glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Back button */}
                <button
                    type="button"
                    className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                    onClick={() => navigate("/login")}
                >
                    <ArrowLeft size={16} />
                    Back to login
                </button>

                {/* Main Card */}
                <div className="rounded-xl border border-zinc-800 bg-[#111111] p-6 sm:p-8 shadow-2xl">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                            <ShieldCheck size={26} />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                            Verify 2FA Security Code
                        </h1>
                        <p className="mt-2 text-sm text-zinc-400">
                            We sent a 6-digit verification code to
                        </p>
                        {email ? (
                            <span className="mt-1 text-sm font-medium text-emerald-400 flex items-center gap-1.5">
                                <Mail size={14} />
                                {email} (CHECK SPAM)
                            </span>
                            
                        ) : (
                            <div className="mt-3 w-full">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-10 w-full rounded-md border border-zinc-800 bg-[#0c0c0c] px-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500/60"
                                />
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    {errorMessage && (
                        <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center">
                            {successMessage}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="flex justify-between items-center gap-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="h-12 w-12 sm:h-14 sm:w-14 text-center text-xl font-bold rounded-lg border border-zinc-800 bg-[#0c0c0c] text-white outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || otp.join("").length !== 6}
                            className="flex h-11 w-full items-center justify-center rounded-md bg-emerald-500 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : "Verify Code"}
                        </button>
                    </form>

                    {/* Resend section */}
                    <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
                        <p className="text-sm text-zinc-400 mb-2">
                            Didn't receive the code?
                        </p>
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resendCooldown > 0 || isResending}
                            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isResending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <RefreshCw size={15} />
                            )}
                            {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
