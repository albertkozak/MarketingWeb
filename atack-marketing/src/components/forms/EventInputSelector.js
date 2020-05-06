import React, { useState } from "react";
import Select from "react-dropdown-select";

const EventInputSelector = (props) => {
  const [events, setEvents] = useState([]);

  function isSetEvents(value) {
    setEvents(value);
    console.log(events);
  }

  return (
    <Select
      multi
      //create
      placeholder="Select event(s)"
      //onCreateNew={(item) => console.log('%c New item created ', item)}
      options={props.data.map((data) => ({
        label: data.eventName,
        value: data.eventId,
      }))}
      values={[]}
      onChange={(value) => isSetEvents(value)}
    />
  );
};

EventInputSelector.propTypes = {};

export default EventInputSelector;
