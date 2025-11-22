import { createSlice } from "@reduxjs/toolkit";
import getEmployee from "../action/getEmployee";
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployee.fulfilled, (state, action) => {
      state.employee = action.payload;
    });
  },
});

export default employeeSlice.reducer;
