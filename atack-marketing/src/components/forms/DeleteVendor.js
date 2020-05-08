import React from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const DeleteVendor = (props) => {
  const currentVendor = props.location.state.vendor;
  const id = props.location.state.id;
  const history = useHistory();

  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/VendorManagement/";

  const deleteVendor = async (e) => {
    let JWToken = await (await firebase.auth().currentUser.getIdTokenResult())
      .token;

    if (JWToken !== null) {
      const result = await fetch(BASE_URL + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWToken}`,
        },
        body: JSON.stringify({
          confirmDeleteName: "ConfirmDELETE - " + currentVendor.name,
        }),
      });
      if (result.status === 200) {
        window.location.href = "/vendors";
      } else if (result.state === 400) {
        alert(
          "Cannot delete at this time. Vendor may be attached to an event."
        );
      } else {
        alert("Error: Something went wrong, please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="addVendorTitle">Delete {currentVendor.name}?</h1>
      <div className="vendorFormDelete">
        <input placeholder={currentVendor.name} />
        <input placeholder={currentVendor.description} />
        <input placeholder={currentVendor.email} />
        <input placeholder={currentVendor.website} />

        <div className="buttons">
          <button
            className="submit"
            onClick={(e) =>
              window.confirm("Are you sure you wish to delete this vendor?") &&
              deleteVendor()
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

export default DeleteVendor;
