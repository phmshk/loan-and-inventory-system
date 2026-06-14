import type { Branch } from "@/shared/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

interface BranchState {
  currentBranch: Branch | null;
  isBranchSelected: boolean;

  // actions
  setBranch: (branch: Branch) => void;
  clearBranch: () => void;
}

const useBranchStore = create<BranchState>()(
  persist(
    (set) => ({
      currentBranch: null,
      isBranchSelected: false,
      setBranch: (branch) =>
        set({
          currentBranch: branch,
          isBranchSelected: true,
        }),

      clearBranch: () =>
        set({
          currentBranch: null,
          isBranchSelected: false,
        }),
    }),
    {
      name: "branch-storage",
    },
  ),
);

export const useCurrentBranch = () =>
  useBranchStore((state) => state.currentBranch);
export const useIsBranchSelected = () =>
  useBranchStore((state) => state.isBranchSelected);

export const useBranchActions = () => {
  return useBranchStore(
    useShallow((state) => ({
      setBranch: state.setBranch,
      clearBranch: state.clearBranch,
    })),
  );
};
