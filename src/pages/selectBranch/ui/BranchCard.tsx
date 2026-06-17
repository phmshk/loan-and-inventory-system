import { Link, useRouteContext } from "@tanstack/react-router";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import type { Branch } from "@/shared/api";
import { canAccessBranch } from "@/shared/utils/rbac";
import { BranchCardContent } from "./BranchCardContent";

interface BranchCardProps {
  branch: Branch;
  onSelect: (branch: Branch) => void;
}

export const BranchCard = ({ branch, onSelect }: BranchCardProps) => {
  const { user } = useRouteContext({ from: "/_authenticated" });
  const isAllowed = canAccessBranch(user, branch.id);

  const cardStyles = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 3,
  };
  if (!isAllowed) {
    return (
      <Card
        variant="outlined"
        sx={{
          ...cardStyles,
          bgcolor: "action.hover",
          opacity: 0.7,
        }}
      >
        <BranchCardContent branch={branch} isAllowed={isAllowed} />
      </Card>
    );
  }

  return (
    <Card
      variant="outlined"
      sx={{
        ...cardStyles,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
          borderColor: "primary.main",
          "& .enter-indicator": { opacity: 1 },
        },
      }}
    >
      <Link
        to="/loans"
        search={{ page: 1, size: 10 }}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => onSelect(branch)}
      >
        <CardActionArea>
          <BranchCardContent branch={branch} isAllowed={isAllowed} />
        </CardActionArea>
      </Link>
    </Card>
  );
};
