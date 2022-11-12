import React, { useRef } from "react";
import { Input } from "reactstrap";

const DropDown = (props) => {
  return (
    <Input
      onChange={(e) => props.handleChange(e, props.reference)}
      // style={{ marginRight: "10px" }}
      type="select"
    >
      <option value={null} selected={true}>
        Select a {props.type}
      </option>
      {props.data.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </Input>
  );
};

export default DropDown;
