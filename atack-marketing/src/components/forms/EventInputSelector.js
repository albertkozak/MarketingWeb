import React from "react";
import Select from "react-dropdown-select";

const EventInputSelector = (props) => {
  return (
    <Select
      placeholder="Select event"
      options={props.data.map((data) => ({
        label: data.eventName + " - " + data.vendorName,
        value: data.eventVendorId,
      }))}
      onChange={props.handleSelect}
    />
  );
};

export default EventInputSelector;
