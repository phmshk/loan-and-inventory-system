import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_assignedBranch")({
  beforeLoad: ({ context }) => {
    if (!context.isBranchSelected) {
      throw redirect({
        to: "/branches",
      });
    }
  },
  component: () => <Outlet />,
});
