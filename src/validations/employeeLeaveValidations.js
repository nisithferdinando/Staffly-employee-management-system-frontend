import { required } from "../util/validators";

export const validateEmployeeLeave = {
  leaveType: { required: true, validators: [] },
  leaveDate: { required: true, validators: [] },
  coveringPerson: { required: true, validators: [] },
};
