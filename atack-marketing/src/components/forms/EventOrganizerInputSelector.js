import React from "react";
import Select from "react-dropdown-select";
import { useHistory } from "react-router-dom";

export default function EventOrganizerInputSelector(props) {
  const history = useHistory();

  // let sortedUsers = props.allEOs.sort;
  // const options = props.allEOs.map((eo) => ({
  //   value: eo.email,
  //   label: eo.email
  // }));


  return (
    <Select
      //multi
      searchable
      searchBy="label"
      name="userEmail"
      placeholder="Select event organizer(s)"
      options={props.options}
      value={props.values}
      onChange={props.handleEOSelect}
    />
  );
}
