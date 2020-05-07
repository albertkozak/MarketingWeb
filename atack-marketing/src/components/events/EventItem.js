import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const EventItem = (props) => {
  const event = props.event;
  console.log("from event list")
  console.log(event)
  const user = props.user;
  const eventVendorUserEvents = props.eventVendorUserEvents
  const formattedDate = new Date(event.eventStartDateTime)
    .toISOString()
    .slice(0, 10);
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
      console.log(event)
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
      <p className="eventStartDateTime">{formattedDate}</p>
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
