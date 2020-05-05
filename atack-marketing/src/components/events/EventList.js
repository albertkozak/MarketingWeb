import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";
import firebase from "../../firebase";

const EventList = (props) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events";
  const [fetchedData, setFetchedData] = useState([]);

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
            setFetchedData(responseData.events);
            console.log(fetchedData);
          });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      {fetchedData.map((event) => (
        <EventItem key={event.eventId} event={event} />
      ))}
    </div>
  );
};

export default EventList;
