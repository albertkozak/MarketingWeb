import React from "react";
import Select from "react-dropdown-select";

const EventInputSelector = (props) => {
  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/Reports/subscribers";

  return (
    <Select
      placeholder="Select event(s)"
      options={props.data.map((data) => ({
        label: data.eventName + " - " + data.vendorName,
        value: data.eventVendorId,
      }))}
      onChange={props.handleSelect}
    />
  );
};

export default EventInputSelector;
