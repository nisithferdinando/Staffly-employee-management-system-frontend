import React, { useState } from "react";
import Tab from "../../components/modal/Tab";
import EmployeeLeave from "../../components/leave/EmployeeLeave";

const EmployeeLeavePage = () => {
  const [activeKey, setActiveKey] = useState("leave");

  const tabs = [
    {
      key: "leave",
      title: "Leave",
      content: (
        <div>
          <EmployeeLeave />
        </div>
      ),
    },
    {
      key: "short_leave",
      title: "Short Leave",
      content: <div>Short Leave Content</div>,
    },
    {
      key: "half_day",
      title: "Half Day",
      content: <div>Half Day Content</div>,
    },
    { key: "summary", title: "Summary", content: <div>Summary Content</div> },
  ];
  return (
    <div>
      <div className="w-full">
        <Tab
          tabs={tabs}
          activeKey={activeKey}
          variant="primary"
          onSelect={(key) => setActiveKey(key)}
        />
      </div>
    </div>
  );
};

export default EmployeeLeavePage;
