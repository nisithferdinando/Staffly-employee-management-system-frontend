import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";

export const sidebarData = {
  HR: [
    {
      label: "Home",
      path: "/hr/dashboard",
      icon: HomeIcon,
    },
    {
      label: "Leave Approval",
      path: "/hr/leave/approval",
      icon: CheckCircleIcon,
    },
    {
      label:"Employee",
      path:"/hr/employee",
      icon:GroupIcon
    }
  ],
  EMPLOYEE: [
    {
      label: "Home",
      path: "/employee/dashboard",
      icon: HomeIcon,
    },
    {
      label: "Leave",
      path: "/employee/leave",
      icon: ExitToAppIcon,
    },
    {
      label: "Attendance",
      path: "/employee/attendance",
      icon: NetworkCheckIcon,
    },
  ],
};
