import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";

function MyNavbar() {
  return (
    <>
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className=" p-3 fixed-top "
        >
          <Container>
            <Navbar.Brand>Welcome</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link to="/home" className="h6">
                  Home
                </Nav.Link>
                <NavLink to="/logout" className="h6" onClick={()=>{
                  console.log("logout");
                }}>
                  Logout
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default MyNavbar;
