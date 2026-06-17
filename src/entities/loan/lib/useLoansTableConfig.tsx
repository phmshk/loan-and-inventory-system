import type { Loan, LoanStatus } from "@/shared/api";
import { fromCentsToEur } from "@/shared/utils/helpers";
import Chip from "@mui/material/Chip";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { LoanSearchFilters } from "../model/types";
import { LoanActions } from "@/features/manageLoan";

interface Params {
  data: Loan[];
  totalItems: number;
  filters: LoanSearchFilters;
}

const columnHelper = createColumnHelper<Loan>();
const STATUS_COLOR_MAP: Record<
  LoanStatus,
  "primary" | "error" | "warning" | "secondary" | "success"
> = {
  ACTIVE: "primary",
  OVERDUE: "error",
  EXTENDED: "warning",
  AUCTION_READY: "secondary",
  REDEEMED: "success",
};

export const useLoansTableConfig = (params: Params) => {
  const { data, totalItems, filters } = params;

  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({ id: false, branchId: false });

  const columns = useMemo(
    () => [
      columnHelper.accessor("ticketNumber", {
        header: "Ticket Number",
        cell: (info) => <strong>{info.getValue()}</strong>,
      }),
      columnHelper.accessor("itemDescription", {
        header: "Description",
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => (
          <Chip label={info.getValue()} size="small" variant="outlined" />
        ),
      }),
      columnHelper.accessor("loanAmountCents", {
        header: "Amount",
        cell: (info) => fromCentsToEur(info.getValue()),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <Chip
              label={status}
              color={STATUS_COLOR_MAP[status]}
              size="small"
            />
          );
        },
      }),
      columnHelper.accessor("endDate", {
        id: "endDate",
        header: "Maturity Date",
      }),
      columnHelper.accessor("id", {
        id: "id",
        header: "Internal UUID",
      }),
      columnHelper.accessor("branchId", {
        id: "branchId",
        header: "Branch UUID",
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const loan = info.row.original;
          return (
            <LoanActions
              loan={loan}
              onEditClick={(selectedLoan) => {
                console.log("Edit loan:", selectedLoan.id);
              }}
            />
          );
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalItems / filters.size),
    state: {
      pagination: {
        pageIndex: filters.page - 1,
        pageSize: filters.size,
      },
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
};
