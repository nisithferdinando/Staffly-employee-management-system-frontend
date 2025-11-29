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

const EmployeeLeave = () => {
  const [leaveType, setLeaveType] = useState([]);
  const [form, setForm] = useState({
    leaveType: "",
    leaveDate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async () => {
    const result = validateForm(form, validateEmployeeLeave);
    setErrors(result);

    if (Object.keys(result).length === 0) {
      setLoading(true); 

      try {
        const leaveRequest = {
          ...form,
          employee: employee.id,
          employeeNo: employee.employeeNo,
          firstName: employee.firstName,
          lastName: employee.lastName,
          createdBy: employee.fullName,
          updatedBy: "",
        };

        console.log("Submit Payload", leaveRequest);

        const response = await axiosInstance.post("/leave/add", leaveRequest);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setForm({ leaveType: "", leaveDate: "" });
      } catch (error) {
        console.log("submit error", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [];

  const data = [
    { name: "John", category: "Cardiology", active: "Yes" },
    { name: "Nimal", category: "ENT", active: "No" },
  ];
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-between mt-8 m-8">
            <div>
              <div className="flex flex-col">
                <h1 className="pt-12 text-blue-950 text-[20px]">
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
                  />
                </div>
                <div className="mt-4">
                  <Button label="Submit" onClick={handleSubmit} />
                </div>
              </div>
            </div>
            <div className="mr-12">
              <h1 className="pt-12 text-blue-950 text-[20px] text-center">
                Leave Balance
              </h1>
              <Table
                columns={[
                  { label: "Leave Type", key: "name" },
                  { label: "Total Leave", key: "name" },
                  { label: "Used Leave", key: "category" },
                  { label: "Available Leave", key: "active" },
                ]}
                //data={}
                sizeVariant="sm"
                paddingVariant="lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeave;
