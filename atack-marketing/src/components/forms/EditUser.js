import React, { useState } from "react";
import firebase from "../../firebase";

const EditUser = (props) => {
  const user = props.location.state.user;
  const initialValue = props.location.state.user.isAdmin;
  const [isAdmin, setIsAdmin] = useState(!user.isAdmin);
  const [checked, setIsChecked] = useState(initialValue);

  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/User/";

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
    setIsChecked(!checked);
    console.log("is admin: " + isAdmin);
    console.log("is checked: " + checked);
    if (isAdmin) {
      elevateUser();
    } else {
      demoteUser();
    }
    return;
  };

  const elevateUser = async () => {
    const userEmail = user.email;

    let JWToken = await (await firebase.auth().currentUser.getIdTokenResult())
      .token;

    if (JWToken !== null) {
      const result = await fetch(BASE_URL + "elevate", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWToken}`,
        },
        body: JSON.stringify({
          userEmailToModify: userEmail,
        }),
      });
      if (result.status === 200) {
        return;
      } else {
        alert("Error: Something went wrong, please try again.");
      }
    }
  };

  const demoteUser = async () => {
    const userEmail = user.email;

    let JWToken = await (await firebase.auth().currentUser.getIdTokenResult())
      .token;

    if (JWToken !== null) {
      const result = await fetch(BASE_URL + "demote", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWToken}`,
        },
        body: JSON.stringify({
          userEmailToModify: userEmail,
        }),
      });
      if (result.status === 200) {
        return;
      } else {
        alert("Error: Something went wront, please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h3 className="adminLabel">Admininstrative Access:</h3>
      <div className="userContainer">
        <p className="userName">{user.email}</p>

        <div className="switchContainer">
          <label className="switch">
            <input type="checkbox" checked={checked} onChange={handleToggle} />
            <div className="slider"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
