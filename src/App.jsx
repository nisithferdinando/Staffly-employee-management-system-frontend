import React from "react";
import AdminLogin from "./pages/hr/AdminLogin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SamplePage from "./pages/hr/SamplePage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/hr/dashboard" element={<SamplePage />}></Route>
          <Route path="/hr/login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
