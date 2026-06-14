import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated || !context.user) {
      throw redirect({
        to: "/login",
      });
    }

    return {
      user: context.user!,
    };
  },
  component: () => <Outlet />,
});
