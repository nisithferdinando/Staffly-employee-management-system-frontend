import React, { useCallback, useEffect, useState } from "react";
import Grid from "../grid/Grid";
import axiosInstance from "../../util/axiosInstance";
import { toast } from "react-toastify";

const LeaveApproval = () => {
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApprovalLeaves = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/leave/approval/all");
      setGridData(response.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getApprovalLeaves()
  }, [getApprovalLeaves]);

  const handleApproveLeave = async (actionKey, index) => {
    const selected = index.selectedRows || [];
    if (selected.length === 0) return;

    const leaveApprovalStatus = actionKey === "approve" ? 1 : 3;

    const approvalRequest = selected.map((row) => ({
      leaveId: row.id,
      employee: row.employee,
      employeeNo: row.employeeNo,
      leaveType: row.leaveType,
      leaveDate: row.leaveDate,
      leaveStatus: leaveApprovalStatus,
      active: row.active,
      approvedBy: "Admin",
      createdBy: row.createdBy,
    }));
    try {
      const response = await axiosInstance.put(
        "/leave/approve",
        approvalRequest,
      );
      await getApprovalLeaves();
      toast.success("Leave approved successfully");
    } catch (error) {
      toast.error("Failed to approve leave");
      console.error("Error approving leave:", error);
    }
  };

  return (
    <div>
      <Grid
        title="Leave Approval"
        data={gridData}
        selectMode="multiple"
        tableHeight={650}
        defaultRowsPerPage={8}
        onActionClick={handleApproveLeave}
        actions={[
          {
            key: "approve",
            label: "Approve",
            requiresSelection: true,
            color: "primary",
          },
          {
            key: "reject",
            label: "Reject",
            requiresSelection: true,
            color: "success",
          },
        ]}
        columns={[
          {
            key: "employeeNo",
            label: "Employee No",
          },
          {
            key: "firstName",
            label: "First Name",
          },
          {
            key: "lastName",
            label: "Last Name",
          },
          {
            key: "leaveDate",
            label: "Leave Date",
          },
        ]}
      />
    </div>
  );
};

export default LeaveApproval;
