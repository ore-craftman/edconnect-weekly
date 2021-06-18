import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [userFirstName, setUserFirstName] = useState(null);
  let uid = "";
  let allCookiesSeperated = document.cookie.split(";");

  allCookiesSeperated.forEach((singleCookieString) => {
    if (singleCookieString.startsWith("uid"))
      uid = singleCookieString.split("=")[1];
  });
  if (uid !== "") {
    fetch(`/api/users/${uid}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `FETCH USER INFO BY UID STATUS CODE !200 but: ${response.status}`
          );
        }
      })
      .then((data) => {
        setUserFirstName(data.firstname);
      })
      .catch((err) => {
        console.error(err.message);
      });
  } else {
    console.log("User Logged Out State");
  }

  let history = useHistory();
  const logoutHandler = () => {
    document.cookie = `uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    history.push("/");
  };

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
      {userFirstName ? (
        <Nav>
          <Nav.Link href="/" onClick={logoutHandler} className="text-white">
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
