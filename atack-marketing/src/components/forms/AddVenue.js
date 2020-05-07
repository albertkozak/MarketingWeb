import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const AddVenue = (props) => {
  const [venueName, setVenueName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/Venues/add";
  const history = useHistory();

  const checkForPassedVenueName = () => {
    let name;
    if (props.location.state !== undefined) {
      name = props.location.state.venueName;
      setVenueName(name);
    }
  };

  useEffect(() => {
    checkForPassedVenueName();
  }, []);

  const createVenue = async (event) => {
    event.preventDefault();
    const { venueName, website } = event.target.elements;

    if (venueName.value === "" || website.value === "") {
      setErrorMessage("Please fill all required fields");
    } else {
      setErrorMessage("");

      let JWToken = await (await firebase.auth().currentUser.getIdTokenResult())
        .token;
      if (JWToken !== null) {
        const result = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWToken}`,
          },
          body: JSON.stringify({
            venueName: venueName.value,
            website: website.value,
          }),
        });
        if (result.status === 201) {
          history.goBack();
        } else if (result.status === 400) {
          alert("Venue already exists");
        } else {
          alert("Error: Something went wrong, please try again");
        }
        document.getElementById("add-venue-form").reset();
      }
    }
  };

  const clearForm = (event) => {
    event.preventDefault();
    setVenueName("");
    document.getElementById("add-venue-form").reset();
  };

  return (
    <div className="container">
      <h1 className="addVenueName">Add Venue</h1>
      <div className="venueForm">
        <p className="form-error">{errorMessage}</p>
        <form
          onSubmit={createVenue}
          id="add-venue-form"
          className="addVenueForm"
        >
          <input
            onChange={(event) => {
              setVenueName(event.target.value);
            }}
            value={venueName}
            name="venueName"
            type="text"
            placeholder="Venue Name"
          />

          <input name="website" type="text" placeholder="Website" />

          <div className="buttons">
            <button className="submit" variant="" type="submit">
              Add Venue
            </button>
            <button className="cancel" onClick={clearForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVenue;
