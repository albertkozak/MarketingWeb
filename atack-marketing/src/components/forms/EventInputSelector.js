import React, { useState } from "react";
import Select from "react-dropdown-select";

const EventInputSelector = (props) => {
  const [events, setEvents] = useState([]);

  const isSetEvents = (value) => {
    setEvents(value);
    console.log(events);
  };

  return (
    <Select
      placeholder="Select event(s)"
      options={props.data.map((data) => ({
        label: data.eventName + " - " + data.vendorName,
        value: data.eventId,
      }))}
      onChange={(value) => isSetEvents(value)}
    />
  );
};

export default EventInputSelector;
