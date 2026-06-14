import { useBranchActions } from "@/entities/branch";
import { useSessionActions } from "@/entities/session";
import { api, ApiError } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const { setSession } = useSessionActions();
  const { clearBranch } = useBranchActions();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: { username: string }) => {
      const { data, error, response } = await api.POST("/auth/login", {
        body: {
          username: payload.username,
        },
      });

      if (error || !response.ok) {
        throw new ApiError(
          response.status,
          error?.code || "AUTH_FAILED",
          error?.message || "Authentication failed",
        );
      }

      return data;
    },

    onSuccess: (user) => {
      const mockToken = user.id;
      setSession(user, mockToken);
      clearBranch();

      navigate({ to: "/branches" });
    },
  });
};
