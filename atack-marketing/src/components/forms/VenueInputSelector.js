import React from "react";
import Select from "react-dropdown-select";
import { useHistory } from "react-router-dom";

export default function VenueInputSelector(props) {
  const history = useHistory();

  function addVenue(venueName) {
    history.push("/addvenue", { venueName: venueName.value });
  }

  return (
    <Select
      create
      placeholder="Add/Select A Venue"
      onCreateNew={item => addVenue(item)}
      searchable
      searchBy="label"
      name="venueId"
      options={props.options}
      value={props.value}
      onChange={props.handleVenueSelect}
    />
  );
}
