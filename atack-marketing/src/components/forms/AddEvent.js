import React, { useState, useEffect, useCallback } from "react";
import VenueInputSelector from "./VenueInputSelector";
import EventOrganizerInputSelector from "./EventOrganizerInputSelector";
import firebase from "../../firebase";

export default function AddEvent() {
  const [errorMessage, setErrorMessage] = useState("");

  const [fetchedVenues, setFetchedVenues] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectedEventOrganizers, setSelectedEventOrgainizers] = useState([]);

  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";

  // Add GET Request here for Venues & Event Organizers

  function fetchVenues() {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(tokenResponse => {
        fetch(BASE_URL + "Venues", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`
          }
        })
          .then(response => response.json())
          .then(responseData => {
            setFetchedVenues(responseData);
            // console.log(responseData);
            // console.log(fetchedVenues);
          });
      });
  }

  function fetchUsers() {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(tokenResponse => {
        fetch(BASE_URL + "User/userlist", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`
          }
        })
          .then(response => response.json())
          .then(responseData => {
            setFetchedUsers(responseData);
            // console.log(fetchedUsers);
          });
      });
  }

  useEffect(() => {
    fetchVenues();
    fetchUsers();
  }, []);

  async function createEvent(event) {
    event.preventDefault();
    const { eventName, eventStartDateTime, venueId } = event.target.elements;

    //Validation
    if (
      eventName.value === "" ||
      eventStartDateTime.value === "" ||
      selectedVenue === ""
    ) {
      setErrorMessage("Please fill all required fields");
    } else {
      setErrorMessage("");

      let JWToken = await (await firebase.auth().currentUser.getIdTokenResult())
        .token;
      if (JWToken !== null) {
        const result = await fetch(BASE_URL + "Events/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWToken}`
          },
          body: JSON.stringify({
            eventName: eventName.value,
            eventStartDateTime: eventStartDateTime.value,
            venueId: selectedVenue.value
          })
        });
        if (result.status === 201) {
          window.location.href = "/";
        } else {
          alert("Error: Something went wrong, please try again");
        }
        document.getElementById("add-event-form").reset();
      }
    }
  }

  //Form Handlers
  function clearForm(event) {
    event.preventDefault();
    document.getElementById("add-event-form").reset();
  }

  function handleVenueSelect(selection) {
    //React Select Returns An Array So Get First Object
    setSelectedVenue(selection[0]);
  }

  function handleEOSelect(selection) {
    console.log(selection);
    setSelectedEventOrgainizers(selection);
  }

  return (
    <div className="container">
      <h1 className="addEventTitle">Add Event</h1>
      <div className="eventForm">
        <form
          onSubmit={createEvent}
          id="add-event-form"
          className="addEventForm"
        >
          <p className="form-error">{errorMessage}</p>
          <input name="eventName" type="text" placeholder="Title" />
          <input
            name="eventStartDateTime"
            type="date"
            placeholder="Start Date"
          />
          <div className="input-selector">
            <VenueInputSelector
              venues={fetchedVenues}
              handleVenueSelect={handleVenueSelect}
            />
          </div>
          <div className="input-selector">
            <EventOrganizerInputSelector
              users={fetchedUsers}
              handleEOSelect={handleEOSelect}
            />
          </div>
          <div className="buttons">
            <button className="submit" variant="" type="submit">
              Add Event
            </button>
            <button className="cancel" onClick={clearForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
