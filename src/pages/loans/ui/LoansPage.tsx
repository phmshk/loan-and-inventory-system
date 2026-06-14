import { useBranchActions, useCurrentBranch } from "@/entities/branch";
import { useSessionActions } from "@/entities/session";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import { LoansWidget } from "@/widgets/loans";
import { Link, useRouteContext } from "@tanstack/react-router";

export const LoansPage = () => {
  const currentBranch = useCurrentBranch();
  const { clearBranch } = useBranchActions();
  const { user } = useRouteContext({ from: "/_authenticated" });
  const { clearSession } = useSessionActions();

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

      <LoansWidget userRole={user.role} />
    </Box>
  );
};
