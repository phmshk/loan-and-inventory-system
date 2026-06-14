import { loanFiltersSchema } from "@/entities/loan";
import { LoansPage } from "@/pages/loans";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_assignedBranch/loans")({
  component: LoansPage,
  validateSearch: loanFiltersSchema,
});
