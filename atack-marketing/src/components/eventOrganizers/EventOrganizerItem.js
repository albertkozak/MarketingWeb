import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import firebase from "../../firebase";

const EventOrganizerItem = (props) => {
  const eo = props.eo;
  const id = props.eventId;
  const [isShown, setIsShown] = useState(false);
  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/EventOrganizer/remove";

  async function removeEventOrganizer(event) {
    event.preventDefault();

    let JWToken = await firebase.auth().currentUser.getIdTokenResult();

    if (JWToken !== null) {
      const result = await fetch(BASE_URL, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWToken.token}`,
        },
        body: JSON.stringify({
          eventId: id,
          userEmailToModify: eo.userEmail,
        }),
      });
      if (result.status === 200) {
        props.handleChange();
      } else {
        alert("Error: Something went wrong, please try again.");
      }
    }
  }

  return (
    <div
      className="eoItem"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <p className="eoTitle">{eo.userEmail}</p>
      {isShown && (
        <FontAwesomeIcon
          className="delete"
          icon={faTimes}
          onClick={removeEventOrganizer}
        />
      )}
    </div>
  );
};

export default EventOrganizerItem;
