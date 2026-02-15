import React, { useState } from "react";
import LeaveApproval from "../../components/leave approval/LeaveApproval";
import Tab from "../../components/modal/Tab";

const LeaveApprovalPage = () => {
  const [activeKey, setActiveKey] = useState("leave_approval");
  const tabs = [
    {
      key: "leave_approval",
      title: "Leave Approval",
      content: (
        <div>
          {" "}
          <LeaveApproval />
        </div>
      ),
    },
     {
      key: "leave_summary",
      title: "Leave Approval Summary",
      content: (
        <div>
          {" "}
          Leave Approval Summary
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Tab
        tabs={tabs}
        activeKey={activeKey}
        variant="primary"
        onSelect={(key) => setActiveKey(key)}
      />
    </div>
  );
};

export default LeaveApprovalPage;
