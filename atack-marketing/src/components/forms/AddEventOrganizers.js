import React, { useState, useEffect } from "react";
import UserInputSelector from "./UserInputSelector";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const AddEventOrganizers = (props) => {
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
          });
      });
  };

  useEffect(() => {
    getAllEOs();
  }, []);

  async function addEventOrganizers(event) {
    event.preventDefault();

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
            .then((data) => history.push("/event", { event: data, user: props.location.state.user }));
        } else if (result.status === 400) {
          setErrorMessage("User is already an organizer for this event.");
        } else if (result.status === 403) {
          setErrorMessage(
            "User cannot be added as an event organizer at this time."
          );
        } else {
          alert("Error: Something went wrong, please try again.");
        }
      }
    }
  }

  function handleUserSelect(selection) {
    setSelectedEO(selection);
  }

  function cancelButton(event) {
    event.preventDefault();
    history.goBack();
  }

  return (
    <div className="container-organizers">
      <h1>Event Organizers for {eventName}</h1>
      <p className="form-error">{errorMessage}</p>
      <div className="input-selector">
        <UserInputSelector
          options={fetchedEOs}
          values={selectedEO}
          handleUserSelect={handleUserSelect}
        />
      </div>
      <div className="buttons">
        <button className="submit" onClick={addEventOrganizers}>
          Add Event Organizer
        </button>
        <button className="cancel" onClick={cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEventOrganizers;
