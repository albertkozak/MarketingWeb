import React, { useContext, useState, useEffect } from "react";
import logo from "../assets/nav-logo.png";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../screens/authentication/Auth";
import Logout from "../components/Logout";
import firebase from "../firebase";
import { BASE_URL } from "../Config";

const NavComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [isEOShown, setIsEOShown] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);

  useEffect(() => {
    fetchUserRole();
    setRefreshComponent(false);
  }, [refreshComponent]);

  function fetchUserRole() {
    if (currentUser) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then((tokenResponse) => {
          fetch(BASE_URL + "/User", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${tokenResponse.token}`,
            },
          })
            .then((response) => response.json())
            .then((responseData) => {
              setUser(responseData);
              if (responseData.isAdmin) {
                setIsShown(true);
              }
              if (responseData.isEventOrganizer) {
                setIsEOShown(true);
              }
              console.log(responseData);
            });
        });
    }
  }

  return (
    <div className="NavContainer">
      {currentUser ? (
        <header className="header">
          <Link to="/" className="logo">
            <img src={logo} alt="" />
          </Link>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon" />
          </label>
          <ul className="menu">
            <li>
              <Link to="/home">Home</Link>
            </li>
            {isShown && (
              <>
                <li>
                  <Link to="/roles">Roles</Link>
                </li>
                <li>
                  <Link to="/vendors">Vendors</Link>
                </li>
                <li>
                  <Link to="/venues">Venues</Link>
                </li>
              </>
            )}

            {isEOShown && (
              <>
                <li>
                  <Link to="/vendors">Vendors</Link>
                </li>
                <li>
                  <Link to="/venues">Venues</Link>
                </li>
              </>
            )}

            <li>
              <Link to="/export">Export</Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </header>
      ) : null}
    </div>
  );
};

export default withRouter(NavComponent);
