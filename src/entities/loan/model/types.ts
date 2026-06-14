import { PAGINATION_DEFAULTS } from "@/shared/constants/constants";
import z from "zod";

export const loanStatusArr = [
  "ACTIVE",
  "OVERDUE",
  "EXTENDED",
  "AUCTION_READY",
  "REDEEMED",
] as const;

export const loanCategoryArr = [
  "JEWELRY",
  "ELECTRONICS",
  "WATCHES",
  "ART",
] as const;
export const loanSortOrderArr = ["asc", "desc"] as const;

export const loanSortFieldArr = [
  "id",
  "ticketNumber",
  "customerId",
  "loanAmountCents",
  "itemDescription",
  "category",
  "status",
  "startDate",
  "endDate",
  "interestRatePercent",
  "feesCents",
  "branchId",
] as const;

export const loanFiltersSchema = z.object({
  page: z.coerce.number().default(PAGINATION_DEFAULTS.PAGE_NUMBER),
  size: z.coerce.number().default(PAGINATION_DEFAULTS.PAGE_SIZE),
  status: z.enum(loanStatusArr).optional(),
  category: z.enum(loanCategoryArr).optional(),
  sortOrder: z.enum(loanSortOrderArr).default("asc"),
  sortBy: z.enum(loanSortFieldArr).default("endDate"),
  search: z.string().optional().catch(""),
  branchId: z.string().optional(),
});

export type LoanSearchFilters = z.infer<typeof loanFiltersSchema>;
