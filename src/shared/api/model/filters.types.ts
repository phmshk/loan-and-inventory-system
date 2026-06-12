import { z } from "zod";
import type { paths, components } from "../openapi/generated/schema";
import { PAGINATION_DEFAULTS } from "@/shared/constants/constants";

type LoanQueryParameters = NonNullable<
  paths["/loans"]["get"]["parameters"]["query"]
>;

export type ApiLoanStatus = components["schemas"]["LoanStatus"];
export type ApiLoanCategory = components["schemas"]["LoanCategory"];

export const loanFiltersSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .catch(PAGINATION_DEFAULTS.PAGE_NUMBER),

  size: z.coerce.number().int().positive().catch(PAGINATION_DEFAULTS.PAGE_SIZE),

  status: z
    .custom<ApiLoanStatus>()
    .optional()
    .refine(
      (val) =>
        !val ||
        ["ACTIVE", "OVERDUE", "EXTENDED", "AUCTION_READY", "REDEEMED"].includes(
          val,
        ),
      { message: "Invalid Loan Status according to PfandlV" },
    ),

  category: z
    .custom<ApiLoanCategory>()
    .optional()
    .refine(
      (val) =>
        !val || ["JEWELRY", "ELECTRONICS", "WATCHES", "ART"].includes(val),
      { message: "Invalid Loan Category" },
    ),

  sortBy: z.custom<LoanQueryParameters["sortBy"]>().optional(),

  sortOrder: z.custom<LoanQueryParameters["sortOrder"]>().catch("asc"),
});

export type LoanFilters = z.infer<typeof loanFiltersSchema>;
