import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link className="navbar-brand" to="/">
          Atack Marketing
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/Events">
              Events
            </Link>
          </Nav.Link>
        </Nav>
        <Nav pullRight>
          <Nav.Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavComponent;
