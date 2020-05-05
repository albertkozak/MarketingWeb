import React from "react";
import Select from "react-dropdown-select";


export default function UserInputSelector(props) {

  return (
    <Select
      //multi
      searchable
      searchBy="label"
      name="userEmail"
      placeholder="Select event organizer(s)"
      options={props.options}
      value={props.values}
      onChange={props.handleUserSelect}
    />
  );
}
