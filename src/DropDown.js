import React, { useRef } from "react";

const DropDown = (props) => {
  return (
    <select
      onChange={(e) => props.handleChange(e, props.reference)}
      style={{ marginRight: "10px" }}
    >
      <option value={null} selected={true}>
        Select a {props.type}
      </option>
      {props.data.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
};

export default DropDown;
