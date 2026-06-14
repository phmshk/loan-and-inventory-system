import Button from "@mui/material/Button";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

interface ResetFiltersButtonProps {
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const ResetFiltersButton = ({
  hasActiveFilters,
  onReset,
}: ResetFiltersButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="warning"
      size="small"
      disabled={!hasActiveFilters}
      onClick={onReset}
      startIcon={<FilterAltOffIcon />}
      sx={{
        height: 40,
        textTransform: "none",
        flexShrink: 0,
      }}
    >
      Reset Filters
    </Button>
  );
};
