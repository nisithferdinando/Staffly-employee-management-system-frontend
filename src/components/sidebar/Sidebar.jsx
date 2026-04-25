import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";

import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";
import { sidebarData } from "./SidebarData";
import { useSelector } from "react-redux";

const AppSidebar = ({ visible, onHide }) => {
  const employee = useSelector((state) => state.employee.employee);
  const userPermissions = employee?.permissions || {};
  console.log("User Permissions:", userPermissions);
  console.log("Employee:", employee);
  return (
    <Drawer
      variant="persistent"
      open={visible}
      onClose={onHide}
      PaperProps={{
        sx: {
          width: 170,
          backgroundColor: "#232c45",
          color: "white",
          top: "60px",
          height: "calc(100vh - 60px)",
        },
      }}
    >
      <List>
        {sidebarData
          .filter((item) => {
            if (!item.component || !item.permission) return false;
            return (
              userPermissions?.[item.component]?.[item.permission] ?? false
            );
          })
          .map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.path}>
                <Box
                  component={Link}
                  to={item.path}
                  onClick={onHide}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "gainsboro",
                    },
                    borderRadius: 1,
                  }}
                >
                  <Icon sx={{ marginRight: 1 }} />
                  <Box component="span">{item.label}</Box>
                </Box>
              </div>
            );
          })}
      </List>
    </Drawer>
  );
};

export default AppSidebar;
