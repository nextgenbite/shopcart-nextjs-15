import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

// API client (see step 2 for full setup)
// Use a local axios instance here to avoid circular imports with `lib/api`
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  setToken: (token: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // POST to Laravel Sanctum login endpoint
          const response = await axiosClient.post("/login", {
            email,
            password,
          });
          const { access_token, user } = response.data;
          const token = access_token; // Adjust if your API returns it differently
          // Set cookie (expires in 7 days, adjust as needed)
          Cookies.set("auth_token", token, {
            expires: 7,
            secure: process.env.NODE_ENV === "production",
          });
          // Store token and user
          set({ token, user, isLoading: false });
        } catch (error) {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message || "Login failed"
              : "An unexpected error occurred";
          set({ error: message, isLoading: false });
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosClient.post("/register", {
            name,
            email,
            password,
          });
          const { access_token, user } = response.data;
          const token = access_token; // Adjust if your API returns it differently
          // Set cookie (expires in 7 days, adjust as needed)
          Cookies.set("auth_token", token, {
            expires: 7,
            secure: process.env.NODE_ENV === "production",
          });
          // Store token and user
          set({ token, user, isLoading: false });
        } catch (error) {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message || "Registration failed"
              : "An unexpected error occurred";
          set({ error: message, isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await axiosClient.post("/logout");
        } finally {
          // Remove cookie
          Cookies.remove("auth_token");
          set({ user: null, token: null, isLoading: false });
        }
      },

      fetchUser: async () => {
        // Only fetch if we have a token but no user
        const { token, user } = get();
        if (!token || user) return;

        set({ isLoading: true });
        try {
          const response = await axiosClient.get("/user");
          set({ user: response.data, isLoading: false });
        } catch (error) {
          // If token is invalid, clear it
          set({ token: null, user: null, isLoading: false });
        }
      },
      initializeAuth: () => {
        const token = Cookies.get("auth_token");
        if (token) {
          set({ token });
          // Optionally fetch user
        }
      },
      setToken: (token) => set({ token }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage", // name of the item in localStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // persist only token and user
    },
  ),
);
