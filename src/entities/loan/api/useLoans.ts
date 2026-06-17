import { useIsAuthenticated } from "@/entities/session";
import {
  api,
  ApiError,
  type Loan,
  type LoanCreate,
  type LoanUpdate,
} from "@/shared/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { LoanSearchFilters } from "../model/types";

export const loanQueries = {
  all: () => ["loans"] as const,
  list: (filters: LoanSearchFilters) =>
    [...loanQueries.all(), filters] as const,
  detail: (id: string) => [...loanQueries.all(), "detail", id] as const,
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

export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation<Loan, ApiError, LoanCreate>({
    mutationFn: async (newLoan) => {
      const { data, error, response } = await api.POST("/loans", {
        body: newLoan,
      });

      if (error || !response.ok) {
        throw new ApiError(
          response.status,
          error?.code || "CREATE_LOAN_FAILED",
          error?.message || "Failed to create new loan record",
        );
      }

      return data;
    },
    onSuccess: (createdLoan) => {
      queryClient.invalidateQueries({ queryKey: loanQueries.all() });
      queryClient.invalidateQueries({ queryKey: loanQueries.all() });
      queryClient.setQueryData(loanQueries.detail(createdLoan.id), createdLoan);
    },
  });
};

export const useUpdateLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: LoanUpdate;
    }) => {
      const { data, error, response } = await api.PATCH("/loans/{id}", {
        params: {
          path: { id },
        },
        body: payload,
      });

      if (error || !response.ok) {
        throw new ApiError(
          response.status,
          error?.code || "UPDATE_LOAN_FAILED",
          error?.message || "Failed to modify the selected loan record",
        );
      }

      return data;
    },
    onMutate: async ({ id, payload }) => {
      const queryKey = loanQueries.detail(id);
      queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Loan>(queryKey);

      if (previous) {
        queryClient.setQueryData<Loan>(queryKey, {
          ...previous,
          ...payload,
        });
      }

      return { previous, queryKey };
    },
    onError: (_error, _, onMutateResult) => {
      if (onMutateResult) {
        queryClient.setQueryData(
          onMutateResult.queryKey,
          onMutateResult.previous,
        );
      }
    },
    onSettled: (_data, _error, _, onMutateResult) => {
      if (onMutateResult) {
        queryClient.invalidateQueries({ queryKey: onMutateResult.queryKey });
      }

      queryClient.invalidateQueries({ queryKey: loanQueries.all() });
    },
  });
};

export const useUpdateLoanStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: Loan["status"];
    }) => {
      const { data, error, response } = await api.PATCH("/loans/{id}/status", {
        params: { path: { id } },
        body: { status },
      });

      if (error || !response.ok) {
        throw new ApiError(
          response.status,
          error?.code || "UPDATE_STATUS_FAILED",
          error?.message || "Failed to modify loan status",
        );
      }

      return data;
    },
    onMutate: async ({ id, status }) => {
      const queryKey = loanQueries.detail(id);
      await queryClient.cancelQueries({ queryKey });

      const previousDetail = queryClient.getQueryData<Loan>(queryKey);

      if (previousDetail) {
        queryClient.setQueryData<Loan>(queryKey, {
          ...previousDetail,
          status,
        });
      }

      return { previousDetail, queryKey };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(context.queryKey, context.previousDetail);
      }
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
      queryClient.invalidateQueries({ queryKey: loanQueries.all() });
    },
  });
};

export const useDeleteLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error, response } = await api.DELETE("/loans/{id}", {
        params: {
          path: { id },
        },
      });

      if (error || !response.ok) {
        throw new ApiError(
          response.status,
          error?.code || "DELETE_LOAN_FAILED",
          error?.message || "Failed to purge the selected loan record",
        );
      }
    },

    onMutate: async (id) => {
      const queryKey = loanQueries.detail(id);
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Loan>(queryKey);

      queryClient.removeQueries({ queryKey });

      return { previous, queryKey };
    },

    onError: (_error, _, onMutateResult) => {
      if (onMutateResult) {
        queryClient.setQueryData(
          onMutateResult.queryKey,
          onMutateResult.previous,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: loanQueries.all() });
    },
  });
};
