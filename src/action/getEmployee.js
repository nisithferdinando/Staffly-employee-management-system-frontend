import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../util/axiosInstance";

const getEmployee = createAsyncThunk("employee/getEmployee", async (id) => {
  const response = await axiosInstance.get(`/auth/employee/${id}`);
  return response.data;
});

export default getEmployee;