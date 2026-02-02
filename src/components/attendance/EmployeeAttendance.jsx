import React, { useEffect, useMemo, useState } from "react";
import Input from "../input/Input";
import Dropdown from "../input/Dropdown";
import DateTimePicker from "../input/DateTimePicker";
import Button from "../button/Button";
import Loader from "../../loader/Loader";
import { validateForm } from "../../util/formValidators";
import { getKeyValue } from "../keyvalue/keyValueData";
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";
import useEmployee from "../../hook/useEmployee";
import axiosInstance from "../../util/axiosInstance";
import { validateEmployeeAttendance } from "../../validations/employeeAttendanceValidations";
import Grid from "../grid/Grid";

const EmployeeAttendance = () => {
  const [attendanceType, setAttendanceType] = useState([]);
  const [form, setForm] = useState({
    attendanceType: "",
    attendanceDate: "",
    attendanceTime: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [gridLoading, setGridLoading] = useState(false);
  const [gridData, setGridData] = useState([]);

  const employee = useEmployee();

  useEffect(() => {
    (async () => {
      const data = await getKeyValue("attendance_type");
      setAttendanceType(data);
      console.log("attendanceType raw:", data);
    })();
  }, []);

  const attendanceTypeOptions = useMemo(() => {
    return (attendanceType || []).map((x) => ({
      value: x.value ?? x.value ?? x.id,
      label: x.label ?? x.valueName ?? x.name,
    }));
  }, [attendanceType]);

  console.log("attendanceTypeOptions:", attendanceTypeOptions);

  const normalizeTimeToHHmmss = (t) => {
    if (!t) return null;
    if (typeof t === "string" && t.length === 5) return `${t}:00`;
    return t;
  };

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const loadDaily = async () => {
    if (!employee?.id) return;

    setGridLoading(true);
    try {
      const res = await axiosInstance.get(`/attendance/${employee.id}`);
      const list = res?.data || [];

      const map = new Map();

      for (const r of list) {
        const date = r.attendanceDate;
        if (!date) continue;

        if (!map.has(date)) {
          map.set(date, {
            id: `${employee.id}_${date}`,
            employeeId: r.employeeId ?? employee.id,
            employeeNo: r.employeeNo,
            firstName: r.firstName,
            lastName: r.lastName,

            attendanceDate: date,
            inType: 1,
            outType: 2,
            inTime: null,
            outTime: null,

            inId: null,
            outId: null,
          });
        }

        const row = map.get(date);

        const type = r.attendanceType;
        const time = r.attendanceTime;

        if (String(type) === "1") {
          row.inTime = time;
          row.inId = r.id;
        }
        if (String(type) === "2") {
          row.outTime = time;
          row.outId = r.id;
        }
      }

      const result = Array.from(map.values()).sort((a, b) =>
        String(b.attendanceDate).localeCompare(String(a.attendanceDate)),
      );

      setGridData(result);
    } catch (e) {
      toast.error("Failed to load attendance list");
    } finally {
      setGridLoading(false);
    }
  };

  useEffect(() => {
    loadDaily();
  }, [employee?.id]);

  const handleSubmit = async () => {
    const result = validateForm(form, validateEmployeeAttendance);
    setErrors(result);

    if (Object.keys(result).length === 0) {
      setLoading(true);
      try {
        const attendanceRequest = {
          ...form,
          employeeId: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          attendanceConfirmed: 2,
          active: 1,
          status: 1,
          createdBy: employee.firstName,
          updatedBy: employee.firstName,
          employeeNo: employee.employeeNo,
        };

        console.log("Submit Payload", attendanceRequest);

        const response = await axiosInstance.post(
          "/attendance/add",
          attendanceRequest,
        );

        if (!response.data.success) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.warning(response.data.message);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Attendance added successfully");
        setForm({
          attendanceType: "",
          attendanceDate: "",
          attendanceTime: "",
        });
        await loadDaily();
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const updateSelectedRow = async (row) => {
    if (row.inTime && row.outTime) {
      const inT = String(row.inTime).slice(0, 5);
      const outT = String(row.outTime).slice(0, 5);
      if (outT <= inT) {
        toast.warning(`Out time must be after In time (${row.attendanceDate})`);
        return;
      }
    }
    setGridLoading(true);
    try {
      if (row.inTime !== null && row.inTime !== "") {
        await axiosInstance.put(`/attendance/update/${employee.id}`, {
          employeeId: employee.id,
          employeeNo: employee.employeeNo,
          firstName: employee.firstName,
          lastName: employee.lastName,
          attendanceConfirmed: 1,
          active: 1,
          status: 1,
          createdBy: employee.firstName,
          updatedBy: employee.firstName,

          attendanceDate: row.attendanceDate,
          attendanceType: 1,
          attendanceTime: normalizeTimeToHHmmss(row.inTime),
        });
      }

      if (row.outTime !== null && row.outTime !== "") {
        await axiosInstance.put(`/attendance/update/${employee?.id}`, {
          employeeId: employee.id,
          employeeNo: employee.employeeNo,
          firstName: employee.firstName,
          lastName: employee.lastName,
          attendanceConfirmed: 1,
          active: 1,
          status: 1,
          createdBy: employee.firstName,
          updatedBy: employee.firstName,

          attendanceDate: row.attendanceDate,
          attendanceType: 2,
          attendanceTime: normalizeTimeToHHmmss(row.outTime),
        });
      }

      toast.success("Attendance time updated");
      await loadDaily();
    } catch (e) {
      toast.error("Update failed");
    } finally {
      setGridLoading(false);
    }
  };
  const typeLabel = (val) => {
    const opt = attendanceTypeOptions.find(
      (o) => String(o.value) === String(val),
    );
    return opt?.label ?? val ?? "";
  };

  return (
    <div>
      <Toast position="top-right" autoClose={3000} theme="colored" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-between mt-8 m-8">
            <div className="flex flex-col">
              <h1 className="pt-12 text-blue-950 text-[20px]">
                Employee Attendance Application
              </h1>

              <div className="flex space-x-8 mt-2">
                <Dropdown
                  label="Attendance Type"
                  placeholder="Attendance Type"
                  name="attendanceType"
                  options={attendanceTypeOptions}
                  value={form.attendanceType}
                  onChange={handleChange}
                  errorMessage={errors}
                  required
                />

                <DateTimePicker
                  label="Date"
                  name="attendanceDate"
                  value={form.attendanceDate}
                  onChange={handleChange}
                  errorMessage={errors}
                  required={true}
                  showTime={false}
                />
              </div>

              <div className="flex space-x-8 mt-2">
                <DateTimePicker
                  label="Time"
                  name="attendanceTime"
                  value={form.attendanceTime}
                  onChange={handleChange}
                  errorMessage={errors}
                  required={true}
                  showTime={true}
                />
              </div>

              <div className="mt-4">
                <Button label="Submit" onClick={handleSubmit} />
              </div>
            </div>
          </div>

          <div className="m-8 mt-8">
            <Grid
              title="Attendance Update"
              data={gridData}
              getRowId={(r) => r.id}
              selectMode="single"
              tableHeight={650}
              defaultRowsPerPage={5}
              actions={[
                {
                  key: "update",
                  label: "Update Time",
                  requiresSelection: true,
                },
              ]}
              columns={[
                { key: "attendanceDate", label: "Date", editable: false },

                {
                  key: "inType",
                  label: "Attendance Type",
                  editable: false,
                  valueFormatter: (value) => typeLabel(value),
                },

                {
                  key: "inTime",
                  label: "Time (IN)",
                  editable: true,
                  type: "time",
                },

                {
                  key: "outType",
                  label: "Attendance Type",
                  editable: false,
                  valueFormatter: (value) => typeLabel(value),
                },

                {
                  key: "outTime",
                  label: "Time (OUT)",
                  editable: true,
                  type: "time",
                },
              ]}
              onActionClick={async (actionKey, { selectedRows }) => {
                if (actionKey !== "update") return;
                const row = selectedRows?.[0];
                if (!row) return;
                await updateSelectedRow(row);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;
