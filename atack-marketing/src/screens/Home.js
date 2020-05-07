import React, { useState, useEffect } from "react";
import EventList from "../components/events/EventList";
import { useHistory } from "react-router-dom";
import { BASE_URL } from '../Config'
import firebase from "../firebase";

const Home = (props) => {
  const history = useHistory();
  const [userRole, setUserRole] = useState("");
  const [user, setUser] = useState([])
  const [admin, setAdmin] = useState(false);
  const [eo, setEO] = useState(false);
  const [vendor, setVendor] = useState(false);

  useEffect(() => {
    if(props.location.state.userRole === undefined) {
      fetchUserRole();
    } else {
      setUserRole(props.location.state.userRole)
    }
  })

  function fetchUserRole() {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(tokenResponse => {
        fetch(BASE_URL + "/User", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`
          }
        })
          .then(response => response.json())
          .then(responseData => {
            setUser(responseData)
          });
      });
  }

  return (
    <div className="container">
      {/* <h1>Home Page</h1> */}
      <button className="eventButton" onClick={() => history.push("/addevent")}>
        Create Event
      </button>
      <EventList />
    </div>
  );
};

export default Home;
