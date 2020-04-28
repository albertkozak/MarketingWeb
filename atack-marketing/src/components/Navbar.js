import React, { useContext } from 'react';
import logo from '../assets/nav-logo.png';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../screens/authentication/Auth'

const NavComponent = () => {
	const { currentUser } = useContext(AuthContext)
	console.log("from nav" + currentUser)

	return (
		<div className="NavContainer">
		{(!currentUser) ? (
			null
		) : (
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
				<li>
					<Link to="/qrcode">QR Code</Link>
				</li>
				<li>
					<Link to="/roles">Roles</Link>
				</li>
				<li>
					<Link to="/export">Export</Link>
				</li>
				{/* </div> */}
				{/* <div className="nav-auth"> */}
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/Profile">Profile</Link>
				</li>
			</ul>
		</header>
		)}
		</div>
	);
};

export default withRouter(NavComponent);
