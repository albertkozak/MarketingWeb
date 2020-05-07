import React, { useContext } from "react";
import logo from "../assets/nav-logo.png";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../screens/authentication/Auth";
import Logout from "../components/Logout";

const NavComponent = () => {
  const { currentUser } = useContext(AuthContext);

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
            {/* <li>
              <Link to="/qrcode">QR Code</Link>
            </li> */}
            <li>
              <Link to="/roles">Roles</Link>
            </li>
            <li>
              <Link to="/vendors">Vendors</Link>
            </li>
            <li>
              <Link to="/venues">Venues</Link>
            </li>
            <li>
              <Link to="/export">Export</Link>
            </li>
            {/* <li>
              <Link to="/Profile">Profile</Link>
            </li> */}
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
