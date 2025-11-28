import React from "react";
import { Tabs as MUITabs, Tab as MUITab, Box } from "@mui/material";

const Tab = ({
  tabs = [],
  activeKey,
  onSelect = () => {},
  variant = "standard", 
  scrollButtons = "auto",
  className = "",
}) => {
  const handleChange = (event, newValue) => {
    onSelect(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className={className}>
      <MUITabs
        value={activeKey}
        onChange={handleChange}
        variant={variant}
        scrollButtons={scrollButtons}
        
      >
        {tabs.map((tab) => (
          <MUITab key={tab.key} label={tab.title} value={tab.key} />
        ))}
      </MUITabs>

      {tabs.map((tab) => (
        <Box
          key={tab.key}
          sx={{ padding: 2, display: tab.key === activeKey ? "block" : "none" }}
        >
          {tab.content}
        </Box>
      ))}
    </Box>
  );
};

export default Tab;
