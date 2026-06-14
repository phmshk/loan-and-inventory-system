import { useBranchActions, useCurrentBranch } from "@/entities/branch";
import { useSessionActions } from "@/entities/session";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

import {
  Link,
  useNavigate,
  useSearch,
  useRouteContext,
} from "@tanstack/react-router";

export const LoansPage = () => {
  const currentBranch = useCurrentBranch();
  const { clearBranch } = useBranchActions();
  const { user } = useRouteContext({ from: "/_authenticated" });
  const { clearSession } = useSessionActions();

  const navigate = useNavigate({ from: "/loans" });
  const searchParams = useSearch({
    from: "/_authenticated/_assignedBranch/loans",
  });

  const handleLogout = () => {
    clearSession();
    clearBranch();
  };

  const handleChangeBranch = () => {
    clearBranch();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Pawn Registry
            </Typography>
            {currentBranch && (
              <Chip
                label={currentBranch.name}
                variant="outlined"
                size="small"
              />
            )}
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Managing collateral items, appraisals, and inventory for this
            location.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            justifyContent: { sm: "flex-end" },
          }}
        >
          <Link to="/branches">
            <Button
              onClick={handleChangeBranch}
              variant="outlined"
              color="inherit"
              size="small"
            >
              Change Branch
            </Button>
          </Link>
          <Link to="/login">
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              size="small"
            >
              Sign Out ({user.username})
            </Button>
          </Link>
        </Box>
      </Box>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <TextField
          size="small"
          aria-colindex={4}
          fullWidth
          placeholder="Search by Item ID or description..."
          value={searchParams.search || ""}
          onChange={(e) => {
            navigate({
              search: (prev) => ({ ...prev, search: e.target.value || "" }),
            });
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            flexGrow: 1,
            "& .MuiInputBase-input": {
              fontSize: { xs: "13px", sm: "14px" },
            },
            "& .MuiInputBase-input::placeholder": {
              fontSize: { xs: "12px", sm: "14px" },
            },
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {user.role === "APPRAISER" && (
            <Button type="button" variant="contained" color="primary">
              + New Loan Item
            </Button>
          )}
        </Box>
      </Paper>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          p: 3,
        }}
      >
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "text.disabled", fontStyle: "italic", py: 6 }}
        >
          [ TanStack Table Layer: Ожидает подключения query-хука залогов ]
        </Typography>
      </Paper>
    </Box>
  );
};
