import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";
import { useHistory } from "react-router-dom";

const EventList = (props) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedEvents, setSearchedEvents] = useState("");
  const isAdmin = props.isAdmin
  const isEO = props.isEO
  const isVendor = props.isVendor


  const fetchData = () => {
    if (isAdmin) {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL + "Events", {
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
      console.log(isAdmin)
      console.log(isEO)
      console.log(isVendor)
    } else if (isEO) {
      firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL + "/EventOrganizer", {
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
    } else if (isVendor) {
      firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL + "EventVendorUser", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setFetchedEvents(responseData.userEventVendors);
          });
        setSearchedEvents(
          fetchedEvents.filter((event) => {
            return event.eventName.toLowerCase().includes(search.toLowerCase());
          })
        );
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.readyForData]);

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
      {eventData.length === 0 ? (
        <p>You don't have any events.</p>
      ) : (
        <div>
            {eventData.map((event) => (
              <EventItem key={event.eventId} event={event} />
           ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
