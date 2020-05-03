import React from "react";
import Select from "react-dropdown-select";

export default function EventOrganizerInputSelector(props) {
  const options = props.users.map(eo => ({
    value: eo,
    label: eo.email
  }));

  return (
    <Select
      multi
      //Create
      placeholder="Add event organizer(s)"
      options={options}
      onChange={props.handleEOSelect}
    />
  );
}
