import React, { useEffect, useState } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import ComposeMail from "../../Pages/Compose_Mail/ComposeMail";
import Inbox from "../../Pages/Inbox/Inbox";
import axios from "axios";
import { InboxActions } from "../../Store/Inbox-slice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  // console.log("home");
  const myemail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");
  // const data = useSelector((state) => state.inbox.inboxArr);
  const noOfUnreadMessages = useSelector(
    (state) => state.inbox.totalUnreadMessages
  );
  const dispatch = useDispatch();
  const [showCompose, setShowCompose] = useState(false);
  const [showInbox, setShowInbox] = useState(true);
  const [showSentBox, setShowSentBox] = useState(false);
  let [inboxArr, setInboxArr] = useState([]);
  let [sentBoxArr, setSentBoxArr] = useState([]);
  const getData = async () => {
    let count = 0;
    const res = await axios.get(
      `https://mailbox-be742-default-rtdb.firebaseio.com/${myemail}.json`
    );
    console.log(res);

    let Arr = [];
    for (const key in res.data) {
      Arr.push({
        id: key,
        subject: res.data[key].sub,
        body: res.data[key].emailBody,
        from: res.data[key].from,
        date: res.data[key].sentAt,
        read: res.data[key].read,
      });
      if (res.data[key].read === false) {
        count += 1;
      }
    }
    setInboxArr(Arr);
    dispatch(InboxActions.addMails(Arr));
    dispatch(InboxActions.noOfUnreadMessages(count));
  };
  const showSentBoxHandler = () => {
    getSentMails();
    dispatch(InboxActions.changetoSentBox());
    setShowInbox(false);
    setShowCompose(false);
    setShowSentBox(true);
  };
  const getSentMails = async () => {
    const res = await axios.get(
      `https://mailbox-be742-default-rtdb.firebaseio.com/sentbox/${myemail}.json`
    );
    console.log(res);
    let sentArr = [];
    for (const key in res.data) {
      // console.log(res.data[key]);
      // sentArr.push(res.data[key]);
      const obj = {
        id: key,
        subject: res.data[key].sub,
        body: res.data[key].emailBody,
        to: res.data[key].to,
        date: res.data[key].sentAt,
      };
      sentArr.push({ ...obj });
    }
    setSentBoxArr(sentArr);
    dispatch(InboxActions.addtoSentBox(sentArr));

    console.log(sentArr);
  };

  const showComposeMail = () => {
    setShowCompose(true);
    setShowInbox(false);
    setShowSentBox(false);
  };
  const hideComposeMail = () => {
    setShowCompose(false);
  };
  const showInboxHandler = async () => {
    dispatch(InboxActions.changetoInbox());
    setShowInbox(true);
    setShowSentBox(false);
    setShowCompose(false);
    // getData();
  };
  useEffect(() => {
    getData();
    dispatch(InboxActions.changetoInbox());
    getSentMails();
  }, []);
  return (
    <>
      <Container>
        <div className="d-flex justify-content-around m-4 ">
          <Button variant="warning" onClick={showComposeMail}>
            Compose Mail
          </Button>
          <Button variant="danger" onClick={showInboxHandler}>
            Inbox<Badge className="py-2 mx-1">{noOfUnreadMessages}</Badge>
          </Button>
          <Button variant="success" onClick={showSentBoxHandler}>
            Sent Items
          </Button>
        </div>
      </Container>
      {showCompose && <ComposeMail hideCompose={hideComposeMail} />}
      {showInbox && <Inbox inbox={inboxArr} getdata={getData} />}
      {showSentBox && <Inbox inbox={sentBoxArr} getdata={getSentMails}></Inbox>}
    </>
  );
}

export default Home;
