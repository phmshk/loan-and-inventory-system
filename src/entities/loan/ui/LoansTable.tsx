import type { Loan, LoanSort, LoanSortFields } from "@/shared/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { flexRender, type Table as TableInstance } from "@tanstack/react-table";

interface LoansTableProps {
  table: TableInstance<Loan>;
  totalItems: number;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: LoanSort;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newSize: number) => void;
  onSortChange: (columnId: LoanSortFields, order: LoanSort) => void;
}

export const LoansTable = (props: LoansTableProps) => {
  const {
    table,
    totalItems,
    page,
    pageSize,
    sortBy,
    sortOrder,
    onPageChange,
    onRowsPerPageChange,
    onSortChange,
  } = props;

  const handleSortClick = (columnId: LoanSortFields) => {
    const isCurrentField = sortBy === columnId;
    const newOrder = isCurrentField && sortOrder === "asc" ? "desc" : "asc";
    onSortChange(columnId, newOrder);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSortable = header.id !== "itemDescription";
                  return (
                    <TableCell key={header.id}>
                      {isSortable ? (
                        <TableSortLabel
                          active={sortBy === header.id}
                          direction={sortBy === header.id ? sortOrder : "asc"}
                          onClick={() =>
                            handleSortClick(header.id as LoanSortFields)
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </TableSortLabel>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} hover>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  align="center"
                  sx={{ py: 6, color: "text.secondary" }}
                >
                  No active loans found matching criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalItems}
        page={page - 1} //(0-indexed)
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
};
