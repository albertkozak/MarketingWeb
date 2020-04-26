import React from 'react';
import logo from '../assets/nav-logo.png';

const NavComponent = () => {
	return (
		<header className="header">
			<a href="/" className="logo">
				<img src={logo} alt="" />
			</a>
			<input className="menu-btn" type="checkbox" id="menu-btn" />
			<label className="menu-icon" htmlFor="menu-btn">
				<span className="navicon" />
			</label>
			<ul className="menu">
				{/* <div className="nav-menu"> */}
				<li>
					<a href="/Home">Home</a>
				</li>
				<li>
					<a href="/QRCode">QR Code</a>
				</li>
				<li>
					<a href="/Roles">Roles</a>
				</li>
				<li>
					<a href="/Export">Export</a>
				</li>
				{/* </div> */}
				{/* <div className="nav-auth"> */}
				<li>
					<a href="/Login">Login</a>
				</li>
				<li>
					<a href="/Register">Register</a>
				</li>
				{/* </div> */}
			</ul>
		</header>
	);
};

export default NavComponent;
