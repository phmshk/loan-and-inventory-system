import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api, ApiError } from "@/shared/api";
import type { LoanSearchFilters } from "../model/types";
import { useIsAuthenticated } from "@/entities/session";

export const loanQueries = {
  all: () => ["loans"] as const,
  list: (filters: LoanSearchFilters) =>
    [...loanQueries.all(), filters] as const,
};

export const useLoans = (filters: LoanSearchFilters) => {
  const isAuthenticated = useIsAuthenticated();
  return useQuery({
    queryKey: loanQueries.list(filters),
    queryFn: async () => {
      const { data, error, response } = await api.GET("/loans", {
        params: {
          query: filters,
        },
      });

      if (error || !response.ok) {
        throw new ApiError(
          response.status,
          error?.code || "FETCH_LOANS_FAILED",
          error?.message || "Failed to retrieve loans registry",
        );
      }

      return data;
    },

    enabled: isAuthenticated,
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000, // 3 min
  });
};
