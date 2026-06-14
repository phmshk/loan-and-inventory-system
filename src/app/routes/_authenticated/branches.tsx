import { SelectBranchPage } from "@/pages/selectBranch";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/branches")({
  component: SelectBranchPage,
});
