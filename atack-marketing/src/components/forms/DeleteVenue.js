import React from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const DeleteVenue = (props) => {
  const currentVenue = props.location.state.venue;
  const id = props.location.state.id;
  const history = useHistory();

  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/Venues/remove/";

  const deleteVenue = async (e) => {
    let JWToken = await (await firebase.auth().currentUser.getIdTokenResult())
      .token;
    console.log(JWToken);

    if (JWToken !== null) {
      const result = await fetch(BASE_URL + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWToken}`,
        },
        body: JSON.stringify({
          confirmDeleteVenue: "ConfirmDELETE - " + currentVenue.venueName,
        }),
      });
      console.log(currentVenue.venueName);
      if (result.status === 200) {
        window.location.href = "/venues";
      } else if (result.state === 400) {
        alert("Cannot delete at this time. Venue may be in use for an event.");
      } else {
        alert("Error: Something went wrong, please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="addVendorTitle">Delete {currentVenue.venueName}?</h1>
      <div className="vendorFormDelete">
        <input placeholder={currentVenue.venueName} />
        <input placeholder={currentVenue.website} />

        <div className="buttons">
          <button
            className="submit"
            onClick={(e) =>
              window.confirm("Are you sure you wish to delete this venue?") &&
              deleteVenue()
            }
          >
            Delete
          </button>

          <button
            className="cancel"
            variant=""
            type="submit"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVenue;
