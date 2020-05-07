import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";
import { withRouter } from "react-router-dom";

const EventList = (props) => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [search, setSearch] = useState("");
  const user = props.user;
  const isAdmin = user.isAdmin;
  const isEO = user.isEventOrganizer;
  const isVendor = user.isVendor;
  const [passingUser, setPassingUser] = useState([])

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      fetchData();
      setPassingUser(user)
    }
  }, [user]);

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
        });
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
              setFetchedEvents(responseData.eventsOrganizing);
            });
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
        });
    }
  };

  function handleSearchTerm(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="wrapper">
      <SearchBar
        search={search}
        handleSearchTerm={(e) => handleSearchTerm(e)}
        value={search}
      />
      {fetchedEvents.length === 0 ? (
        <p>You don't have any events.</p>
      ) : (
        <div>
          {fetchedEvents
            .filter((event) =>
              event.eventName.toLowerCase().includes(search.toLowerCase())
            )
            .map((event) => (
              <EventItem key={event.eventId} event={event} user={user} />
            ))}
        </div>
      )}
    </div>
  );
};

export default withRouter(EventList);
