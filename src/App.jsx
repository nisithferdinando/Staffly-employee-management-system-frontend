import React from "react";
import AdminLogin from "./pages/hr/AdminLogin";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./components/sidebar/DashboardLayout";
import AdminDashboard from "./pages/hr/AdminDashboard";
import EmployeeDashboard from "./pages/employee/employeeDashboard";
import EmployeeLeavePage from "./pages/employee/EmployeeLeavePage";
import EmployeeAttendancePage from "./pages/employee/EmployeeAttendancePage";
import LeaveApprovalPage from "./pages/hr/LeaveApprovalPage";
import EmployeePage from "./pages/hr/EmployeePage";

const App = () => {
  const token = localStorage.getItem("AdminToken");

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/" element={<Navigate to = "/employee/login"/>}/>

          <Route path="/" element={<DashboardLayout />}>
            <Route path="hr/dashboard" element={<AdminDashboard />} />
            <Route path="employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="employee/leave" element={<EmployeeLeavePage />} />
            <Route path="employee/attendance" element={<EmployeeAttendancePage />} />
            <Route path="hr/leave/approval" element={<LeaveApprovalPage/>}/>
            <Route path="hr/employee" element={<EmployeePage/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
