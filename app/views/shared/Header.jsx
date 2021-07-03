import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = ({ userDetails }) => {
  let userFirstName = null;
  if (userDetails !== undefined) {
    userFirstName = userDetails.firstname;
  }

  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Navbar.Brand href="/">Project Explorer</Navbar.Brand>

      <form name="searchForm" className="form-inline">
        <input
          type="text"
          placeholder="Search Projects"
          className="form-control"
        />
        <button className="btn btn-outline-light mx-2">Search</button>
      </form>

      <Nav className="mr-auto">
        <Nav.Link href="projects/submit" className="text-white">
          Submit
        </Nav.Link>
      </Nav>
      {userFirstName != null ? (
        <Nav>
          <Nav.Link
            href="/logout"
            // onClick={logoutHandler}
            className="text-white"
          >
            logout
          </Nav.Link>
          <Nav.Link className="text-white">Hi, {userFirstName}</Nav.Link>
        </Nav>
      ) : (
        <Nav>
          <Nav.Link href="signup" className="text-white">
            Sign Up
          </Nav.Link>
          <Nav.Link href="login" className="text-white">
            Login
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};

export default Header;
