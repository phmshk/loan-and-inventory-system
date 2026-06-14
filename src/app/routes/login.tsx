import { LoginPage } from "@/pages/login";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: context.isBranchSelected ? "/loans" : "/branches" });
    }
  },
});
