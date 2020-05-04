import React, { useState } from "react";

const AddVenue = props => {
  //const venueNameValue = props.venueName;
  const venueNameValue = props.location.state.venueName;
  const [venueName, setVenueName] = useState(venueNameValue);
  console.log(venueNameValue);

  const createVenue = async venue => {
    venue.preventDefault();
    const { venueName, venueWebsite } = venue.target.elements;

    // Add POST Request here
    alert(`POST-request: ${venueName.value} ${venueWebsite.value}`);
  };

  const clearForm = event => {
    event.preventDefault();
    document.getElementById("add-venue-form").reset();
  };

  return (
    <div className="container">
      <h1 className="addVenueName">Add Venue</h1>
      <div className="venueForm">
        <form
          onSubmit={createVenue}
          id="add-venue-form"
          className="addVenueForm"
        >
          <input
            onChange={event => {
              setVenueName(event.target.value);
            }}
            value={venueName}
            name="venueName"
            type="text"
            placeholder="Venue Name"
          />
          <input name="venueWebsite" type="text" placeholder="Website" />
          <div className="buttons">
            <button className="submit" variant="" type="submit">
              Add Venue
            </button>
            <button className="cancel" onClick={clearForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVenue;
