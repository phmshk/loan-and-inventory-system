import { loanCategoryArr } from "@/entities/loan";
import type { LoanCategory } from "@/shared/api";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

interface LoanCategoryFilterProps {
  value: string;
  onChange: (category: LoanCategory | undefined) => void;
}

export const LoanCategoryFilter = ({
  value,
  onChange,
}: LoanCategoryFilterProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    onChange(selectedValue ? (selectedValue as LoanCategory) : undefined);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 160, flexShrink: 0 }}>
      <InputLabel id="loan-category-filter-label">Category</InputLabel>
      <Select
        labelId="loan-category-filter-label"
        id="loan-category-filter"
        value={value}
        label="Category"
        onChange={handleChange}
        sx={{
          fontSize: { xs: "13px", sm: "14px" },
        }}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        {loanCategoryArr.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
