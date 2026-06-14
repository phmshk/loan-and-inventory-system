import { LoginForm } from "@/features/authByUsername";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 12,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          backgroundColor: "background.paper",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "text.primary",
            }}
          >
            PawnShop ERP
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            Sign in to access your branch ledger and operations
          </Typography>
        </Box>

        <LoginForm />

        <Typography
          variant="caption"
          align="center"
          sx={{
            display: "block",
            color: "text.disabled",
          }}
        >
          Authorized personnel access only. Operational tracking is active.
        </Typography>
      </Paper>
    </Box>
  );
};
