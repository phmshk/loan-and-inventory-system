import { type User, type UserRole } from "@/shared/api";
import { CONFIG } from "@/shared/model/config";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (username: string) => Promise<void>;
  logout: () => void;
  checkSession: () => Promise<void>;
  hasRole: (allowedRoles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      login: async (username: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
          });

          if (!response.ok) throw new Error("Authentication failed");

          const user: User = await response.json();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Unknown error",
            isLoading: false,
            isAuthenticated: false,
          });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      hasRole: (allowedRoles: UserRole[]) => {
        const user = get().user;
        if (!user) return false;
        return allowedRoles.includes(user.role);
      },

      checkSession: async () => {
        const currentUser = get().user;
        if (!currentUser) {
          set({ isLoading: false });
          return;
        }

        try {
          const response = await fetch(
            `${CONFIG.API_BASE_URL}/auth/me?id=${currentUser.id}`,
          );
          if (!response.ok) throw new Error();

          const freshUserData: User = await response.json();
          set({ user: freshUserData, isAuthenticated: true, isLoading: false });
        } catch {
          get().logout();
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
