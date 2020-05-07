import React, { useState, useEffect } from "react";
import EventList from "../components/events/EventList";
import { useHistory } from "react-router-dom";
import { BASE_URL } from '../Config'
import firebase from "../firebase";

const Home = (props) => {
  const history = useHistory();
  const [userRole, setUserRole] = useState("");
  //const [user, setUser] = useState([])
  // const [isAdmin, setAdmin] = useState(false);
  // const [isEO, setEO] = useState(false);
  // const [isVendor, setVendor] = useState(false);
  // const [userEmail, setUSerEmail] = useState('');
  const { state: user } = React.useContext(updateUserRole);
  

  useEffect(() => {
    fetchUserRole()
    const newUser = {
      ...user,
      isAdmin: user.isAdmin
    }
    // if(props.location.state.userRole === undefined || props.userRole === undefined || userRole === undefined) {
    //   fetchUserRole();
    // } else {
    //   setUserRole(props.location.state.userRole)
    // }
  }, [])

  const updateUserRole = async (user, dispatch) => {
    const result = await updateUser(user);
    if (result.success) {
      dispatch({type: "success"})
    } else {
      dispatch({type: "failure"})
    }

  }

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
            // setUser(responseData);
            // setUSerEmail(responseData.email);
            // setAdmin(responseData.isAdmin)
            // setEO(responseData.isEventOrganizer)
            // setVendor(responseData.isVendor)
            console.log(responseData);
          });
      });
  }

  return (
    <React.Fragment>
    <div className="container">
      <h1>{userEmail}</h1>
      <h1>{isAdmin.toString()}</h1>
      <h1>{isEO.toString()}</h1>
      <h1>{isVendor.toString()}</h1>
      <button className="eventButton" onClick={() => history.push("/addevent")}>
        Create Event
      </button>
      <EventList isAdmin={isAdmin} isEO={isEO} isVendor={isVendor} />
    </div>
    </React.Fragment>
  );
};

export default Home;
