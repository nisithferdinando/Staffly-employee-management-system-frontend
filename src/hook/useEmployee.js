import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getEmployee from "../action/getEmployee";

const useEmployee = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);

  const id = localStorage.getItem("userId");

  useEffect(() => {
    if(id && ! employee){
    dispatch(getEmployee(id));
    }
  }, [dispatch, id, employee]);

  return employee;
};

export default useEmployee;
