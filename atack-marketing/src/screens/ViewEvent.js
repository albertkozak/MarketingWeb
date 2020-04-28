import React from "react";
import EventList from "../components/events/EventList";

const ViewEvent = (props) => {
  const currentEvent = props.location.state.event;
  console.log(currentEvent);

  return (
    <div className="container">
      <div className="eventWrapper">
        <div className="eventHeader">
          {/* <h2>{currentEvent.event.eventName}</h2> */}
          <h2>{currentEvent.eventName}</h2>
          {/* <p>{props.eventStartDateTime}</p> */}
          <p>{Date(currentEvent.eventStartDateTime)}</p>
        </div>
        <p className="edit-del-links">Edit / Delete</p>
        {/* <p className="venue">Location: {props.venueName}</p> */}
        <p className="venue">{currentEvent.venue.venueName}</p>
        <div className="eventDetailsWrapper">
          <div className="eventOrganziersContainer">
            <h3 className="eventOrganizers">Event Organizers</h3>
            <ul className="eventOrganizersList"></ul>
          </div>
          <div className="eventVendorsContainer">
            <h3 className="eventVendors">Event Vendors</h3>
            <ul className="eventVendorsList"></ul>
          </div>
          <button
            className="addVendorButton"
            //onClick={() => history.push('/addvendor')}
          >
            Add Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
