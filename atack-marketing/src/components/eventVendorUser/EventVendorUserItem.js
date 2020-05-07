import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const EventVendorUserItem = (props) => {
  const user = props.user;
  const eventVendorId = props.eventVendorId;
  const [isShown, setIsShown] = useState(false);
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";

  const EVENTVENDOR_URL = BASE_URL + "EventVendorUser/remove/";
  const history = useHistory();

  async function removeEventVendorUser(event) {
    event.preventDefault();
    let JWToken = await firebase.auth().currentUser.getIdTokenResult();

    if (JWToken !== null) {
      const result = await fetch(EVENTVENDOR_URL, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWToken.token}`,
        },
        body: JSON.stringify({
          eventVendorId: eventVendorId,
          userEmailToModify: user.userEmail,
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
      className="eventVendorUserItem"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <p className="userName">{user.userEmail}</p>
      {isShown && (
        <div className="icons">
          <FontAwesomeIcon
            className="delete"
            icon={faTimes}
            onClick={removeEventVendorUser}
          />
        </div>
      )}
    </div>
  );
};

export default EventVendorUserItem;
