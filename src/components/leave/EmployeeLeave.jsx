import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Dropdown from "../input/Dropdown";
import axiosInstance from "../../util/axiosInstance";
import { getKeyValue } from "../keyvalue/keyValueData";
import DateTimePicker from "../input/DateTimePicker";
import Button from "../button/Button";
import Table from "../../components/Table/Table";
import { validateEmployeeLeave } from "../../validations/employeeLeaveValidations";
import { validateForm } from "../../util/formValidators";
import useEmployee from "../../hook/useEmployee";
import Loader from "../../loader/Loader";
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SearchDropdown from "../input/SearchDropdown";
import { getSearchDropdown } from "../searchDropdown/searchDropdown";

const EmployeeLeave = () => {
  const [leaveType, setLeaveType] = useState([]);
  const [form, setForm] = useState({
    leaveType: "",
    leaveDate: "",
    coveringPersonName: null,
    coveringPerson: null,
    remarks: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [leaveSummary, setLeaveSummary] = useState([]);

  const employee = useEmployee();

  useEffect(() => {
    (async () => {
      const getLeaveType = await getKeyValue("leave");
      setLeaveType(getLeaveType);
    })();
  }, []);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
    if (name === "leaveType") {
      handleLeaveType(value);
      setForm((prev) => ({ ...prev, leaveDate: "" }));
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const formatDate = (d) => d.toISOString().split("T")[0];

  const handleLeaveType = (type) => {
    const today = new Date();

    if (type === 1) {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const dayAfter = new Date();
      dayAfter.setDate(today.getDate() + 2);

      setMinDate(formatDate(tomorrow));
      setMaxDate(formatDate(dayAfter));
    } else if (type === 2) {
      const monthAfter = new Date();
      monthAfter.setDate(today.getDate() + 30);
      setMinDate(formatDate(monthAfter));
      setMaxDate("");
    } else if (type === 3) {
      setMinDate(formatDate(today));
      setMaxDate(formatDate(today));
    } else {
      setMinDate("");
      setMaxDate("");
    }
  };

  const handleSubmit = async () => {
    const result = validateForm(form, validateEmployeeLeave);
    setErrors(result);

    if (Object.keys(result).length === 0) {
      setLoading(true);

      try {
        const leaveRequest = {
          employee: employee.id,
          employeeNo: employee.employeeNo,
          firstName: employee.firstName,
          lastName: employee.lastName,
          leaveType: form.leaveType,
          leaveDate: form.leaveDate,
          createdBy: employee.fullName,
          coveringPerson: form.coveringPerson.id,
          remarks: form.remarks,
          updatedBy: "",
        };

        console.log("Submit Payload", leaveRequest);

        const response = await axiosInstance.post("/leave/add", leaveRequest);
        if (!response.data.success) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.warning(response.data.message);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Leave added successfully!");
        setForm({ leaveType: "", leaveDate: "" });
      } catch (error) {
        if (error.response && error.response.data) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.error(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const employeeId = employee?.id;

  useEffect(() => {
    if (!employee?.id) return;
    (async () => {
      const response = await axiosInstance.get(`/leave/summary/${employeeId}`);
      setLeaveSummary(response.data);
    })();
  }, [employee]);

  console.log("leave summary", leaveSummary);

  return (
    <div>
      <Toast position="top-right" autoClose={3000} theme="colored" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-between mt-8 m-8">
            <div className="bg-gray-100 p-12 mt-10 rounded-lg shadow-sm">
              <div className="flex flex-col">
                <h1 className="mt-8 text-blue-950 text-[20px]">
                  Employee Leave Application
                </h1>

                <div className="flex space-x-8 mt-2">
                  <Dropdown
                    label="Leave Type"
                    placeholder="Leave Type"
                    name="leaveType"
                    options={leaveType}
                    value={form.leaveType}
                    onChange={handleChange}
                    errorMessage={errors}
                    required={true}
                  />
                  <DateTimePicker
                    label="Date"
                    required={true}
                    showTime={false}
                    name="leaveDate"
                    value={form.leaveDate}
                    onChange={handleChange}
                    errorMessage={errors}
                    min={minDate}
                    max={maxDate}
                  />
                </div>
                <div className="flex space-x-8 mt-2">
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
                <div className="mt-4">
                  <Button label="Submit" onClick={handleSubmit} />
                </div>
              </div>
            </div>
            <div className="mr-8 mt-10 bg-gray-100/85 p-12 rounded-lg shadow-sm">
              <h1 className="mt-8 mb-8 text-blue-950 text-[20px] text-center">
                Leave Balance
              </h1>
              <div className="px-4">
                <table className="divide-y-2">
                  <thead className="bg-slate-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-lg font-semibold text-gray-700">
                        Leave Type
                      </th>
                      <th className="px-4 py-2 text-left text-lg font-semibold text-gray-700">
                        Allowed Leave
                      </th>
                      <th className="px-4 py-2 text-left text-lg font-semibold text-gray-700">
                        Used Leaved
                      </th>
                      <th className="px-4 py-2 text-left text-lg font-semibold text-gray-700">
                        Remaining Leave
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {leaveSummary.map((leave) => (
                      <tr key={leave.id} className="">
                        <td className="px-4 py-3 text-slate-950 text-lg ">
                          {leave.leaveTypeName}
                        </td>
                        <td className="px-4 py-2 text-slate-500 text-center">
                          {leave.allowedLeave}
                        </td>
                        <td className="px-4 py-2 text-blue-500 text-center">
                          {leave.usedLeave}
                        </td>
                        <td className="px-4 py-2 text-slate-700 text-center">
                          {leave.remainingLeave}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeave;
