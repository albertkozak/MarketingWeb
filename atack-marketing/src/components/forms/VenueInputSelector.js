import React from "react";
import Select from "react-dropdown-select";
import { useHistory } from "react-router-dom";

export default function VenueInputSelector(props) {
  const history = useHistory();

  function addVenue(venueName) {
    history.push("/addvenue", { venueName: venueName.value });
    // console.log(venueName.value);
  }

  const options = props.venues.map(venue => ({
    value: venue.venueId,
    label: venue.venueName
  }));

  return (
    <Select
      create
      placeholder="Add a venue"
      onCreateNew={item => addVenue(item)}
      searchable
      searchBy="label"
      name="venueId"
      options={options}
      onChange={props.handleVenueSelect}
    />
  );
}
