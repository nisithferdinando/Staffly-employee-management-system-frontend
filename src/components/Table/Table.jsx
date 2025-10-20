import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";

const Table = ({
  columns = [],
  data = [],
  striped = true,
  bordered = true,
  hover = true,
  size = "sm",
  actions = [],
  emptyText = "No records found.",
  rowsPerPage = 10,
  onRowDoubleClick = () => {},
}) => {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="table-responsive">
      <Table striped={striped} bordered={bordered} hover={hover} size={size}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.label}</th>
            ))}
            {actions.length > 0 && <th style={{ width: "150px" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, i) => (
              <tr
                key={i}
                onDoubleClick={() => onRowDoubleClick(row)}
                style={{ cursor: "pointer" }}
              >
                {columns.map((col, j) => (
                  <td key={j}>{row[col.key]}</td>
                ))}
                {actions.length > 0 && (
                  <td>
                    {actions.map((act, k) => (
                      <Button
                        key={k}
                        size="sm"
                        variant={act.variant || "primary"}
                        className="me-2"
                        onClick={() => act.onClick(row)}
                      >
                        {act.label}
                      </Button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)}>
                <div className="text-center text-muted">{emptyText}</div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === currentPage}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Table;
