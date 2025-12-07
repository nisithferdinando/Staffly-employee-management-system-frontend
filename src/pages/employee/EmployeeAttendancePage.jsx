import React from 'react'
import EmployeeAttendance from '../../components/attendance/EmployeeAttendance';

const EmployeeAttendancePage = () => {
    const [activeKey, setActiveKey] = useState("attendance");
    
      const tabs = [
        {
          key: "attendance",
          title: "attendance",
          content: (
            <div>
              <EmployeeAttendance/>
            </div>
          ),
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
}

export default EmployeeAttendancePage