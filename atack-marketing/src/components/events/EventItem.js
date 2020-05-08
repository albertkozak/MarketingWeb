import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import * as moment from "moment-timezone";

const EventItem = (props) => {
  const event = props.event;
  const user = props.user;
  const eventVendorUserEvents = props.eventVendorUserEvents
  const [eventVendorId, setEventVendorId] = useState(null)

    function checkIfVendorForEvent() {
      if (eventVendorUserEvents != null) {
      eventVendorUserEvents.map(evue => {
        if(evue.eventId === event.eventId) {
          setEventVendorId(evue.eventVendorId)
        }
      })
    }
  }

    useEffect(()=> {
      checkIfVendorForEvent();
    })


  return (
    <div className="eventItem">
      <Link
        to={{
          pathname: "/event",
          state: { event, user, eventVendorId },
        }}
      >
        <h3 className="eventTitle">{event.eventName}</h3>
      </Link>
      <p className="eventStartDateTime">            {moment
              .utc(event.eventStartDateTime)
              .local()
              .format("l")}</p>
      <div className="edit-del-links">
        <Link
          to={{
            pathname: "/event",
            state: { event, user, eventVendorId },
          }}
        >
          <p>View Event</p>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
