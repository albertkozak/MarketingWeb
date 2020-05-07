import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";
import firebase from "../../firebase";
import SearchBar from "../SearchBar";
import { withRouter } from "react-router-dom";

const EventList = props => {
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [search, setSearch] = useState("");
  // const [searchedEvents, setSearchedEvents] = useState("");
  // const [refreshComponent, setRefreshComponent] = useState(true);
  const user = props.user;
  console.log(user)
  const isAdmin = user.isAdmin;
  const isEO = user.isEventOrganizer;
  const isVendor = user.isVendor;

  // console.log(Object.keys(user).length);
  // console.log(isAdmin);

  useEffect(() => {
    console.log("Maybe Fetch?");
    if (Object.keys(user).length > 0) {
      console.log("==> FETCHYROO TIME! <==");
      fetchData();
    }
  }, [user]);

  // function goFetchData() {
  //   if (user === undefined) {
  //     setRefreshComponent(true);
  //   } else {
  //     fetchData();
  //     console.log("fetching");
  //     setRefreshComponent(false);
  //   }
  // }

  const fetchData = () => {
    // console.log("first check");
    if (isAdmin) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(tokenResponse => {
          fetch(BASE_URL + "Events", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${tokenResponse.token}`
            }
          })
            .then(response => response.json())
            .then(responseData => {
              setFetchedEvents(responseData.events);
              console.log(responseData);
            });
          // setSearchedEvents(
          //   fetchedEvents.filter((event) => {
          //     return event.eventName.toLowerCase().includes(search.toLowerCase());
          //   })
          // );
        });
      console.log(isAdmin);
      console.log(isEO);
      console.log(isVendor);
    } else if (isEO) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(tokenResponse => {
          fetch(BASE_URL + "/EventOrganizer", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${tokenResponse.token}`
            }
          })
            .then(response => response.json())
            .then(responseData => {
              setFetchedEvents(responseData.events);
            });
          // setSearchedEvents(
          //   fetchedEvents.filter((event) => {
          //     return event.eventName.toLowerCase().includes(search.toLowerCase());
          //   })
          // );
        });
    } else if (isVendor) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(tokenResponse => {
          fetch(BASE_URL + "EventVendorUser", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${tokenResponse.token}`
            }
          })
            .then(response => response.json())
            .then(responseData => {
              setFetchedEvents(responseData.userEventVendors);
            });
          // setSearchedEvents(
          //   fetchedEvents.filter((event) => {
          //     return event.eventName.toLowerCase().includes(search.toLowerCase());
          //   })
          // );
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
        handleSearchTerm={e => handleSearchTerm(e)}
        value={search}
      />
      {fetchedEvents.length === 0 ? (
        <p>You don't have any events.</p>
      ) : (
        <div>
          {fetchedEvents
            .filter(event =>
              event.eventName.toLowerCase().includes(search.toLowerCase())
            )
            .map(event => (
              <EventItem key={event.eventId} event={event} />
            ))}
        </div>
      )}
    </div>
  );
};

export default withRouter(EventList);
