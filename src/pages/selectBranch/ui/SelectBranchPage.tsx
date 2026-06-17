import { useBranchActions, useBranches } from "@/entities/branch";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouteContext } from "@tanstack/react-router";
import { BranchCard } from "./BranchCard";
import { BranchSkeleton } from "./BranchSkeleton";
import { SignOutButton } from "@/features/signOut";

export const SelectBranchPage = () => {
  const { data: branches, isLoading, error } = useBranches();
  const { setBranch } = useBranchActions();
  const { user } = useRouteContext({ from: "/_authenticated/branches" });

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },

              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid",
              borderColor: "divider",
              pb: 3,
              gap: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Box>
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                Welcome, {user.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 0.5 }}
              >
                Select the active branch office to begin operational workflow
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Chip
                label={`Role: ${user.role}`}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ fontWeight: "medium", textTransform: "uppercase" }}
              />
              <SignOutButton username={user.username} />
            </Box>
          </Box>

          {/* server error */}
          {error && (
            <Alert severity="error">
              Failed to load branch offices directory. Please try reloading the
              page.
            </Alert>
          )}

          {/* skeletons */}
          {isLoading && <BranchSkeleton />}

          {/* available branches */}
          {branches && (
            <Grid container spacing={3}>
              {branches.map((branch) => (
                <Grid key={branch.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <BranchCard branch={branch} onSelect={setBranch} />
                </Grid>
              ))}
            </Grid>
          )}

          {/* no branches */}
          {branches?.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 6,
                bgcolor: "background.paper",
                borderRadius: 3,
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                No active branches configured for your organization.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
