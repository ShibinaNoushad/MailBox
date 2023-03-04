import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../Store/auth-slice";

function MyNavbar() {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const logoutHandler = () => {
    console.log(log);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    dispatch(authActions.logoutHandler());
    console.log(log);

    history.replace("/");
  };
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
                <Nav.Link className="h6" onClick={logoutHandler}>
                  Logout
                </Nav.Link>
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
