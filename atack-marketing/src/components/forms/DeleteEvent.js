import React from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const DeleteEvent = (props) => {
  const currentEvent = props.location.state.currentEvent;
  const history = useHistory();

  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";

  const deleteEvent = async (e) => {
    let JWToken = await (await firebase.auth().currentUser.getIdTokenResult())
      .token;

    if (JWToken !== null) {
      const id = currentEvent.eventId;
      const result = await fetch(BASE_URL + "Events/remove/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWToken}`,
        },
        body: JSON.stringify({
          deleteConfirmation: "ConfirmDELETE - " + currentEvent.eventName,
        }),
      });
      if (result.status === 200) {
        window.location.href = "/";
      } else {
        alert("Error: Something went wrong, please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="deleteEventTitle">Delete {currentEvent.eventName}?</h1>
      <div className="eventFormDelete">
        <input placeholder={currentEvent.eventName} />
        <input placeholder={Date(currentEvent.eventStartDateTime)} />
        <input placeholder={currentEvent.venue.venueName} />

        <div className="buttons">
          <button
            className="submit"
            onClick={(e) =>
              window.confirm("Are you sure you wish to delete this event?") &&
              deleteEvent()
            }
          >
            Delete
          </button>

          <button
            className="cancel"
            variant=""
            type="submit"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEvent;
