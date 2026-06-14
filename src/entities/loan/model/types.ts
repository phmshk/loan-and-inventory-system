import type {
  LoanCategory,
  LoanSort,
  LoanSortFields,
  LoanStatus,
} from "@/shared/api";
import { PAGINATION_DEFAULTS } from "@/shared/constants/constants";
import z from "zod";

export const loanStatusArr = Object.keys(
  {} as Record<LoanStatus, undefined>,
) as LoanStatus[];

export const loanCategoryArr = Object.keys(
  {} as Record<LoanCategory, undefined>,
) as LoanCategory[];

export const loanSortArr = Object.keys(
  {} as Record<LoanSort, undefined>,
) as LoanSort[];

export const loanSortFieldsArr = Object.keys(
  {} as Record<LoanSortFields, undefined>,
) as LoanSortFields[];

export const loanFiltersSchema = z.object({
  page: z.coerce.number().default(PAGINATION_DEFAULTS.PAGE_NUMBER),
  size: z.coerce.number().default(PAGINATION_DEFAULTS.PAGE_SIZE),
  status: z.enum(loanStatusArr).optional(),
  category: z.enum(loanCategoryArr).optional(),
  sortOrder: z.enum(loanSortArr).default("asc"),
  sortBy: z.enum(loanSortFieldsArr).default("startDate"),
  search: z.string().optional().catch(""),
});

export type LoanSearchFilters = z.infer<typeof loanFiltersSchema>;
