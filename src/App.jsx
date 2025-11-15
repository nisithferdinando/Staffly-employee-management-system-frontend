import React from "react";
import AdminLogin from "./pages/hr/AdminLogin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SamplePage from "./pages/hr/SamplePage";
import DashboardLayout from "./components/sidebar/DashboardLayout";

const App = () => {
  const token = localStorage.getItem("AdminToken");

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Route path="/" element={<DashboardLayout />}>
                  <SamplePage />{" "}
                </Route>
              ) : (
                <AdminLogin />
              )
            }
          />
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/hr/dashboard" element={<SamplePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
