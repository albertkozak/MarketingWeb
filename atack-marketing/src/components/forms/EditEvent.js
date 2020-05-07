import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import VenueInputSelector from "./VenueInputSelector";
import firebase from "../../firebase";

import * as moment from "moment-timezone";

import { BASE_URL } from "../../Config";

export default function AddEvent(props) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const [fetchedVenues, setFetchedVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);

  const [eventId, setEventId] = useState(0);
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setstartTime] = useState("");

  useEffect(() => {
    if (props.location.state === undefined) {
      history.push("/");
    } else {
      fetchVenues();
      let currentEvent = props.location.state.currentEvent;
      setEventId(currentEvent.eventId);
      setEventName(currentEvent.eventName);
      setStartDate(
        moment.utc(currentEvent.eventStartDateTime).local().format("yyyy-MM-DD")
      );
      setstartTime(
        moment.utc(currentEvent.eventStartDateTime).local().format("HH:mm")
      );
      setSelectedVenue([
        {
          value: currentEvent.venue.venueId,
          label: `${currentEvent.venue.venueName}`,
        },
      ]);
    }
  }, []);

  function fetchVenues() {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL + "Venues", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setFetchedVenues(
              responseData.map((venue) => ({
                value: venue.venueId,
                label: venue.venueName,
              }))
            );
          });
      });
  }

  async function updateEvent(event) {
    event.preventDefault();

    var eventDateParsed = new Date(`${startDate}T${startTime}`);
    var eventNameTrimmed = eventName.trim();

    if (
      eventNameTrimmed.length === 0 ||
      selectedVenue.length === 0 ||
      isNaN(eventDateParsed.getTime())
    ) {
      setErrorMessage("Please fill all required fields.");
    } else {
      setErrorMessage("");

      let JWToken = await firebase.auth().currentUser.getIdTokenResult();

      if (JWToken !== null) {
        const result = await fetch(BASE_URL + `Events/update/${eventId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWToken.token}`,
          },
          body: JSON.stringify({
            eventName: eventNameTrimmed,
            eventStartDateTime: eventDateParsed,
            venueId: selectedVenue[0].value,
          }),
        });

        if (result.status === 200) {
          await fetch(BASE_URL + `Events/${eventId}`, {
            METHOD: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${JWToken.token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => history.push("/event", { event: data }));
        } else {
          alert("Error: Something went wrong, please try again.");
        }
      }
    }
  }

  function cancelButton(event) {
    event.preventDefault();
    history.goBack();
  }

  function handleVenueSelect(selection) {
    setSelectedVenue(selection);
  }

  return (
    <div className="container">
      <h1 className="addEventTitle">Edit Event</h1>
      <div className="eventForm">
        <form
          onSubmit={updateEvent}
          id="add-event-form"
          className="addEventForm"
        >
          <p className="form-error">{errorMessage}</p>
          <input
            name="eventName"
            type="text"
            placeholder="Title"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <input
            name="eventStartDate"
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            name="eventStartTime"
            type="time"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setstartTime(e.target.value)}
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
              Update
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
