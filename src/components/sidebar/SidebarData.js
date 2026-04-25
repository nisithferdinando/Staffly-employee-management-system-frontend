import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import { COMPONENTS, permissions } from "../../const";

export const sidebarData = [
  {
    label: "Home",
    path: "/hr/dashboard",
    icon: HomeIcon,
    component: COMPONENTS.LEAVE_APPROVAL,
    permission: permissions.LEAVE_APPROVAL_VIEW.permission,
  },
  {
    label: "Leave Approval",
    path: "/hr/leave/approval",
    icon: CheckCircleIcon,
    component: COMPONENTS.LEAVE_APPROVAL,
    permission: permissions.LEAVE_APPROVAL_VIEW.permission,
  },
  {
    label: "Employee",
    path: "/hr/employee",
    icon: GroupIcon,
    component: COMPONENTS.EMPLOYEE_MANAGEMENT,
    permission: permissions.EMPLOYEE_MANGEMENT_VIEW.permission,
  },

  {
    label: "Home",
    path: "/employee/dashboard",
    icon: HomeIcon,
    component: COMPONENTS.EMPLOYEE_DASHBOARD,
    permission: permissions.EMPLOYEE_DASHBOARD_VIEW.permission,
  },
  {
    label: "Leave",
    path: "/employee/leave",
    icon: ExitToAppIcon,
    component: COMPONENTS.LEAVE,
    permission: permissions.LEAVE_VIEW.permission,
  },
  {
    label: "Attendance",
    path: "/employee/attendance",
    icon: NetworkCheckIcon,
    component: COMPONENTS.ATTENDENCE,
    permission: permissions.ATTENDENCE_VIEW.permission,
  },
];
