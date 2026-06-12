import type { Branch } from "@/shared/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BranchState {
  currentBranchId: string | null;
  availableBranches: Branch[];
}

interface BranchActions {
  setBranchId: (branchId: string) => void;
  setAvailableBranches: (branches: Branch[]) => void;
  getCurrentBranch: () => Branch | null;
}

export const useBranchStore = create<BranchState & BranchActions>()(
  persist(
    (set, get) => ({
      currentBranchId: null,
      availableBranches: [],

      setBranchId: (branchId: string) => {
        set({ currentBranchId: branchId });
      },

      setAvailableBranches: (branches: Branch[]) => {
        set({ availableBranches: branches });
      },

      getCurrentBranch: () => {
        const { currentBranchId, availableBranches } = get();
        if (!currentBranchId || availableBranches.length === 0) return null;
        return availableBranches.find((b) => b.id === currentBranchId) || null;
      },
    }),
    {
      name: "branch-storage",
      partialize: (state) => ({ currentBranchId: state.currentBranchId }),
    },
  ),
);
