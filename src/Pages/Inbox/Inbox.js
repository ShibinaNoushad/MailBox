import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Card, Col, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Inbox.module.css";

function Inbox(props) {
  // const [id, setId] = useState("");
  const myemail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");
  const [del, setDel] = useState("Delete");
  const deleteMail = async (id) => {
    setDel("Deleting");
    await axios.delete(
      `https://mailbox-be742-default-rtdb.firebaseio.com/${myemail}/${id}.json`
    );
    setDel("Delete");
    props.getdata();

  };
  let inboxMessages = props.inbox.map((email) => {
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
        <button
          type="button"
          className="btn btn-outline-danger py-0"
          onClick={() => {
            deleteMail(email.id);
          }}
        >
          {del}
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
