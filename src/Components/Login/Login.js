import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import "./Login.css";

function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [login, setLogin] = useState(false);
  const switchLogin = () => {
    setLogin((prev) => {
      return !prev;
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!login && password !== confirmPasswordRef.current.value) {
      alert("password not matching");
      return;
    }
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIRxfXaca4nLl-FKpAUMC4MvmsZWrzRfM ",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        console.log("loggedin");
      } else {
        console.log("failed");
        const data = await res.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="m-md-5 text-center">
      <Container className="  p-5 align-items-center bg-secondary">
        <h3 className="login">{!login ? "Sign Up" : "Login"}</h3>
        <Form>
          <Form.Group className="mb-3  mt-4">
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={passwordRef}
            />
          </Form.Group>
          {!login && (
            <Form.Group className="mb-3 ">
              <Form.Control
                type="password"
                placeholder=" Confirm Password"
                ref={confirmPasswordRef}
              />
            </Form.Group>
          )}

          <Button
            variant="primary"
            type="submit"
            onClick={loginHandler}
            className="m-2"
          >
            {!login ? "SignUp" : "Login"}
          </Button>
          {"  "}
          <Button variant="primary" type="button" onClick={switchLogin}>
            {!login ? "Login" : "SignUp"}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
