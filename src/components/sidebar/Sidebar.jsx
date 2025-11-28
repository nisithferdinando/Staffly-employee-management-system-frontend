import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";

const AppSidebar = ({ visible, onHide }) => {
  const admin = localStorage.getItem("role");

  return (
    <Drawer
      variant="persistent"
      open={visible}
      onClose={onHide}
      PaperProps={{
        sx: {
          width: 150,
          backgroundColor: "#232c45",
          color: "white",
          top: "60px",
          height: "calc(100vh - 60px)",
        },
      }}
    >
      <List>
        {admin === "HR" ? (
          <div>
            <Box
              component={Link}
              to="/hr/dashboard"
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
              <HomeIcon sx={{ marginRight: 1 }} />
              <Box component="span">Home</Box>
            </Box>
          </div>
        ) : (
          <div>
            <Box
              component={Link}
              to="/employee/dashboard"
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
              <HomeIcon sx={{ marginRight: 1 }} />
              <Box component="span">Home</Box>
            </Box>
             <Box
              component={Link}
              to="/employee/leave"
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
              <ExitToAppIcon sx={{ marginRight: 1 }} />
              <Box component="span">Leave</Box>
            </Box>


          </div>
        )}
      </List>
    </Drawer>
  );
};

export default AppSidebar;
