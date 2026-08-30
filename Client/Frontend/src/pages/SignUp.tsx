import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User, Loader2 } from "lucide-react";
import { RegisterApi } from "../api/auth" 
import { useAuthStore } from "../store/authStore"; 

const Signup = () => {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await RegisterApi(
        formData.name,
        formData.email,
        formData.password
      );

      const token = data.token; 
      const userId = data.userId || data.user?._id || data.user?.id;

      if (token) {
        loginStore(token, userId);
        navigate("/"); 
      } else {
        navigate("/login");
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-white flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="font-bold text-black text-lg">T</span>
            </div>

            <span className="text-2xl font-semibold tracking-tight">
              Trade<span className="text-emerald-400">Forge</span>
            </span>
          </Link>
        </div>

        <div className="bg-[#101216] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Start your trading journey with TradeForge.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Full name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full h-11 rounded-lg bg-[#0b0c0f] border border-white/[0.08] pl-10 pr-4 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full h-11 rounded-lg bg-[#0b0c0f] border border-white/[0.08] pl-10 pr-4 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full h-11 rounded-lg bg-[#0b0c0f] border border-white/[0.08] pl-10 pr-11 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full h-11 rounded-lg bg-[#0b0c0f] border border-white/[0.08] pl-10 pr-11 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-gray-500">
              <input type="checkbox" required className="mt-0.5 accent-emerald-500" />
              <p>
                I agree to the <span className="text-gray-300">Terms of Service</span> and <span className="text-gray-300">Privacy Policy</span>.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : "Create account"}
            </button>
          </form>

          <div className="mt-7 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          © {new Date().getFullYear()} TradeForge. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Signup;