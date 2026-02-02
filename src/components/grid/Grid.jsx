import React, { useEffect, useMemo, useState } from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  Stack,
  Typography,
  Button,
} from "@mui/material";

const Grid = ({
  title = "",
  columns = [],
  data = [],
  getRowId = (row) => row.id,
  selectMode = "multiple",
  actions = [],
  onActionClick = async (actionKey, ctx) => {},
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  tableHeight = "auto",
  sizeVariant = "sm",
  paddingVariant = "sm",
  rowHeight,
  cellPadding,
  headerPadding = "12px 14px",
  emptyText = "No records found.",
  keepSelectionOnDataChange = false,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const [editedMap, setEditedMap] = useState({});
  const [busyActionKey, setBusyActionKey] = useState(null);

  useEffect(() => {
    setRows(Array.isArray(data) ? data : []);
    setPage(0);

    if (!keepSelectionOnDataChange) setSelectedIds(new Set());
    setEditedMap({});
  }, [data, keepSelectionOnDataChange]);

  const heightPresets = { sm: 40, md: 55, lg: 70 };
  const paddingPresets = { sm: "8px 10px", md: "14px 18px", lg: "20px 24px" };

  const appliedRowHeight = rowHeight || heightPresets[sizeVariant] || 40;
  const appliedCellPadding =
    cellPadding || paddingPresets[paddingVariant] || "8px 10px";

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const pagedRows = useMemo(() => {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, page, rowsPerPage]);

  const selectable = selectMode !== "none";
  const multiSelect = selectMode === "multiple";

  const allVisibleSelected = useMemo(() => {
    if (!selectable || !multiSelect || pagedRows.length === 0) return false;
    return pagedRows.every((r) => selectedIds.has(getRowId(r)));
  }, [pagedRows, selectedIds, selectable, multiSelect, getRowId]);

  const someVisibleSelected = useMemo(() => {
    if (!selectable || !multiSelect || pagedRows.length === 0) return false;
    return (
      pagedRows.some((r) => selectedIds.has(getRowId(r))) && !allVisibleSelected
    );
  }, [
    pagedRows,
    selectedIds,
    selectable,
    multiSelect,
    getRowId,
    allVisibleSelected,
  ]);

  const toggleSelectAllVisible = () => {
    if (!multiSelect) return;
    const next = new Set(selectedIds);
    const visibleIds = pagedRows.map((r) => getRowId(r));
    const shouldSelectAll = !allVisibleSelected;

    visibleIds.forEach((id) => {
      if (shouldSelectAll) next.add(id);
      else next.delete(id);
    });
    setSelectedIds(next);
  };

  const toggleSelectOne = (row) => {
    if (!selectable) return;
    const id = getRowId(row);

    if (selectMode === "single") {
      const next = new Set();
      if (!selectedIds.has(id)) next.add(id);
      setSelectedIds(next);
      return;
    }

    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const getColValue = (row, col) => {
    if (typeof col.valueGetter === "function") return col.valueGetter(row);
    return row[col.key];
  };

  const setColValue = (rowId, colKey, newValue) => {
    setRows((prev) =>
      prev.map((r) =>
        getRowId(r) === rowId ? { ...r, [colKey]: newValue } : r,
      ),
    );

    setEditedMap((prev) => ({
      ...prev,
      [rowId]: {
        ...(prev[rowId] || {}),
        [colKey]: newValue,
      },
    }));
  };

  const formatDisplayValue = (value, row, col) => {
    if (typeof col.valueFormatter === "function")
      return col.valueFormatter(value, row);
    if (col.type === "select" && col.options?.length) {
      const found = col.options.find((o) => String(o.value) === String(value));
      return found?.label ?? value ?? "";
    }
    return value ?? "";
  };

  const defaultEditor = (row, col) => {
    const rowId = getRowId(row);
    const value = getColValue(row, col) ?? "";

    if (typeof col.renderEdit === "function") {
      return col.renderEdit({
        row,
        value,
        onChange: (v) => setColValue(rowId, col.key, v),
      });
    }

    if (col.type === "number") {
      return (
        <TextField
          size="small"
          type="number"
          value={value}
          onChange={(e) => setColValue(rowId, col.key, e.target.value)}
          fullWidth
        />
      );
    }

    if (col.type === "date") {
      return (
        <TextField
          size="small"
          type="date"
          value={value}
          onChange={(e) => setColValue(rowId, col.key, e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      );
    }

    if (col.type === "time") {
      return (
        <TextField
          size="small"
          type="time"
          value={(value || "").toString().slice(0, 5)}
          onChange={(e) => setColValue(rowId, col.key, e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      );
    }

    if (col.type === "select") {
      return (
        <Select
          size="small"
          value={value === "" ? "" : value}
          onChange={(e) => setColValue(rowId, col.key, e.target.value)}
          fullWidth
          displayEmpty
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {(col.options || []).map((opt) => (
            <MenuItem key={String(opt.value)} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      );
    }

    return (
      <TextField
        size="small"
        value={value}
        onChange={(e) => setColValue(rowId, col.key, e.target.value)}
        fullWidth
      />
    );
  };

  const renderCell = (row, col) => {
    const value = getColValue(row, col);

    if (typeof col.render === "function") return col.render(row);

    const isEditable = col.editable === true && col.readonly !== true;

    if (!isEditable) {
      return formatDisplayValue(value, row, col);
    }

    return defaultEditor(row, col);
  };

  const buildActionContext = () => {
    const selectedRows = rows.filter((r) => selectedIds.has(getRowId(r)));

    const editedRows = Object.keys(editedMap).map((rowId) => {
      const baseRow = rows.find((r) => String(getRowId(r)) === String(rowId));
      return { ...(baseRow || {}), ...(editedMap[rowId] || {}) };
    });

    return { selectedRows, allRows: rows, editedRows, editedMap };
  };

  const handleActionClick = async (action) => {
    const ctx = buildActionContext();

    if (action.requiresSelection && ctx.selectedRows.length === 0) return;

    try {
      setBusyActionKey(action.key);
      await onActionClick(action.key, ctx);
      setEditedMap({});
      setSelectedIds(new Set());
    } finally {
      setBusyActionKey(null);
    }
  };

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", borderRadius: 2, boxShadow: 1 }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 1.2, borderBottom: "1px solid #eee" }}
      >
        <Stack>
          {title && <Typography fontWeight={700}>{title}</Typography>}
          {selectable && (
            <Typography variant="body2" color="text.secondary">
              Selected: {selectedIds.size} | Edited:{" "}
              {Object.keys(editedMap).length}
            </Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1}>
          {actions.map((a) => (
            <Button
              key={a.key}
              variant={a.variant || "contained"}
              color={a.color || "primary"}
              disabled={
                busyActionKey !== null ||
                (a.requiresSelection && selectedIds.size === 0)
              }
              onClick={() => handleActionClick(a)}
            >
              {busyActionKey === a.key ? "Processing..." : a.label}
            </Button>
          ))}
        </Stack>
      </Stack>

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
              fontSize: "14px",
            },
            "& .MuiTableRow-root": { height: appliedRowHeight },
          }}
        >
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    padding: headerPadding,
                    background: "#f5f5f5",
                    width: 60,
                  }}
                >
                  {multiSelect ? (
                    <Checkbox
                      checked={allVisibleSelected}
                      indeterminate={someVisibleSelected}
                      onChange={toggleSelectAllVisible}
                    />
                  ) : (
                    " "
                  )}
                </TableCell>
              )}

              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  align={col.align || "center"}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    padding: headerPadding,
                    background: "#f5f5f5",
                    width: col.width,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedRows.length > 0 ? (
              pagedRows.map((row) => {
                const rowId = getRowId(row);
                const selected = selectedIds.has(rowId);

                return (
                  <TableRow
                    key={rowId}
                    hover
                    sx={{
                      cursor: selectable ? "pointer" : "default",
                      "&:hover": { backgroundColor: "#fafafa" },
                      backgroundColor: selected
                        ? "rgba(25, 118, 210, 0.06)"
                        : undefined,
                    }}
                    onClick={() => toggleSelectOne(row)}
                  >
                    {selectable && (
                      <TableCell
                        align="center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={selected}
                          onChange={() => toggleSelectOne(row)}
                        />
                      </TableCell>
                    )}

                    {columns.map((col, j) => (
                      <TableCell key={j} align={col.align || "center"}>
                        {renderCell(row, col)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  align="center"
                  sx={{ padding: "18px", fontSize: "14px" }}
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

      {rows.length > rowsPerPage && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default Grid;
