import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/nav-logo.png';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../screens/authentication/Auth';
import Logout from '../components/Logout';
import firebase from '../firebase'
import {BASE_URL} from '../Config'

const NavComponent = (props) => {
	const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState([])
	const [isShown, setIsShown] = useState(false)
	const [isEOShown, setIsEOShown] = useState(false)
	const [isAdmin, setAdmin] = useState(false)
    const [isEO, setEO] = useState(false)
    const [isVendor, setVendor] = useState(false)


	useEffect(() => {
		if (Object.keys(user).length > 0) {
			fetchUserRole();
			renderViews();
		}
	  	}, [user])

	  function fetchUserRole() {
		if(currentUser) {
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
			setUser(responseData);
			setAdmin(responseData.isAdmin)
			setEO(responseData.isEventOrganizer)
			setVendor(responseData.isVendor)
			console.log(responseData);
			});
		  });
		}
	  }

	  function renderViews() {
		  console.log(user)
		  if(isAdmin === true) {
			setIsShown(true)
		  }
		  else if (isEO === true) {
			  setIsEOShown(true)
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
							<li>
								<Link to="/roles">Roles</Link>
							</li>
						)}
						{isShown || isEOShown && (
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
