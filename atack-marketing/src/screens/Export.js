import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import EventInputSelector from "../components/forms/EventInputSelector";

const Export = (props) => {
  const [event, setEvent] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/Reports/subscribers";

  const fetchData = () => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setEvent(responseData);
          });
      });
  };

  useEffect(() => {
    fetchData();
    setRefreshComponent(false);
  }, [refreshComponent]);

  function handleEventSelect(selection) {
    setSelectedEvent(selection);
  }

  return (
    <div className="container">
      <EventInputSelector data={event} />
    </div>
  );
};

export default Export;
