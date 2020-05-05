import React, { useState, useEffect } from "react";
import EventOrganizerInputSelector from "./EventOrganizerInputSelector";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const AddEventOrganizers = (props) => {
  //const currentEOs = props.location.state.fetchedEos;
  const eventId = props.location.state.currentEvent.eventId;
  const eventName = props.location.state.currentEvent.eventName;
  const [selectedEO, setSelectedEO] = useState([]);
  const [fetchedEOs, setFetchedEOs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";
  const history = useHistory();

  const getAllEOs = () => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(BASE_URL + "User/userlist", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setFetchedEOs(
              responseData.map((eo, index) => ({
                value: eo.email,
                label: eo.email,
              }))
            );
            console.log(responseData);
            console.log(fetchedEOs);
          });
      });
  };

  useEffect(() => {
    getAllEOs();
  });

  async function addEventOrganizers(event) {
    event.preventDefault();

    //Validate
    if (selectedEO.length === 0) {
      setErrorMessage("Please select an event organizer.");
    } else {
      setErrorMessage("");

      let JWToken = await firebase.auth().currentUser.getIdTokenResult();

      if (JWToken !== null) {
        const result = await fetch(BASE_URL + "EventOrganizer/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWToken.token}`,
          },
          body: JSON.stringify({
            eventId: eventId,
            userEmailToModify: selectedEO[0].value,
          }),
        });
        if (result.status === 201) {
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
        } else if (result.status === 400) {
          setErrorMessage("User is already an event organizer for this event.");
        } else if (result.status === 403) {
          setErrorMessage(
            "User cannot be added as an event organizer at this time"
          );
        } else {
          alert("Error: Something went wrong, please try again");
        }
      }
    }
  }

  function handleEOSelect(selection) {
    setSelectedEO(selection);
  }

  function cancelButton(event) {
    event.preventDefault();
    history.goBack();
  }

  return (
    <div className="container">
      <h1>Event Organizers for {eventName}</h1>
      <p className="form-error">{errorMessage}</p>
      <div className="input-selector">
        <EventOrganizerInputSelector
          options={fetchedEOs}
          values={selectedEO}
          handleEOSelect={handleEOSelect}
        />
      </div>
      {/* Add back if we can do multi post request */}
      {/* {selectedEO === null || selectedEO === undefined ? (
				<p className="nullText">No event organizers have been added yet.</p>
			) : (
				<ul className="eventOrganizersList">
				{selectedEO.map((eo) => (
					<EventOrganizerItem key={eo.value} eo={eo} />
				))}</ul>
			)} */}
      <div className="buttons">
        <button className="submit" onClick={addEventOrganizers}>
          Add User
        </button>
        <button className="cancel" onClick={cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEventOrganizers;
