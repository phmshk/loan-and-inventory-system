import { useIsAuthenticated } from "@/entities/session";
import { api, ApiError } from "@/shared/api";
import { useQuery } from "@tanstack/react-query";

export const useBranches = () => {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const { data, error, response } = await api.GET("/branches");
      if (error || !response.ok) {
        throw new ApiError(
          response.status,
          error?.code || "FETCH_BRANCHES_FAILED",
          error?.message || "Failed to retrieve branches registry",
        );
      }
      return data;
    },

    enabled: isAuthenticated,
    staleTime: 20 * 60 * 1000, //20 min
  });
};
