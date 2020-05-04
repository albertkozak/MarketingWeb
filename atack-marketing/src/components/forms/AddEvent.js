import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import VenueInputSelector from "./VenueInputSelector";
import EventOrganizerInputSelector from "./EventOrganizerInputSelector";
import firebase from "../../firebase";

export default function AddEvent() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const [fetchedVenues, setFetchedVenues] = useState([]);
  // const [fetchedUsers, setFetchedUsers] = useState([]);

  const [selectedVenue, setSelectedVenue] = useState(0);
  // const [selectedEventOrganizers, setSelectedEventOrgainizers] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [startTime, setstartTime] = useState("");
  const [eventName, setEventName] = useState("");

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
            setFetchedVenues(
              responseData.map(venue => ({
                value: venue.venueId,
                label: venue.venueName
              }))
            );
          });
      });
  }

  // function fetchUsers() {
  //   firebase
  //     .auth()
  //     .currentUser.getIdTokenResult()
  //     .then(tokenResponse => {
  //       fetch(BASE_URL + "User/userlist", {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${tokenResponse.token}`
  //         }
  //       })
  //         .then(response => response.json())
  //         .then(responseData => {
  //           setFetchedUsers(responseData);
  //           // console.log(fetchedUsers);
  //         });
  //     });
  // }

  useEffect(() => {
    fetchVenues();
    // fetchUsers();
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
            venueId: selectedVenue.value
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
    //React Select Returns An Array So Get First Object
    setSelectedVenue(selection[0]);
  }

  // function handleEOSelect(selection) {
  //   console.log(selection);
  //   setSelectedEventOrgainizers(selection);
  // }

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
              value={selectedVenue}
              handleVenueSelect={handleVenueSelect}
            />
          </div>
          {/* <div className="input-selector">
            <EventOrganizerInputSelector
              users={fetchedUsers}
              value={selectedEventOrganizers}
              handleEOSelect={handleEOSelect}
            />
          </div> */}
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
