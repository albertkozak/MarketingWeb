import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
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
				<li>
					<a href="/Home">Home</a>
				</li>
				<li>
					<a href="/Events">Events</a>
				</li>
				<li>
					<a href="/Login">Login</a>
				</li>
				<li>
					<a href="/Register">Register</a>
				</li>
			</ul>
		</header>
	);
};

export default NavComponent;
