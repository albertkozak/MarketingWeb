import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import VenueInputSelector from "./VenueInputSelector";
import firebase from "../../firebase";
import { BASE_URL } from "../../Config";

export default function AddEvent() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const [fetchedVenues, setFetchedVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);

  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setstartTime] = useState("");

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
            setFetchedVenues(
              responseData.map((venue, index) => ({
                value: venue.venueId,
                label: venue.venueName
              }))
            );
          });
      });
  }

  useEffect(() => {
    fetchVenues();
  }, []);

  async function createEvent(event) {
    event.preventDefault();

    //Parse Date
    var eventDateParsed = new Date(`${startDate}T${startTime}`);
    var eventNameTrimmed = eventName.trim();

    //Validate Other Fields
    if (
      eventNameTrimmed.length === 0 ||
      selectedVenue.length === 0 ||
      isNaN(eventDateParsed.getTime())
    ) {
      setErrorMessage("Please fill all required fields");
    } else {
      setErrorMessage("");

      let JWToken = await firebase.auth().currentUser.getIdTokenResult();

      if (JWToken !== null) {
        const result = await fetch(BASE_URL + "Events/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWToken.token}`
          },
          body: JSON.stringify({
            eventName: eventNameTrimmed,
            eventStartDateTime: eventDateParsed,
            venueId: selectedVenue[0].value
          })
        });

        if (result.status === 201) {
          history.push("/");
        } else {
          alert("Error: Something went wrong, please try again");
        }
      }
    }
  }

  //Form Handlers
  function cancelButton(event) {
    event.preventDefault();
    history.push("/");
  }

  function handleVenueSelect(selection) {
    setSelectedVenue(selection);
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
          <input
            name="eventName"
            type="text"
            placeholder="Title"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
          />
          <input
            name="eventStartDate"
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <input
            name="eventStartTime"
            type="time"
            placeholder="Start Time"
            value={startTime}
            onChange={e => setstartTime(e.target.value)}
          />
          <div className="input-selector">
            <VenueInputSelector
              options={fetchedVenues}
              values={selectedVenue}
              handleVenueSelect={handleVenueSelect}
            />
          </div>
          <div className="buttons">
            <button className="submit" variant="" type="submit">
              Add Event
            </button>
            <button className="cancel" onClick={cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
