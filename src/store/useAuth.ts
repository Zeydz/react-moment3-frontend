import { create } from "zustand";
import { me, logoutRequest } from "../api/axios";
import type { User } from "../api/axios";
/* Type for auth store */
interface AuthState {
    user: User | null;
    loading: boolean;
    error?: string | null;
    setError: (error: string | null) => void;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
    fetchMe: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    setError: (error) => set({ error }),

    setUser: (user) => set({ user, error: null }),

    logout: async () => {
        set({ loading: true, error: null });
        try {
            /* Call server to clear cookie. */
            await logoutRequest();
            set({ user: null, error: null });
        } catch (error: any) {
            set({ error: error?.message ?? String(error) });
            console.error('Error during logout:', error);
        } finally {
            set({ loading: false });
        }
    },

    fetchMe: async () => {
        set({ loading: true, error: null });
        try {
            /* Fetch user from backend */
            const data = await me();
            set({ user: data ?? null });
        } catch (error: any) {
            set({ user: null, error: error?.message ?? String(error) });
            console.error("Error fetching user:", error);
        } finally {
            set({ loading: false });
        }
    }
}))