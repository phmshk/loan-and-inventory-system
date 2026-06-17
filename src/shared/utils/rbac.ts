import type { User, UserRole } from "@/shared/api";

export type LoanAction =
  | "CREATE"
  | "READ"
  | "UPDATE"
  | "UPDATE_STATUS"
  | "DELETE";

const ROLES_PERMISSIONS: Record<UserRole, LoanAction[]> = {
  MANAGER: ["CREATE", "READ", "UPDATE", "UPDATE_STATUS", "DELETE"],
  APPRAISER: ["CREATE", "READ", "UPDATE"],
  CASHIER: ["READ", "UPDATE_STATUS"],
};

export const canPerformAction = (
  role: UserRole | undefined,
  action: LoanAction,
): boolean => {
  if (!role) return false;
  return ROLES_PERMISSIONS[role]?.includes(action) ?? false;
};

export const canAccessBranch = (
  user: User | undefined,
  branchId: string,
): boolean => {
  if (!user) return false;

  if (user.role === "MANAGER") return true;

  return user.branchId === branchId;
};
