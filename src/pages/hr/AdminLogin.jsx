// AdminLogin.jsx
import React, { useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [formToogle, setFormTogle]= useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email format";
    if (!formData.password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/hr/login", {
        hrEmail: formData.email.trim(),
        hrPassword: formData.password.trim(),
      });

      localStorage.setItem("AdminToken", response.data.token);
      localStorage.setItem("AdminEmail", response.data.hrDetails.hrEmail);
      localStorage.setItem("role", response.data.role);
      setValidationErrors("");
      navigate("/hr/dashboard");
    } catch (error) {
      setValidationErrors(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {validationErrors && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium">
              {validationErrors}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Input
              type="text"
              label="Email"
              placeholder="Enter your email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              width="md"
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              width="md"
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm font-medium">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex">
            <label className="flex space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span>Remember me</span>
            </label>
          </div>

          <Button
            type="submit"
            label={loading ? "Logging in..." : "Login"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
