import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Dropdown from "../input/Dropdown";
import { getKeyValue } from "../keyvalue/keyValueData";
import DateTimePicker from "../input/DateTimePicker";

const Employee = () => {
  const [employeeType, setEmployeeType] = useState([]);
  const [state, setState] = useState([]);
  const [gender, setGender] = useState([]);
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
      const state = await getKeyValue("state");
      setState(state);
      const gender = await getKeyValue("gender");
      setGender(gender);
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
          {/* <Dropdown
            label="Employee Type"
            placeholder="Employee Type"
            name="employeeType"
            options={employeeType}
            value={employee.employeeType}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          /> */}
          <Input
            label="First Name"
            placeholder="First Name"
            name="firstName"
            value={employee.firstName}
            width="sm"
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
            width="sm"
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
          <Dropdown
            label="State"
            placeholder="state"
            name="state"
            options={state}
            value={employee.state}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
          <DateTimePicker
            label="Date of Birth"
            name="dateOfBirth"
            value={employee.dateOfBirth}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
        </div>
        <div className="flex space-x-8 mt-2">
          <Input
            label="National ID"
            placeholder="012345678V"
            name="nationalId"
            value={employee.nationalId}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
          <Dropdown
            label="Gender"
            placeholder="Gender"
            name="gender"
            options={gender}
            value={employee.gender}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
        </div>
      </div>
      <div className="bg-white p-4 mt-10 rounded-lg shadow-sm">
        <h2 className="text-lg text-gray-800"> Contact Details</h2>
        <div className="flex space-x-8 mt-2">
          <Input
            label="Address No"
            placeholder="No 04"
            name="addressNo"
            value={employee.addressNo}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
          <Input
            label="Address"
            placeholder="Address"
            name="address"
            value={employee.address}
            width="md"
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
          <Input
            label="City"
            placeholder="City"
            name="city"
            value={employee.city}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
          
        </div>
        <div className="flex space-x-8 mt-2">
          <Input
            label="Email"
            placeholder="admin@gmail.com"
            name="email"
            width="md"
            value={employee.email}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
          <Input
            label="Office Email"
            placeholder="example@gmail.com"
            name="officeEmail"
            width="md"
            value={employee.officeEmail}
            onChange={handleChange}
            errorMessage={true}
            required={true}
          />
        </div>
      </div>
      <div className="bg-white p-4 mt-10 rounded-lg shadow-sm">
        <h2 className="text-lg text-gray-800">Work Details</h2>
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
          
        </div>
      </div>
    </div>
  );
};

export default Employee;
