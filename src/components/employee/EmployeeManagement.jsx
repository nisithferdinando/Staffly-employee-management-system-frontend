import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Dropdown from "../input/Dropdown";
import axiosInstance from "../../util/axiosInstance";
import { getKeyValue } from "../keyvalue/keyValueData";
import Button from "../button/Button";
import Table from "../Table/Table";
import Loader from "../../loader/Loader";
import Modal from "../modal/Modal";
import Employee from "./Employee";
import axios from "axios";

const EmployeeManagement = () => {
  const [form, setForm] = useState({
    employeeNo: "",
    firstName: "",
    lastName: "",
    department: "",
    branch: "",
    employeeType: "",
    active: "",
  });
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState([]);
  const [department, setDepartment] = useState([]);
  const [employeeType, setEmployeeType] = useState([]);
  const [active, setActive] = useState([]);
  const [results, setResults] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [employeeData, setEmployeeData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      const branch = await getKeyValue("branch");
      setBranch(branch);
      const department = await getKeyValue("department");
      setDepartment(department);
      const employeeType = await getKeyValue("employee_type");
      setEmployeeType(employeeType);
      const active = await getKeyValue("active");
      setActive(active);
    })();
  }, []);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/employee/search", form);
      await new Promise((resolve) => setTimeout(resolve, 700));
      setResults(response.data);
    } catch (error) {
      console.error("Error searching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowDoubleClick = async (row) => {
    setOpenModal(true);
    setSelectedRow(row);
    console.log("id", row.id);
    const response = await axiosInstance.get(`/employee/${row.id}`);
    setEditMode(true);
    setEmployeeData(response.data);
    console.log("employeeData", response.data);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div>
            <h1 className="text-xl text-gray-800">Employee Management</h1>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm mt-8">
            <h2 className="text-lg text-blue-800">Search Employees</h2>
            <div className="flex gap-x-4 mt-4">
              <Input
                label="Employee No"
                name="employeeNo"
                width="md"
                value={form.employeeNo}
                onChange={handleChange}
              />
              <Input
                label="First Name"
                name="firstName"
                width="md"
                value={form.firstName}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                name="lastName"
                width="md"
                value={form.lastName}
                onChange={handleChange}
              />
              <Dropdown
                label="Branch"
                name="branch"
                options={branch}
                value={form.branch}
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-4">
              <Dropdown
                label="Employee Type"
                name="employeeType"
                options={employeeType}
                value={form.employeeType}
                onChange={handleChange}
              />
              <Dropdown
                label="Active"
                name="active"
                options={active}
                value={form.active}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <Button label="Search" onClick={handleSearch} />
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm mt-4">
            <div>
              <Table
                columns={[
                  {
                    label: "Employee No",
                    key: "employeeNo",
                  },
                  { label: "Name", key: "fullName" },
                  { label: "Employee Type", key: "employeeTypeName" },
                  { label: "Email", key: "officeEmail" },
                  { label: "Designation", key: "designationName" },
                  { label: "Branch", key: "branchName" },
                  { label: "Department", key: "departmentName" },
                ]}
                data={results}
                sizeVariant="sm"
                onRowDoubleClick={handleRowDoubleClick}
              />
            </div>
          </div>
        </div>
      )}
      <Modal
        title="Update Employee"
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="xl"
      >
        <Employee employeeData={employeeData} editMode={editMode} />
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
