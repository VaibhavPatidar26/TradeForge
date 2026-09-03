import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    userId: string | null;

    login: (token: string, refreshToken: string, userId: string) => void;
    setTokens: (token: string, refreshToken: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
    token: null,
    refreshToken: null,
    userId: null,

    login: (token, refreshToken, userId) => {
        set({
            token,
            refreshToken,
            userId,
        });
    },

    setTokens: (token, refreshToken) => {
        set({
            token,
            refreshToken,
        });
    },

    logout: () => {
        set({
            token: null,
            refreshToken: null,
            userId: null,
        });
    },
}), {
    name: "auth-storage",
}));

