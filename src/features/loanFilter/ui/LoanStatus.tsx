import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { loanStatusArr } from "@/entities/loan";
import type { LoanStatus } from "@/shared/api";

interface LoanStatusFilterProps {
  value: string;
  onChange: (status: LoanStatus) => void;
}

export const LoanStatusFilter = (props: LoanStatusFilterProps) => {
  const { value, onChange } = props;
  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel>Status</InputLabel>
      <Select
        value={value}
        label="Status"
        onChange={(e) => onChange(e.target.value as LoanStatus)}
      >
        <MenuItem value="">
          <em>All Statuses</em>
        </MenuItem>
        {loanStatusArr.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
