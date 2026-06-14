import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { type Table as TableInstance } from "@tanstack/react-table";
import type { Loan } from "@/shared/api";

interface ColumnToggleProps {
  table: TableInstance<Loan>;
}

export const ColumnToggle = (props: ColumnToggleProps) => {
  const { table } = props;
  return (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel>Visible Columns</InputLabel>
      <Select
        multiple
        value={table.getVisibleLeafColumns().map((c) => c.id)}
        label="Visible Columns"
        renderValue={() => "Toggle Columns"}
      >
        {table.getAllLeafColumns().map((column) => (
          <MenuItem
            key={column.id}
            value={column.id}
            onClick={() => column.toggleVisibility(!column.getIsVisible())}
          >
            <Checkbox checked={column.getIsVisible()} size="small" />
            <ListItemText primary={column.columnDef.header as string} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
