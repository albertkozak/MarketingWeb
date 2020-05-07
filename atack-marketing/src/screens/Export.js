import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import EventInputSelector from "../components/forms/EventInputSelector";

const Export = () => {
  const [event, setEvent] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [subscriberData, setSubscriberData] = useState(null);

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

  const fetchSubscriberList = (eventVendorId) => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL + `/${eventVendorId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setSubscriberData(responseData);
            console.log(responseData);
          });
      });
  };

  function handleSelect(event) {
    setSelectedEvent(event);
    fetchSubscriberList(event[0].value);
    console.log(event);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-export">
      <h1>Export</h1>
      {event.length === 0 || event === undefined || event === null ? (
        <p></p>
      ) : (
        <EventInputSelector
          data={event}
          selectedEvent={selectedEvent}
          handleSelect={handleSelect}
        />
      )}
      {subscriberData && (
        <div>
          <h3>
            {subscriberData.eventName} - {subscriberData.vendorName}
          </h3>
          {subscriberData.subscribers.map((subscriber, index) => {
            return <p key={index}>{subscriber.userEmail}</p>;
          })}
          {subscriberData.subscribers.length === 0 && <p>No Subscribers</p>}
        </div>
      )}
    </div>
  );
};

export default Export;
