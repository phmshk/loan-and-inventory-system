import React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import type { Branch } from "@/shared/api";

interface BranchCardContentProps {
  branch: Branch;
  isAllowed: boolean;
}

export const BranchCardContent: React.FC<BranchCardContentProps> = ({
  branch,
  isAllowed,
}) => {
  return (
    <CardContent
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        flexGrow: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {branch.name}
        </Typography>

        {!isAllowed && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "error.main",
            }}
          >
            <LockOutlinedIcon fontSize="small" />
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Locked
            </Typography>
          </Box>
        )}
      </Box>

      <Typography variant="body2" color="text.secondary">
        Code: <strong>{branch.code}</strong>
      </Typography>

      {isAllowed && (
        <Typography
          className="enter-indicator"
          variant="caption"
          color="primary.main"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
            fontWeight: "bold",
            opacity: 0,
            transition: "opacity 0.2s",
            marginTop: "auto",
          }}
        >
          Enter Dashboard <ArrowForwardIcon fontSize="inherit" />
        </Typography>
      )}
    </CardContent>
  );
};
