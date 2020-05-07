import React from "react";
import VenueList from "../components/venue/VenueList";
import { useHistory } from "react-router-dom";

const Venue = (props) => {
  const history = useHistory();
  return (
    <div className="container">
      <button className="venueButton" onClick={() => history.push("/addvenue")}>
        Create Venue
      </button>
      <VenueList />
    </div>
  );
};

export default Venue;
