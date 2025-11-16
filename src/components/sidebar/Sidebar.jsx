import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/material";

const AppSidebar = ({ visible, onHide }) => {
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
      </List>
    </Drawer>
  );
};

export default AppSidebar;
