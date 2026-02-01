import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import Input from "../input/Input";
import SearchDropdown from "../input/SearchDropdown";
import DateTimePicker from "../input/DateTimePicker";
import Dropdown from "../input/Dropdown";
import axiosInstance from "../../util/axiosInstance";
import { validateForm } from "../../util/formValidators";
import { validateEmployeeLeave } from "../../validations/employeeLeaveValidations";
import { toast } from "react-toastify";
import { getSearchDropdown } from "../searchDropdown/searchDropdown";

const EmployeeLeaveUpdate = ({
  show = false,
  onClose = () => {},
  //onUpdated = () => {},
  leave = null,
  employee = null,
  leaveTypeOptions = [],
}) => {
  const [form, setForm] = useState({
    coveringPerson: null,
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!leave) return;

    setForm({
      coveringPerson: leave.coveringPerson
        ? {
            id: leave.coveringPerson,
            text1: leave.coveringPersonName,
          }
        : null,
      remarks: leave.remarks ?? "",
    });

    setErrors({});
  }, [leave, show]);

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSave = async () => {
    const result = validateForm(form, validateEmployeeLeave);
    setErrors(result);

    if (Object.keys(result).length !== 0) {
      setSaving(true);
      try {
        const payload = {
          id: leave.id,
          employee: leave.employee,
          employeeNo: leave.employeeNo,
          firstName: leave.firstName,
          lastName: leave.lastName,
          leaveType: leave.leaveType,
          leaveDate: leave.leaveDate,
          active: leave.active,
          createdBy: leave.createdBy,
          updatedBy: employee.fullName,
          coveringPerson: form.coveringPerson.id,
          remarks: form.remarks,
        };

        const res = await axiosInstance.put(
          `/leave/update/${leave.id}`,
          payload,
        );

        if (res?.data && res.data.success === false) {
          toast.warning(res.data.message || "Update failed");
          return;
        }

        toast.success("Leave updated successfully!");
        //onUpdated();
        onClose();
      } catch (err) {
        const msg = err?.response?.data?.message || "Something went wrong";
        toast.error(msg);
      } finally {
        setSaving(false);
      }
    }
  };

  const leaveTypeName =
    leaveTypeOptions?.find((x) => x.value === leave?.leaveType)?.label ||
    leave?.leaveTypeValue ||
    "";

  return (
    <Modal
      title="Edit Leave"
      show={show}
      onClose={onClose}
      onSave={handleSave}
      saveText={saving ? "Saving..." : "Save"}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      size="sm"
    >
      {!leave ? (
        <div>No leave selected.</div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Dropdown
              label="Leave Type"
              name="leaveType"
              options={leaveTypeOptions}
              value={leave.leaveType}
              onChange={() => {}}
              required={false}
              disabled={true}
            />

            <DateTimePicker
              label="Date"
              showTime={false}
              name="leaveDate"
              value={leave.leaveDate}
              onChange={() => {}}
              disabled={true}
            />
          </div>

          <div className="flex gap-4">
            <SearchDropdown
              label="Covering Person"
              name="coveringPerson"
              placeholder="Search employee"
              value={form.coveringPerson}
              api={getSearchDropdown}
              apiDependency={{
                type: "employee",
                value: employee?.id,
                param1: employee?.department,
              }}
              onChange={handleChange}
              errorMessage={errors}
              required={true}
            />

            <Input
              label="Remarks"
              type="text"
              name="remarks"
              placeholder="remarks"
              value={form.remarks}
              width="sm"
              onChange={handleChange}
              errorMessage={errors}
            />
          </div>

          {leaveTypeName ? (
            <p className="text-xs text-gray-500">
              (Leave type: {leaveTypeName})
            </p>
          ) : null}
        </div>
      )}
    </Modal>
  );
};

export default EmployeeLeaveUpdate;
