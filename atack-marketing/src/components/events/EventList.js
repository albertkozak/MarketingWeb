import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";
import { useHistory } from "react-router-dom";

const EventList = (props) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Events";
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedEvents, setSearchedEvents] = useState("");

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
            setFetchedEvents(responseData.events);
          });
        setSearchedEvents(
          fetchedEvents.filter((event) => {
            return event.eventName.toLowerCase().includes(search.toLowerCase());
          })
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let eventData;
  if (search.length === 0) {
    eventData = fetchedEvents;
  } else {
    eventData = searchedEvents;
  }

  return (
    <div className="wrapper">
      <SearchBar
        search={search}
        onTermChange={(newSearch) => setSearch(newSearch)}
        onTermSubmit={() => fetchData()}
      />
      {eventData.map((event) => (
        <EventItem key={event.eventId} event={event} />
      ))}
    </div>
  );
};

export default EventList;
