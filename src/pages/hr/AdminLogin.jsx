import React, { useState } from "react";
import axiosInstance from "../../util/axiosInstance";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [validationErrors, setValidationErrors] = useState("");
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm();
    if (!validation) return;

    try {
      const requestData = {
        hrEmail: formData.email.trim(),
        hrPassword: formData.password.trim(),
      };
      const response = await axiosInstance.post(
        "/auth/hr/login",
        requestData
      );

      localStorage.setItem("AdminToken", response.data.token);
      localStorage.setItem("AdminEmail", response.data.hrDetails.hrEmail);
      setValidationErrors("");
      navigate("/hr/dashboard");
    } catch (error) {
      console.log("Error response:", error.response);
      if (error.response?.data?.message) {
        setValidationErrors(error.response.data.message);
      } else {
        setValidationErrors(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-pink-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to continue to your dashboard
              </p>
            </div>

            {validationErrors && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center font-medium">
                  {validationErrors}
                </p>
              </div>
            )}

            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ${
                      errors.email
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-500 text-sm font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 transition duration-200 ${
                      errors.password
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  {errors.password && (
                    <p className="mt-2 text-red-500 text-sm font-medium">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-600 font-medium">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                🔒 Secure login with enterprise-grade encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
