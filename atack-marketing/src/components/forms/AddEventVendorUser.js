import React, { useState, useEffect } from "react";
import UserInputSelector from "./UserInputSelector";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

const AddEventVendorUser = (props) => {
  const eventVendorId = props.location.state.eventVendorId;
  const vendorName = props.location.state.vendorName;
  const eventName = props.location.state.eventName;
  const [selectedUser, setSelectedUser] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [currentEVUs, setCurrentEVUs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshComponent, setRefreshComponent] = useState(false);
  const history = useHistory();
  const BASE_URL = "https://atackmarketingapi.azurewebsites.net/api/";

  const EVENTVENDOR_URL = BASE_URL + "EventVendorUser";

  const getAllUsers = () => {
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
            setFetchedUsers(
              responseData.map((user, index) => ({
                value: user.email,
                label: user.email,
              }))
            );
            console.log(responseData);
            console.log(fetchedUsers);
          });
      });
  };

  const getCurrentEventVendorUsers = () => {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then((tokenResponse) => {
        fetch(EVENTVENDOR_URL + "/" + eventVendorId, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`,
          },
        })
          .then((response) => response.json())
          .then((responseData) => {
            setCurrentEVUs(responseData.vendorUsers);
            console.log(currentEVUs);
          });
      });
  };

  useEffect(() => {
    getAllUsers();
    getCurrentEventVendorUsers();
    setRefreshComponent(false);
  }, [refreshComponent]);

  async function addEventVendorUser(event) {
    event.preventDefault();
    // console.log(selectedUser[0].value)
    // console.log(EVENTVENDOR_URL)

    //Validate
    if (selectedUser.length === 0) {
      setErrorMessage("Please select a user.");
    } else {
      setErrorMessage("");

      console.log("hi from post call");
      console.log(selectedUser[0].value);
      console.log(eventVendorId);

      let JWToken = await firebase.auth().currentUser.getIdTokenResult();

      console.log(JWToken.token);

      if (JWToken !== null) {
        const result = await fetch(EVENTVENDOR_URL + "/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWToken.token}`,
          },
          body: JSON.stringify({
            eventVendorId: eventVendorId,
            userEmailToModify: selectedUser[0].value,
          }),
        });
        if (result.status === 200) {
          setRefreshComponent(true);
        } else if (result.status === 400) {
          setErrorMessage("User is already added for this event.");
        } else if (result.status === 403) {
          setErrorMessage("User cannot be added at this time");
        } else {
          alert("Error: Something went wrong, please try again");
        }
      }
    }
  }

  function handleUserSelect(selection) {
    setSelectedUser(selection);
  }

  function cancelButton(event) {
    event.preventDefault();
    history.goBack();
  }

  return (
    <div className="container">
      <h1 className="eventVendorUserTitle">
        {vendorName}'s Users for {eventName}
      </h1>
      <p className="goBack" onClick={cancelButton}>
        Go Back to Event
      </p>
      <p className="form-error">{errorMessage}</p>
      <div className="input-selector">
        <UserInputSelector
          options={fetchedUsers}
          values={selectedUser}
          handleUserSelect={handleUserSelect}
        />
      </div>
      <div className="buttons evu">
        <button className="submit" onClick={addEventVendorUser}>
          Add User
        </button>
        <button className="cancel" onClick={cancelButton}>
          Cancel
        </button>
      </div>
      <div className="currentevu">
        {currentEVUs.length === 0 ? (
          <p className="nullText">No users have been added yet.</p>
        ) : (
          <ul className="evuList">
            {currentEVUs.map((evu) => (
              <li key={evu.useerEmail}>{evu.userEmail}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddEventVendorUser;
