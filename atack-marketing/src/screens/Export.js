import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import EventInputSelector from "../components/forms/EventInputSelector";

const Export = () => {
  const [report, setReport] = useState([]);
  const [event, setEvent] = useState([]);
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
            setReport(responseData.subscribers);
            setEvent(responseData);
          });
      });
  };

  useEffect(() => {
    console.log(report);
    fetchData();
  }, []);

  return (
    <div className="container">
      {/* <h1>Event Name: {event.eventName}</h1>
      <h2>Event Id: {event.eventId}</h2>

      {report.map((item) => {
        return <p>User Email: {item.userEmail}</p>;
      })} */}
      <EventInputSelector data={event} />
    </div>
  );
};

export default Export;
