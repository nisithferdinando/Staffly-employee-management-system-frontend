import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "../slice/employeeSlice";

const store = configureStore({
  reducer: {
    employee: employeeSlice,
  },
});

export default store;
