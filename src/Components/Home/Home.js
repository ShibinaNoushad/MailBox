import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import ComposeMail from "../../Pages/Compose_Mail/ComposeMail";
import Inbox from "../../Pages/Inbox/Inbox";
import axios from "axios";
import { InboxActions } from "../../Store/Inbox-slice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const myemail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");
  // const data = useSelector((state) => state.inbox.inboxArr);
  const dispatch = useDispatch();
  const [showCompose, setShowCompose] = useState(false);
  const [showInbox, setShowInbox] = useState(true);
  let [inboxArr, setInboxArr] = useState([]);
  const getData = async () => {
    const res = await axios.get(
      `https://mailbox-be742-default-rtdb.firebaseio.com/${myemail}.json`
    );
    //   .then((data) => {
    //     console.log(data);
    //   });
    let Arr = [];
    for (const key in res.data) {
      Arr.push({
        id: key,
        subject: res.data[key].sub,
        body: res.data[key].emailBody,
        from: res.data[key].from,
        date: res.data[key].sentAt,
      });
    }
    setInboxArr(Arr);
    dispatch(InboxActions.addMails(Arr));
  };

  const showComposeMail = () => {
    setShowCompose(true);
    setShowInbox(false);
  };
  const hideComposeMail = () => {
    setShowCompose(false);
  };
  const showInboxHandler = async () => {
    setShowInbox(true);

    setShowCompose(false);
    // const res = await axios.get(
    //   `https://mailbox-be742-default-rtdb.firebaseio.com/sendItems/${myemail}.json`
    // );
    // //   .then((data) => {
    // //     console.log(data);
    // //   });
    // let Arr = [];
    // for (const key in res.data) {
    //   Arr.push({
    //     id: key,
    //     subject: res.data[key].sub,
    //     body: res.data[key].emailBody,
    //     from: res.data[key].from,
    //     date: "1/12/2001",
    //   });
    // }
    // setInboxArr(Arr);
    // dispatch(InboxActions.addMails(Arr));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Container>
        <div className="d-flex justify-content-around m-4 ">
          <Button variant="warning" onClick={showComposeMail}>
            Compose Mail
          </Button>
          <Button variant="danger" onClick={showInboxHandler}>
            Inbox
          </Button>
          <Button variant="success">Sent Items</Button>
        </div>
      </Container>
      {showCompose && <ComposeMail hideCompose={hideComposeMail} />}
      {showInbox && <Inbox show={showInbox} inbox={inboxArr} />}
    </>
  );
}

export default Home;
