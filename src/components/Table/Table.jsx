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
  onRowDoubleClick = () => {},
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - data.length);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <MUITable size="small">
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx}>{col.label}</TableCell>
              ))}
              {actions.length > 0 && <TableCell>Actions</TableCell>}
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
                    sx={{ cursor: "pointer" }}
                  >
                    {columns.map((col, j) => (
                      <TableCell key={j}>{row[col.key]}</TableCell>
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
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            )}

            {emptyRows > 0 &&
              Array.from(Array(emptyRows)).map((_, i) => (
                <TableRow key={`empty-${i}`} style={{ height: 33 }} />
              ))}
          </TableBody>
        </MUITable>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Table;
