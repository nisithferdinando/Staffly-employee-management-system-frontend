import React, { useState } from "react";
import Tab from "../../components/modal/Tab";
import Employee from "../../components/employee/Employee";
import EmployeeManagement from "../../components/employee/EmployeeManagement";

const EmployeePage = () => {
  const [activeKey, setActiveKey] = useState("employee");
  const tabs = [
    {
      key: "employee",
      title: "Employee",
      content: (
        <div>
          <Employee />
        </div>
      ),
    },
    {
      key:"employee_management",
      title:"Employee Management",
      content:<div> <EmployeeManagement/></div>
      
    }
  ];

  return (
    <Tab
      tabs={tabs}
      activeKey={activeKey}
      variant="primary"
      onSelect={(key) => setActiveKey(key)}
    />
  );
};

export default EmployeePage;
