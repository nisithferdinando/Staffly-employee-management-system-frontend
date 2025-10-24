import React, { useState, useEffect } from "react";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "../../components/input/Dropdown";
import axiosInstance from "../../util/axiosInstance";
import Checkbox from "../../components/input/Checkbox";
import RadioButton from "../../components/input/RadioButton";
import DateTimePicker from "../../components/input/DateTimePicker";

const SamplePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    color: [],
    drop:[],
    date: "",
  });
  const [gender, setGender] = useState([]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getDropdown = async (keyValue) => {
    const response = await axiosInstance.get(`/key/key?key=${keyValue}`);
    return response.data.map((item) => ({
      key: item.value.toString(),
      value: item.value.toString(),
      label: item.valueName,
    }));
  };

  useEffect(() => {
    (async () => {
      const genderOptions = await getDropdown("gender");
      setGender(genderOptions);
    })();
  }, []);


  return (
    <div>
      <div className="flex gap-4">
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required={true}
          size=""
        />
        <Dropdown
          options={gender}
          name="gender"
          label="Gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <Checkbox
          label="Color"
          name="color"
          values={formData.color}
          options={gender}
          onChange={handleChange}
        />

       <RadioButton
       label="Drop"
       name="drop"
       value={formData.drop}
       options={gender}
       onChange={handleChange}
       />
      
      </div>
      <Button />
    </div>
  );
};

export default SamplePage;
