import { useBranchActions, useBranches } from "@/entities/branch";
import type { Branch } from "@/shared/api";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useRouteContext } from "@tanstack/react-router";

export const SelectBranchPage = () => {
  const { data: branches, isLoading, error } = useBranches();
  const { setBranch } = useBranchActions();
  const { user } = useRouteContext({ from: "/_authenticated/branches" });

  const handleSelectBranch = (branch: Branch) => {
    setBranch(branch);
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "center" },
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
            <Chip
              label={`Role: ${user.role}`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: "medium", textTransform: "uppercase" }}
            />
          </Box>

          {/* server error */}
          {error && (
            <Alert severity="error">
              Failed to load branch offices directory. Please try reloading the
              page.
            </Alert>
          )}

          {/* skeletons */}
          {isLoading && (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5].map((id) => (
                <Grid key={id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Skeleton
                    variant="rounded"
                    height={128}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* available branches */}
          {branches && (
            <Grid container spacing={3}>
              {branches.map((branch) => (
                <Grid key={branch.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: 2,
                        "& .arrow-indicator": { opacity: 1 },
                      },
                    }}
                  >
                    <Link
                      to="/loans"
                      search={(prev) => ({
                        page: prev.page,
                        limit: prev.limit,
                        search: prev.search,
                        status: prev.status,
                      })}
                      onClick={() => handleSelectBranch(branch)}
                    >
                      <CardActionArea
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "stretch",
                        }}
                      >
                        <CardContent
                          sx={{
                            p: 3,
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: "semibold",
                                color: "text.primary",
                              }}
                            >
                              {branch.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.disabled",
                                display: "block",
                                mt: 0.5,
                              }}
                            >
                              {branch.code}
                            </Typography>
                          </Box>

                          <Typography
                            className="arrow-indicator"
                            variant="caption"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 2,
                              color: "primary.main",
                              fontWeight: "medium",
                              opacity: 0,
                              transition: "opacity 0.2s",
                            }}
                          >
                            Enter Dashboard
                            <ArrowForwardIcon fontSize="inherit" />
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
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
