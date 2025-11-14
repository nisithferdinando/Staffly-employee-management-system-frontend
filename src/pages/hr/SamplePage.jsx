import React from "react";
import Dropdown from "../../components/input/Dropdown";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Checkbox from "../../components/input/Checkbox";
import RadioButton from "../../components/input/RadioButton";
import Modal from "../../components/modal/Modal";
import DateTimePicker from "../../components/input/DateTimePicker";
import Tab from "../../components/modal/Tab";
import Table from "../../components/Table/Table";

const SamplePage = () => {
    const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
];

const data = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
];

const actions = [
  {
    label: "Edit",
    onClick: (row) => console.log("Edit", row),
    variant: "contained",
    color: "primary",
  },
  {
    label: "Delete",
    onClick: (row) => console.log("Delete", row),
    variant: "outlined",
    color: "error",
  },
];
  return (
    <div>
      <Dropdown
      label="text"
      />
      <Input
        label="First Name"
        name="firstName"
        //value={form.firstName}
        //onChange={handleChange}
        required
        size="small"
      />
    
      <Checkbox/>

      <RadioButton
  label="Gender"
  name="gender"
  options={[
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other", disabled: true },
  ]}
  //value={selectedGender}
  //onChange={(name, val) => setSelectedGender(val)}
  inline
  required
  size="medium"
/>

<Modal/>
<DateTimePicker
  label="Start Date & Time"
  name="startDate"
  //value={startDate}
 //onChange={(name, val) => setStartDate(val)}
  required
  showTime
  size="small"
/>

<DateTimePicker
  label="End Date"
  name="endDate"
  //value={endDate}
  //onChange={(name, val) => setEndDate(val)}
  showTime={false}
/>

<Modal
  title="Confirmation"
  //show={showModal}
  //onClose={() => setShowModal(false)}
 // onSave={handleSave}
  content="Are you sure you want to proceed?"
  size="sm"
  closeText="No"
  saveText="Yes"
/>
<Tab/>



<Table
  columns={columns}
  data={data}
  actions={actions}
  onRowDoubleClick={(row) => console.log("Row double-click", row)}
/>;


    </div>
  );
};

export default SamplePage;
