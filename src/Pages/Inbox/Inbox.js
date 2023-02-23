import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Card, Col, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Inbox.module.css";

function Inbox(props) {
  console.log("inbox");
  
  const userEmail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");
  const inboxState = useSelector((state) => state.inbox.inboxOrSentBox);
  // console.log(inboxState);
  // const [id, setId] = useState("");
  const myemail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");
  const deleteMail = async (id) => {
    let url = `https://mailbox-be742-default-rtdb.firebaseio.com/${myemail}/${id}.json`;

    if (!inboxState) {
      url = `https://mailbox-be742-default-rtdb.firebaseio.com/sentbox/${userEmail}/${id}.json`;
    }
    await axios.delete(url);
    props.getdata();
  };
  let inboxMessages = props.inbox.map((email) => {
    return (
      <div key={email.id} className={classes.mainCard}>
        <div className={classes.card}>
          <Link className={classes.cardElements} to={`home/${email.id}`}>
            <Card.Body className={`d-flex justify-content-between`}>
              {/* <Form.Check readOnly type="checkbox" /> */}
              {inboxState && <p>{!email.read ? "🔵" : "⚪"}</p>}
              <Card.Subtitle>{email.subject}</Card.Subtitle>
              <p> {inboxState ? `From:${email.from}` : `To:${email.to}`}</p>
              <Card.Text>{`${email.date}`}</Card.Text>
            </Card.Body>
          </Link>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger py-0"
          onClick={() => {
            deleteMail(email.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <>
      <Container>
        <h3 className="m-5">{inboxState ? "Inbox" : "Sent Box"}</h3>

        <div className="mt-4">{inboxMessages}</div>
      </Container>
    </>
  );
}

export default Inbox;
