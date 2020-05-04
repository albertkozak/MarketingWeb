import React from "react";
import Select from "react-dropdown-select";

export default function EventOrganizerInputSelector(props) {
  let sortedUsers = props.users.sort;
  const options = props.users.map((eo, index) => ({
    value: eo.email,
    label: eo.email
  }));

  return (
    <Select
      multi
      //Create
      placeholder="Add/Search event organizer(s)"
      options={options}
      value={props.value}
      onChange={props.handleEOSelect}
    />
  );
}
