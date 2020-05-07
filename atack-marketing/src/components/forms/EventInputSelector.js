import React, { useState } from "react";
import Select from "react-dropdown-select";
import firebase from "../../firebase";

const EventInputSelector = props => {
  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/Reports/subscribers";
  // const [event, setEvent] = useState([]);

  // const [events, setEvents] = useState([]);
  // var isSelected = false;

  // const isSetEvents = (value) => {
  //   setEvents(value);
  // };

  // const handleChange = (value) => {
  //   isSetEvents(value);
  //   firebase
  //     .auth()
  //     .currentUser.getIdTokenResult()
  //     .then((tokenResponse) => {
  //       fetch(BASE_URL, {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${tokenResponse.token}`,
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((responseData) => {
  //           setEvent(responseData);
  //         });
  //     });
  // };

  return (
    <Select
      placeholder="Select event(s)"
      options={props.data.map(data => ({
        label: data.eventName + " - " + data.vendorName,
        value: data.eventVendorId
      }))}
      onChange={props.handleSelect}
    />
  );
};

export default EventInputSelector;
