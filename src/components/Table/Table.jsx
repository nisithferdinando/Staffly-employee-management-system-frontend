import React, { useState } from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button as MUIButton,
} from "@mui/material";

const Table = ({
  columns = [],
  data = [],
  actions = [],
  emptyText = "No records found.",
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  tableHeight = "auto",
  sizeVariant = "md",
  paddingVariant = "md",
  rowHeight,
  cellPadding,
  headerPadding = "16px 18px",

  onRowDoubleClick = () => {},
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const heightPresets = {
    sm: 30,
    md: 55,
    lg: 70,
  };

  const paddingPresets = {
    sm: "8px 12px",
    md: "14px 18px",
    lg: "20px 24px",
  };

  let appliedRowHeight;
  if (rowHeight) appliedRowHeight = rowHeight;
  else appliedRowHeight = heightPresets[sizeVariant] || 55;

  let appliedCellPadding;
  if (cellPadding) appliedCellPadding = cellPadding;
  else appliedCellPadding = paddingPresets[paddingVariant] || "24px 18px";

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - data.length);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <TableContainer
        sx={{
          maxHeight: tableHeight,
          overflowY: tableHeight !== "auto" ? "auto" : "visible",
        }}
      >
        <MUITable
          size="small"
          sx={{
            "& .MuiTableCell-root": {
              padding: appliedCellPadding,
              fontSize: "15px",
            },
            "& .MuiTableRow-root": {
              height: appliedRowHeight,
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    padding: headerPadding,
                    background: "#f5f5f5",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}

              {actions.length > 0 && (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    padding: headerPadding,
                    background: "#f5f5f5",
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow
                    key={idx}
                    hover
                    onDoubleClick={() => onRowDoubleClick(row)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#fafafa" },
                    }}
                  >
                    {columns.map((col, j) => (
                      <TableCell key={j} align="center">
                        {row[col.key]}
                      </TableCell>
                    ))}

                    {actions.length > 0 && (
                      <TableCell>
                        {actions.map((act, k) => (
                          <MUIButton
                            key={k}
                            size="small"
                            variant={act.variant || "contained"}
                            color={act.color || "primary"}
                            sx={{ mr: 1 }}
                            onClick={() => act.onClick(row)}
                          >
                            {act.label}
                          </MUIButton>
                        ))}
                      </TableCell>
                    )}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  align="center"
                  sx={{ padding: "24px", fontSize: "16px" }}
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            )}

            {emptyRows > 0 &&
              Array.from(Array(emptyRows)).map((_, i) => (
                <TableRow
                  key={`empty-${i}`}
                  style={{ height: appliedRowHeight }}
                />
              ))}
          </TableBody>
        </MUITable>
      </TableContainer>

      {data.length > rowsPerPage && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default Table;
