import React from "react";
import AdminLogin from "./pages/hr/AdminLogin";
import EmployeeLogin from "./pages/employee/EmployeeLogin"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./components/sidebar/DashboardLayout";
import AdminDashboard from "./pages/hr/AdminDashboard";
import EmployeeDashboard from "./pages/employee/employeeDashboard";

const App = () => {
  const token = localStorage.getItem("AdminToken");

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route path="hr/dashboard" element={<AdminDashboard />} />
            <Route path="employee/dashboard" element={<EmployeeDashboard/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
