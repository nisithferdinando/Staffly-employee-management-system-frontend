import { required } from "../util/validators";

export const validateEmployeeAttendance = {
  attendanceType: { required: true, validators: [] },
  attendanceDate: { required: true, validators: [] },
  attendanceTime: { required: true, validators: [] },
};
