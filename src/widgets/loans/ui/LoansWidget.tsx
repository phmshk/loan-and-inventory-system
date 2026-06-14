import { useCurrentBranch } from "@/entities/branch";
import {
  useLoans,
  useLoansTableConfig,
  LoansTable,
  type LoanSearchFilters,
} from "@/entities/loan";
import {
  LoanCategoryFilter,
  LoanSearch,
  LoanStatusFilter,
  ResetFiltersButton,
} from "@/features/loanFilter";
import { ColumnToggle } from "@/features/toggleColumns";
import type { LoanSortFields } from "@/shared/api";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useSearch, useNavigate } from "@tanstack/react-router";

export const LoansWidget = () => {
  const searchParams = useSearch({
    from: "/_authenticated/_assignedBranch/loans",
  });
  const branch = useCurrentBranch();
  const navigate = useNavigate({ from: "/loans" });
  const { data, isLoading, isPlaceholderData } = useLoans({
    ...searchParams,
    branchId: branch?.id,
  });

  const table = useLoansTableConfig({
    data: data?.items || [],
    totalItems: data?.totalItems || 0,
    filters: searchParams,
  });

  const updateSearch = (patch: Partial<LoanSearchFilters>) => {
    navigate({ search: (prev) => ({ ...prev, ...patch, page: 1 }) });
  };

  const handleResetAll = () => {
    navigate({
      search: (prev) => ({
        page: 1,
        size: prev.size,
        sortBy: undefined,
        sortOrder: undefined,
        search: undefined,
        status: undefined,
        category: undefined,
      }),
    });
  };

  const hasActiveFilters = Boolean(
    searchParams.search || searchParams.status || searchParams.category,
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 3,
          display: "flex",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <LoanSearch
            value={searchParams.search || ""}
            onChange={(text) => updateSearch({ search: text || undefined })}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              width: { xs: "100%", sm: "auto" },
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 2,
            pt: 1,
            borderTop: "1px dashed",
            borderColor: "divider",
          }}
        >
          <LoanStatusFilter
            value={searchParams.status || ""}
            onChange={(status) => updateSearch({ status })}
          />

          <LoanCategoryFilter
            value={searchParams.category || ""}
            onChange={(category) => updateSearch({ category })}
          />

          <ColumnToggle table={table} />

          <ResetFiltersButton
            hasActiveFilters={hasActiveFilters}
            onReset={handleResetAll}
          />
        </Box>
      </Paper>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          opacity: isPlaceholderData ? 0.7 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 8,
              gap: 2,
            }}
          >
            <CircularProgress size={24} />
            <Typography variant="body2" color="text.secondary">
              Loading entries...
            </Typography>
          </Box>
        ) : (
          <LoansTable
            table={table}
            totalItems={data?.totalItems || 0}
            page={searchParams.page}
            pageSize={searchParams.size}
            sortBy={searchParams.sortBy}
            sortOrder={searchParams.sortOrder as "asc" | "desc"}
            onPageChange={(newPage) =>
              navigate({ search: (prev) => ({ ...prev, page: newPage + 1 }) })
            }
            onRowsPerPageChange={(newSize) => updateSearch({ size: newSize })}
            onSortChange={(columnId, order) =>
              updateSearch({
                sortBy: columnId as LoanSortFields,
                sortOrder: order,
              })
            }
          />
        )}
      </Paper>
    </Box>
  );
};
