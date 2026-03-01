import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Dropdown from "../input/Dropdown";
import { getKeyValue } from "../keyvalue/keyValueData";

const Employee = () => {
  const [employeeType, setEmployeeType] = useState([]);
  const [employee, setEmployee] = useState({
    employeeType: "",
    firstName: "",
    lastName: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationalId: "",
    phone: "",
    alternativePhone: "",
    email: "",
    officeEmail: "",
    addressNo: "",
    address: "",
    city: "",
    branch: "",
    department: "",
    manager: "",
    designation: "",
    joiningDate: "",
    terminationDate: "",
    basicSalary: "",
    salary: "",
    deduction: "",
    netSalary: "",
    active: "",
    state: "",
    accountStatus: "",
    createdBy: "",
    updatedBy: "",
  });

  useEffect(() => {
    (async () => {
      const employeeType = await getKeyValue("employee_type");
      setEmployeeType(employeeType);
    })();
  }, []);

  const handleChange = (name, value) => {
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-xl text-blue-950 ">Employee Details</h1>
      </div>
      <div className="bg-white p-4 mt-10 rounded-lg shadow-sm">
        <h2 className="text-lg text-gray-800"> Personal Details</h2>
        <div className="flex space-x-8 mt-2">
          <Dropdown
            label="Employee Type"
            placeholder="Employee Type"
            name="employeeType"
            options={employeeType}
            value={employee.employeeType}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
          <Input
            label="First Name"
            placeholder="First Name"
            name="firstName"
            value={employee.firstName}
            width="md"
            errorMessage={true}
            onChange={handleChange}
            required={true}
          />
          <Input
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            value={employee.lastName}
            errorMessage={true}
            width="md"
            onChange={handleChange}
            required={true}
          />
          <Input
            label="Full Name"
            placeholder="Full Name"
            name="fullName"
            value={employee.fullName}
            errorMessage={true}
            width="md"
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Employee;
