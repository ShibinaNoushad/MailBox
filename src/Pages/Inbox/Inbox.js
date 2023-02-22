import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Card, Col, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Inbox.module.css";

function Inbox(props) {
  
  let inboxMessages = props.inbox.map((email) => {
    console.log(email.read);
    return (
      <div key={email.id} className={classes.mainCard}>
        <div className={classes.card}>
          <Link className={classes.cardElements} to={`home/${email.id}`}>
            <Card.Body className={`d-flex justify-content-between`}>
              {/* <Form.Check readOnly type="checkbox" /> */}
              <p>{!email.read ? "🔵" : "⚪"}</p>
              <Card.Subtitle>{email.subject}</Card.Subtitle>
              <p> {email.from}</p>
              <Card.Text>{`${email.date}`}</Card.Text>
            </Card.Body>
          </Link>
        </div>
        <button type="button" className="btn btn-outline-danger ms-2">
          X
        </button>
      </div>
    );
  });

  return (
    <>
      <Container>
        <h3 className="m-5">Inbox</h3>

        <div className="mt-4">{inboxMessages}</div>
      </Container>
    </>
  );
}

export default Inbox;
