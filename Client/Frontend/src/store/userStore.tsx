import { create } from "zustand";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

export interface UserDetails {
    id: string;
    name: string;
    email: string;
    balance: number;
    createdAt?: string;
}

interface UserStore {
    user: UserDetails | null;
    balance: number | null;
    isLoading: boolean;
    error: string | null;
    fetchUser: (token: string) => Promise<void>;
    setBalance: (balance: number) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>(function (set) {
    return {
        user: null,
        balance: null,
        isLoading: false,
        error: null,

        fetchUser: async function (token: string) {
            if (!token) return;
            set({ isLoading: true, error: null });
            try {
                const response = await axios.get(`${BACKEND_URL}api/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const user = response.data.user;
                set({
                    user,
                    balance: user ? Number(user.balance) : null,
                    isLoading: false
                });
            } catch (err: any) {
                set({
                    error: err.response?.data?.message || err.message || "Failed to load profile",
                    isLoading: false
                });
            }
        },

        setBalance: function (balance: number) {
            set((state) => ({
                balance,
                user: state.user ? { ...state.user, balance } : null
            }));
        },

        clearUser: function () {
            set({ user: null, balance: null, isLoading: false, error: null });
        }
    };
});
