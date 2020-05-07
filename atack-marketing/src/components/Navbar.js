import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/nav-logo.png';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../screens/authentication/Auth';
import Logout from '../components/Logout';

const NavComponent = (props) => {
	const { currentUser } = useContext(AuthContext);
	const user = props.user;
	const [isShown, setIsShown] = useState(false)
	const [isEOShown, setIsEOShown] = useState(false)
	const [refreshComponent, setRefreshComponent] = useState(false)

	function renderViews() {
		if(user === undefined) {
			setRefreshComponent(true)
		} else if(user.isAdmin) {
			setIsShown(true)
		} else if(user.isEventOrganizer) {
			setIsEOShown(true)
		}
		console.log("from nav")
		console.log(user)
	}

	useEffect(() => {
		//if (Object.keys(user).length > 0) {
		renderViews();
		setRefreshComponent(false)
	// }
}, [user])

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
						{/* <div className="nav-menu"> */}
						<li>
							<Link to="/home">Home</Link>
						</li>
						{/* <li>
							<Link to="/qrcode">QR Code</Link>
						</li> */}
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
