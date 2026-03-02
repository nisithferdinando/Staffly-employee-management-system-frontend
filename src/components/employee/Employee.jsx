import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Dropdown from "../input/Dropdown";
import { getKeyValue } from "../keyvalue/keyValueData";
import DateTimePicker from "../input/DateTimePicker";
import SearchDropdown from "../input/SearchDropdown";
import { getSearchDropdown } from "../searchDropdown/searchDropdown";
import Button from "../button/Button";
import Toast from "../Toast/Toast";
import Loader from "../../loader/Loader";
import { validateForm } from "../../util/formValidators";
import { validateEmployee } from "../../validations/employeeValidators";
import axiosInstance from "../../util/axiosInstance";
import { toast } from "react-toastify";

const Employee = () => {
  const [employeeType, setEmployeeType] = useState([]);
  const [state, setState] = useState([]);
  const [gender, setGender] = useState([]);
  const [branch, setBranch] = useState([]);
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [active, setActive] = useState([]);
  const [accountStatus, setAccountStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
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
    comfirmationDate: "",
    terminationDate: "",
    basicSalary: "",
    salary: "",
    deduction: "",
    netSalary: "",
    active: "1",
    state: "",
    accountStatus: "1",
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
      const branch = await getKeyValue("branch");
      setBranch(branch);
      const department = await getKeyValue("department");
      setDepartment(department);
      const designation = await getKeyValue("designation");
      setDesignation(designation);
      const active = await getKeyValue("active");
      setActive(active);
      const accountStatus = await getKeyValue("account_status");
      setAccountStatus(accountStatus);
    })();
  }, []);

  const handleChange = (name, value) => {
    setEmployee({
      ...employee,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  const handleReset = () => {
    setEmployee({
      employeeType: "",
      firstName: "",
      lastName: "",
      fullName: "",
      dateOfBirth: "",
      gender: "",
      nationalId: "",
      email: "",
      officeEmail: "",
      phone: "",
      alternativePhone: "",
      addressNo: "",
      address: "",
      city: "",
      branch: "",
      department: "",
      manager: "",
      designation: "",
      joiningDate: "",
      comfirmationDate: "",
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
    setErrors({});
  };

  const handleSubmit = async () => {
    const result = validateForm(employee, validateEmployee);
    console.log("Validation result:", result);
  console.log("Employee state:", employee);
    setErrors(result);
    if (Object.keys(result).length === 0) {
      
      setLoading(true);

      try {
        const employeeRequest = {
          ...employee,
          manager: employee.manager?.id|| null,
          createdBy: "admin",
          updatedBy: "",
        };
        console.log("Employee Request", employeeRequest);
        const response = await axiosInstance.post(
          "/employee/add",
          employeeRequest,
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Employee added successfully");
        handleReset();
      } catch (error) {
        console.error("Error adding employee", error);
        toast.error("Failed to add employee");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Toast position="top-right" autoClose={3000} theme="colored" />
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-200/25 p-8">
          <div>
            <h1 className="text-xl text-blue-950 ">Employee Details</h1>
          </div>
          <div className="bg-white p-4 mt-10 rounded-lg shadow-sm">
            <h2 className="text-lg text-gray-800"> Personal Details</h2>
            <div className="flex space-x-8 mt-2">
              <Input
                label="First Name"
                placeholder="First Name"
                name="firstName"
                value={employee.firstName}
                width="sm"
                errorMessage={errors}
                onChange={handleChange}
                required={true}
              />
              <Input
                label="Last Name"
                placeholder="Last Name"
                name="lastName"
                value={employee.lastName}
                errorMessage={errors}
                width="sm"
                onChange={handleChange}
                required={true}
              />
              <Input
                label="Full Name"
                placeholder="Full Name"
                name="fullName"
                value={employee.fullName}
                errorMessage={errors}
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
                errorMessage={errors}
                required={true}
              />
              <DateTimePicker
                label="Date of Birth"
                name="dateOfBirth"
                value={employee.dateOfBirth}
                onChange={handleChange}
                errorMessage={errors}
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
                errorMessage={errors}
                required={true}
              />
              <Dropdown
                label="Gender"
                placeholder="Gender"
                name="gender"
                options={gender}
                value={employee.gender}
                onChange={handleChange}
                errorMessage={errors}
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
                errorMessage={errors}
                required={true}
              />
              <Input
                label="Address"
                placeholder="Address"
                name="address"
                value={employee.address}
                width="md"
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
              <Input
                label="City"
                placeholder="City"
                name="city"
                value={employee.city}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
              <Input
                label="Phone"
                placeholder="Phone"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
              <Input
                label="Alternative Phone"
                placeholder="Alternative Phone"
                name="alternativePhone"
                value={employee.alternativePhone}
                onChange={handleChange}
                errorMessage={errors}
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
                errorMessage={errors}
                required={true}
              />
              <Input
                label="Office Email"
                placeholder="example@gmail.com"
                name="officeEmail"
                width="md"
                value={employee.officeEmail}
                onChange={handleChange}
                errorMessage={errors}
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
                errorMessage={errors}
                required={true}
              />
              <Dropdown
                label="Branch"
                placeholder="Branch"
                name="branch"
                options={branch}
                value={employee.branch}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
              <Dropdown
                label="Department"
                placeholder="Department"
                name="department"
                options={department}
                value={employee.department}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
              <SearchDropdown
                label="Manager"
                placeholder="Search Manager"
                name="manager"
                value={employee.manager}
                api={getSearchDropdown}
                apiDependency={{
                  type: "employee",
                }}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />

              <DateTimePicker
                label="Joining Date"
                name="joiningDate"
                value={employee.joiningDate}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
            </div>
            <div className="flex space-x-8 mt-2">
              <Dropdown
                label="Designation"
                placeholder="Designation"
                name="designation"
                options={designation}
                value={employee.designation}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
              <DateTimePicker
                label="Comfirmation Date"
                name="comfirmationDate"
                value={employee.comfirmationDate}
                onChange={handleChange}
              />
              <DateTimePicker
                label="Termination Date"
                name="terminationDate"
                value={employee.terminationDate}
                onChange={handleChange}
              />
              <Dropdown
                label="Active"
                placeholder="Active"
                name="active"
                options={active}
                value={employee.active}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
              <Dropdown
                label="Account Status"
                placeholder="Account Status"
                name="accountStatus"
                options={accountStatus}
                value={employee.accountStatus}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
            </div>
          </div>
          <div className="bg-white p-4 mt-10 rounded-lg shadow-sm">
            <h2 className="text-lg text-gray-800">Salary Details</h2>
            <div className="flex space-x-8 mt-2">
              <Input
                label="Basic Salary"
                placeholder="Basic Salary"
                name="basicSalary"
                type="number"
                value={employee.basicSalary}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
              <Input
                label="Salary"
                placeholder="Salary"
                name="salary"
                value={employee.salary}
                type="number"
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
              <Input
                label="Deduction"
                placeholder="Deduction"
                name="deduction"
                value={employee.deduction}
                type="number"
                onChange={handleChange}
              />
              <Input
                label="Net Salary"
                placeholder="Net Salary"
                name="netSalary"
                value={employee.netSalary}
                type="number"
                onChange={handleChange}
                errorMessage={errors}
                required={true}
              />
            </div>
          </div>
          <div className=" flex space-x-4 mt-8">
            <Button label="Submit" type="button" onClick={handleSubmit} />
            <Button label="Reset" color="default" onClick={handleReset} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
