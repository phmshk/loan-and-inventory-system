import { useDeleteLoan, useUpdateLoanStatus } from "@/entities/loan";
import { useCurrentUser } from "@/entities/session";
import type { Loan } from "@/shared/api";
import { canPerformAction } from "@/shared/utils/rbac";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";

interface LoanActionsProps {
  loan: Loan;
  onEditClick: (loan: Loan) => void;
}

export const LoanActions: React.FC<LoanActionsProps> = ({
  loan,
  onEditClick,
}) => {
  const user = useCurrentUser();
  const role = user?.role;

  const { mutate: deleteLoan, isPending: isDeleting } = useDeleteLoan();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateLoanStatus();

  const canUpdate = canPerformAction(role, "UPDATE");
  const canDelete = canPerformAction(role, "DELETE");
  const canChangeStatus = canPerformAction(role, "UPDATE_STATUS");

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete ticket ${loan.ticketNumber}?`,
      )
    ) {
      deleteLoan(loan.id);
    }
  };

  const hasAnyPermission = canUpdate || canDelete || canChangeStatus;

  if (!hasAnyPermission) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontStyle: "italic" }}
      >
        Read-only
      </Typography>
    );
  }

  return (
    <Stack direction="row" spacing={1}>
      {/* EDIT ACTION (MANAGER, APPRAISER) */}
      {canUpdate && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEditClick(loan)}
        >
          Edit
        </Button>
      )}

      {/* STATUS MUTATIONS (MANAGER, CASHIER) */}
      {canChangeStatus && loan.status === "ACTIVE" && (
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<CheckCircleIcon />}
          onClick={() => updateStatus({ id: loan.id, status: "REDEEMED" })}
          disabled={isUpdatingStatus}
        >
          Redeem
        </Button>
      )}

      {canChangeStatus && loan.status === "OVERDUE" && (
        <Button
          variant="contained"
          color="warning"
          size="small"
          startIcon={<AutorenewIcon />}
          onClick={() => updateStatus({ id: loan.id, status: "EXTENDED" })}
          disabled={isUpdatingStatus}
        >
          Extend
        </Button>
      )}

      {/* DELETE ACTION (MANAGER) */}
      {canDelete && (
        <Tooltip title="Delete Record" placement="top">
          <span>
            <IconButton
              color="error"
              size="small"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Stack>
  );
};
