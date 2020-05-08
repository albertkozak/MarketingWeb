import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const AddVendor = (props) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const BASE_URL =
    "https://atackmarketingapi.azurewebsites.net/api/VendorManagement/AddVendor";
  const history = useHistory();

  const checkForPassedName = () => {
    let vendorName;
    if (props.location.state !== undefined) {
      vendorName = props.location.state.vendorName;
      setName(vendorName);
    }
  };

  useEffect(() => {
    checkForPassedName();
  }, []);

  const createVendor = async (event) => {
    event.preventDefault();
    const { name, description, email, website } = event.target.elements;

    let nameTrimmed = name.value.trim()
    let descriptionTrimmed = description.value.trim()
    let emailTrimmed = email.value.trim()
    let websiteTrimmed = website.value.trim()


    if (nameTrimmed === "") {
      setErrorMessage("Please fill all required fields.");
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
            name: nameTrimmed,
            description: descriptionTrimmed,
            email: emailTrimmed,
            website: websiteTrimmed,
          }),
        });
        if (result.status === 201) {
          history.push('/vendors')
        } else if (result.status === 400) {
          alert("Vendor already exists.");
        } else {
          alert("Error: Something went wrong, please try again.");
        }
      }
    }
  };

  const clearForm = (event) => {
    event.preventDefault();
    setName("");
    history.goBack();
  };

  return (
    <div className="container">
      <h1 className="addVendorName">Add Vendor</h1>
      <div className="vendorForm">
        <p className="form-error">{errorMessage}</p>
        <form
          onSubmit={createVendor}
          id="add-vendor-form"
          className="addVendorForm"
        >
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            name="name"
            type="text"
            placeholder="Vendor"
          />
          <input name="description" type="text" placeholder="Description" />
          <input name="email" type="text" placeholder="Email" />
          <input name="website" type="text" placeholder="Website" />
          <div className="buttons">
            <button className="submit" variant="" type="submit">
              Add Vendor
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

export default AddVendor;
