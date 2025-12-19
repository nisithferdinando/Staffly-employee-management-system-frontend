import React, {useEffect, useState} from 'react'
import Input from '../input/Input';
import Dropdown from "../input/Dropdown";
import DateTimePicker from "../input/DateTimePicker";
import Button from "../button/Button";
import Loader from '../../loader/Loader';
import { validateForm } from '../../util/formValidators';
import { getKeyValue } from '../keyvalue/keyValueData';
import Toast from "../Toast/Toast";
import { toast } from "react-toastify";
import useEmployee from '../../hook/useEmployee';
import axiosInstance from '../../util/axiosInstance';
import { validateEmployeeAttendance } from '../../validations/employeeAttendanceValidations';

// const EmployeeAttendance = () => {
//    const [form, setForm] = useState({
//        attendanceType: "",
//        attendanceDate: "",
//        attendanceTime: "",
//      });
//    const [errors, setErrors] = useState({});
//      const [loading, setLoading] = useState(false);
//      const [minDate, setMinDate] = useState("");
//      const [maxDate, setMaxDate] = useState("");
//      const [attendanceType, setAttendanceType] = useState([]);
//      useEffect(() => {
//         (async () => {
//           const getAttendanceType = await getKeyValue("attendance_type");
//           setAttendanceType(getAttendanceType);
//         })();
//       }, []);

//     const handleChange = (name, value) => {
//     setForm({
//       ...form,
//       [name]: value,
//     });
//     if (name === "attendanceType") {
//       handleAttendanceType(value);
//       setForm((prev) => (
//         { ...prev, attendanceDate: "" },
//         { ...prev, attendanceTime: "" }
//       ));
//     }

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: null });
//     }
//   };

//   const handleAttendanceType = (type) => {
//     const today = new Date();

//     if (type === 1) {
//       const tomorrow = new Date();
//       tomorrow.setDate(today.getDate() + 1);

//       const dayAfter = new Date();
//       dayAfter.setDate(today.getDate() + 2);

//       //setMinDate(formatDate(tomorrow));
//       //setMaxDate(formatDate(dayAfter));
//     } else if (type === 2) {
//       const monthAfter = new Date();
//       monthAfter.setDate(today.getDate() + 30);
//       setMinDate(formatDate(monthAfter));
//       setMaxDate("");
//     } else if (type === 3) {
//       setMinDate(formatDate(today));
//       setMaxDate(formatDate(today));
//     } else {
//       setMinDate("");
//       setMaxDate("");
//     }
//   };
//   return (
//     <div>
//         <div className="flex justify-between mt-8 m-8">
//           <div>
//             <div className="flex flex-col">
//               <h1 className="pt-12 text-blue-950 text-[20px]">
//                 Employee Atttendance Application
//               </h1>
//               <div className="flex space-x-8 mt-2">
//                 <Dropdown
//                   label="Attendance Type"
//                   placeholder="Attendance Type"
//                   name="attendanceType"
//                   options={attendanceType}
//                   value={form.attendanceType}
//                   required={true}
//                   errorMessage={errors}
//                 />
//                 <DateTimePicker
//                   label="Date"
//                   required={true}
//                   showTime={false}
//                   name="attendanceDate"
//                   errorMessage={errors}
//                 />
//               </div>
//               <div className="flex space-x-8 mt-2">
//                 <DateTimePicker
//                   label="Time"
//                   required={true}
//                   showTime={true}
//                   name="attendanceTime"
//                   errorMessage={errors}
//                   min={minDate}
//                   max={maxDate}
//                 />
//               </div>
//               <div className="mt-4">
//                 <Button label="Submit"/>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   )
// }

// export default EmployeeAttendance;



const EmployeeAttendance = () => {
  const [attendanceType, setAttendanceType] = useState([]);
  const [form, setForm] = useState({
    attendanceType: "",
    attendanceDate: "",
    attendanceTime: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const employee = useEmployee();

  // Load attendance types
  useEffect(() => {
    (async () => {
      const data = await getKeyValue("attendance_type");
      setAttendanceType(data);
    })();
  }, []);

  // Handle input changes
  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Submit attendance
  const handleSubmit = async () => {
    const result = validateForm(form, validateEmployeeAttendance);
    setErrors(result);

    if (Object.keys(result).length === 0) {
      setLoading(true);
      try {
        const attendanceRequest = {
          ...form,
          employee: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          attendanceConfirmed: employee.attendanceConfirmed,
          active: employee.active,
          status: employee.status,
          createdBy: employee.createdBy,
          updatedBy: employee.updatedBy,
          employeeNo: employee.employeeNo,
        };

        console.log("Submit Payload", attendanceRequest);

        const response = await axiosInstance.post(
          "/attendance/add",
          payload
        );

        if (!response.data.success) {
           await new Promise((resolve) => setTimeout(resolve, 1000));
           toast.warning(response.data.message);
           return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Attendance added successfully");
        setForm({
          attendanceType: "",
          attendanceDate: "",
          attendanceTime: "",
        });
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Toast position="top-right" autoClose={3000} theme="colored" />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-between mt-8 m-8">
          <div className="flex flex-col">
            <h1 className="pt-12 text-blue-950 text-[20px]">
              Employee Attendance Application
            </h1>

            <div className="flex space-x-8 mt-2">
              <Dropdown
                label="Attendance Type"
                placeholder="Attendance Type"
                name="attendanceType"
                options={attendanceType}
                value={form.attendanceType}
                onChange={handleChange}
                errorMessage={errors}
                required
              />

              <DateTimePicker
                label="Date"
                name="attendanceDate"
                value={form.attendanceDate}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
                showTime={false}
              />
            </div>

            <div className="flex space-x-8 mt-2">
              <DateTimePicker
                label="Time"
                name="attendanceTime"
                value={form.attendanceTime}
                onChange={handleChange}
                errorMessage={errors}
                required={true}
                showTime = {true}
              />
            </div>

            <div className="mt-4">
              <Button label="Submit" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;