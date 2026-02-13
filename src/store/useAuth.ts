import { create } from "zustand";
import { me } from "../api/axios";
import type { User } from "../api/axios";
/* Type for auth store */
interface AuthState {
    user: User | null;
    loading: boolean;
    error?: string | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    fetchMe: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,

    setUser: (user) => set({ user, error: null }),

    logout: () => set({ user: null }),

    fetchMe: async () => {
        set({ loading: true, error: null });
        try {
            // Fetch the current user from the backend
            const data = await me();
            set({ user: data ?? null });
        } catch (error: any) {
            // If there's an error, clear the user and set the error message
            set({ user: null, error: error?.message ?? String(error) });
            console.error("Error fetching user:", error);
        } finally {
            set({ loading: false });
        }
    }
}))