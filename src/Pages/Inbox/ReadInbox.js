import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

function ReadInbox() {
  const { mailid } = useParams();
  const inbox = useSelector((state) => state.inbox.inboxArr);
  const mail = inbox.find((email) => email.id === mailid);
  return (
    <>
      <Container className="m-4">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <div>{`From:${mail.from}`}</div>
            <div>{`Sent On:${mail.date}`}</div>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle>{mail.subject}</Card.Subtitle>
            <div dangerouslySetInnerHTML={{ __html: mail.body }}></div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ReadInbox;
