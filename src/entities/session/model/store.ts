import type { User } from "@/shared/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

interface SessionState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // actions
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
}

const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setSession: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      clearSession: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "session-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export const useCurrentUser = () => useSessionStore((state) => state.user);
export const useIsAuthenticated = () =>
  useSessionStore((state) => state.isAuthenticated);
export const useAuthToken = () => useSessionStore((state) => state.token);

export const useSessionActions = () => {
  return useSessionStore(
    useShallow((state) => ({
      setSession: state.setSession,
      clearSession: state.clearSession,
    })),
  );
};
