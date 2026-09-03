import axios from "axios";
import { useAuthStore } from "../store/authStore";

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

export const api = axios.create({
    baseURL: BackendURL,
});

// Request interceptor to add the access token
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't already retried
        // Skip refresh for auth endpoints — they legitimately return 401 (wrong credentials)
        const isAuthEndpoint =
            originalRequest.url?.includes("/api/users/login") ||
            originalRequest.url?.includes("/api/users/register");

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;

            try {
                const refreshToken = useAuthStore.getState().refreshToken;

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                // Call the refresh endpoint directly with axios to avoid loop
                const response = await axios.post(`${BackendURL}api/users/refresh`, {
                    refreshToken
                });

                const { token: newAccessToken, refreshToken: newRefreshToken } = response.data;

                // Update store
                useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

                // Update authorization header for the original request and retry
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // If refresh fails, log the user out
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
