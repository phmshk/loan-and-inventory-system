import { Link } from "@tanstack/react-router";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { Branch } from "@/shared/api";

interface BranchCardProps {
  branch: Branch;
  onSelect: (branch: Branch) => void;
}

export const BranchCard = ({ branch, onSelect }: BranchCardProps) => {
  return (
    <Card
      elevation={1}
      sx={{
        height: "100%",
        borderRadius: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
          "& .arrow-indicator": { opacity: 1 },
        },
      }}
    >
      <Link
        to="/loans"
        search={{ page: 1, size: 10 }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardActionArea
          onClick={() => onSelect(branch)}
          sx={{ height: "100%", p: 1 }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {branch.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Code: {branch.code}
            </Typography>

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
                gap: 0.5,
              }}
            >
              Enter Dashboard
              <ArrowForwardIcon fontSize="inherit" />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
