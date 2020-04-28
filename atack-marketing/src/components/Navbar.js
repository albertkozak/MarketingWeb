import React from 'react';
import logo from '../assets/nav-logo.png';
import { Link } from 'react-router-dom';

const NavComponent = () => {
	return (
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
					<Link to="/Home">Home</Link>
				</li>
				<li>
					<Link to="/QRCode">QR Code</Link>
				</li>
				<li>
					<Link to="/Roles">Roles</Link>
				</li>
				<li>
					<Link to="/Export">Export</Link>
				</li>
				{/* </div> */}
				{/* <div className="nav-auth"> */}
				<li>
					<Link to="/Login">Login</Link>
				</li>
				<li>
					<Link to="/Register">Register</Link>
				</li>
				<li>
					<Link to="/Profile">Profile</Link>
				</li>
			</ul>
		</header>
	);
};

export default NavComponent;
