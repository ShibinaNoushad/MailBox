import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

function ReadInbox() {
  const myemail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");
  const inboxState = useSelector((state) => state.inbox.inboxOrSentBox);

  const { mailid } = useParams();
  const inbox = useSelector((state) => state.inbox.inboxArr);
  const sentBox = useSelector((state) => state.inbox.sentBoxArr);
  let mail;
  if (inboxState === true) {
    mail = inbox.find((email) => email.id === mailid);
  }
  if (inboxState === false) {
    mail = sentBox.find((email) => email.id === mailid);
  }
  if (inboxState === true && mail.read === false) {
    try {
      const res = fetch(
        `https://mailbox-be742-default-rtdb.firebaseio.com/${myemail}/${mailid}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            read: true,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container className="m-4">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            {/* <div>{`From:${mail.from}`}</div> */}
            <div>{inboxState?`From:${mail.from}`:`To:${mail.to}`}</div>
            <div>{`${mail.date}`}</div>
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
