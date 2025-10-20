import React from "react";
import { Tabs, Tab } from "react-bootstrap";

const Tab = ({
  tabs = [],
  activeKey,
  onSelect,
  variant = "tabs",
  justify = false,
  fill = false,
  className = "",
}) => {
  return (
    <Tabs
      id="custom-tabs"
      activeKey={activeKey}
      onSelect={onSelect}
      variant={variant}
      justify={justify}
      fill={fill}
      className={className}
    >
      {tabs.map((tab, index) => (
        <Tab eventKey={tab.key} title={tab.title} key={index}>
          <div className="p-3">{tab.content}</div>
        </Tab>
      ))}
    </Tabs>
  );
};

export default Tab;
