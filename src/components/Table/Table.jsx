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
  defaultRowsPerPage = 8,
  tableHeight = "auto",
  onRowDoubleClick = () => {},
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleChangePage = (_, newPage) => setPage(newPage);

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
        boxShadow: 1,
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
              padding: "8px 8px",
              fontSize: "12px",
            },
            "& .MuiTableHead-root .MuiTableRow-root": {
              height: 40,
            },
            "& .MuiTableBody-root .MuiTableRow-root": {
              height: 30,
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    padding: "10px 10px",
                    background: "#f5f5f5",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}

              {actions.length > 0 && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "13px",
                    padding: "10px 10px",
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
                      <TableCell key={j} align={col.align || "center"}>
                        {col.button ? (
                          <MUIButton
                            size="small"
                            variant={col.variant || "contained"}
                            color={col.color || "primary"}
                            sx={{
                              minHeight: 24,
                              padding: "2px 8px",
                              fontSize: "11px",
                              textTransform: "none",
                              mr: 1,
                            }}
                            disabled={col.disabled ? col.disabled(row) : false}
                            onClick={(e) => {
                              e.stopPropagation();
                              col.onClick?.(row);
                            }}
                          >
                            {typeof col.buttonLabel === "function"
                              ? col.buttonLabel(row)
                              : col.buttonLabel || col.label}
                          </MUIButton>
                        ) : (
                          row[col.key]
                        )}
                      </TableCell>
                    ))}

                    {actions.length > 0 && (
                      <TableCell align="center">
                        {actions.map((act, k) => (
                          <MUIButton
                            key={k}
                            size="small"
                            variant={act.variant || "contained"}
                            color={act.color || "primary"}
                            sx={{
                              minHeight: 24,
                              padding: "2px 8px",
                              fontSize: "11px",
                              textTransform: "none",
                              mr: 1,
                            }}
                            onClick={() => act.onClick(row)}
                            disabled={act.disabled ? act.disabled(row) : false}
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
                  sx={{ padding: "12px", fontSize: "12px" }}
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            )}

            {emptyRows > 0 &&
              Array.from(Array(emptyRows)).map((_, i) => (
                <TableRow key={`empty-${i}`} style={{ height: 30 }} />
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
