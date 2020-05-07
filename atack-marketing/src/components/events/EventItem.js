import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const EventItem = (props) => {
  const event = props.event;
  const user = props.user;
  const eventVendorUserEvents = props.eventVendorUserEvents
  const formattedDate = new Date(event.eventStartDateTime)
    .toISOString()
    .slice(0, 10);
  const [eventVendorId, setEventVendorId] = useState(null)

    console.log(eventVendorUserEvents)

    function checkIfVendorForEvent() {
      if (eventVendorUserEvents != null) {
      eventVendorUserEvents.map(evue => {
        console.log(evue.eventId)
        if(evue.eventId === event.eventId) {
          setEventVendorId(evue.eventVendorId)
        }
      })
    }
  }

  console.log(eventVendorId)

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
