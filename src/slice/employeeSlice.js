import { createSlice } from "@reduxjs/toolkit";
import getEmployee from "../action/getEmployee";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: null,
  },
  reducers: {
    clearEmployee: (state) => {
      state.employee = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployee.fulfilled, (state, action) => {
      state.employee = action.payload;
    });
  },
});

export const { clearEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;