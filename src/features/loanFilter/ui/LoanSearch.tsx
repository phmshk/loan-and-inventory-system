import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface LoanSearchProps {
  value: string;
  onChange: (text: string) => void;
}

export const LoanSearch = (props: LoanSearchProps) => {
  const { value, onChange } = props;
  return (
    <TextField
      size="small"
      fullWidth
      placeholder="Search by Item ID or description..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        flexGrow: 1,
        "& .MuiInputBase-input": { fontSize: { xs: "13px", sm: "14px" } },
      }}
    />
  );
};
