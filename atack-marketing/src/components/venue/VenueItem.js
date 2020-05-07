import React from "react";
import { Link } from "react-router-dom";

const VenueItem = (props) => {
  const venue = props.venue;

  return (
    <div className="venueItem">
      <Link
        to={{
          pathname: "/viewvenue",
          state: { venue },
        }}
      >
        <h3 className="venueTitle">{venue.venueName}</h3>
      </Link>
      <div className="edit-del-links">
        <Link
          to={{
            pathname: "/viewvenue",
            state: { venue },
          }}
        >
          <p className="editVenue">View Venue</p>
        </Link>
      </div>
    </div>
  );
};

export default VenueItem;
