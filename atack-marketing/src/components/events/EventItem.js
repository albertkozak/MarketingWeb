import React from "react";
import { Link } from "react-router-dom";

const EventItem = (props) => {
  const event = props.event;
  const user = props.user
  const formattedDate = new Date(event.eventStartDateTime)
    .toISOString()
    .slice(0, 10);

  return (
    <div className="eventItem">
      <Link
        to={{
          pathname: "/event",
          state: { event },
        }}
      >
        <h3 className="eventTitle">{event.eventName}</h3>
      </Link>
      <p className="eventStartDateTime">{formattedDate}</p>
      <div className="edit-del-links">
        <Link
          to={{
            pathname: "/event",
            state: { event },
          }}
        >
          <p>View Event</p>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
