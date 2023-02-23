import React, { useEffect, useState } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import ComposeMail from "../../Pages/Compose_Mail/ComposeMail";
import Inbox from "../../Pages/Inbox/Inbox";
import axios from "axios";
import { InboxActions } from "../../Store/Inbox-slice";
import { useDispatch, useSelector } from "react-redux";
let mycount = 0;


function Home() {
  const inbox = useSelector((state) => state.inbox.inboxArr);
  const sentBox = useSelector((state) => state.inbox.sentBoxArr);
  const myemail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");
  const noOfUnreadMessages = useSelector(
    (state) => state.inbox.totalUnreadMessages
  );
  const dispatch = useDispatch();
  const inboxState = useSelector((state) => state.inbox.inboxOrSentBox);
  const [showCompose, setShowCompose] = useState(false);
  const getData = async () => {
    let count = 0;
    const res = await axios.get(
      `https://mailbox-be742-default-rtdb.firebaseio.com/${myemail}.json`
    );
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
    let userInbox = [];
    for (let i = Arr.length - 1; i >= 0; i--) {
      userInbox.push(Arr[i]);
    }
    dispatch(InboxActions.addMails(userInbox));
    dispatch(InboxActions.noOfUnreadMessages(count));
    setTimeout(() => {
      getData();
      mycount = mycount + 1;
    }, 5000);
    console.log("getdata fun");
    console.log(count);
  };
  const showSentBoxHandler = () => {
    getSentMails();
    setShowCompose(false);
    dispatch(InboxActions.changetoSentBox());
  };
  const getSentMails = async () => {
    const res = await axios.get(
      `https://mailbox-be742-default-rtdb.firebaseio.com/sentbox/${myemail}.json`
    );
    let sentArr = [];
    for (const key in res.data) {
      const obj = {
        id: key,
        subject: res.data[key].sub,
        body: res.data[key].emailBody,
        to: res.data[key].to,
        date: res.data[key].sentAt,
      };
      sentArr.push({ ...obj });
    }
    let userSentBox = [];
    for (let i = sentArr.length - 1; i >= 0; i--) {
      userSentBox.push(sentArr[i]);
    }
    dispatch(InboxActions.addtoSentBox(userSentBox));
  };

  const showComposeMail = () => {
    setShowCompose(true);
  };
  const hideComposeMail = () => {
    setShowCompose(false);
  };
  const showInboxHandler = async () => {
    // getData();
    setShowCompose(false);
    dispatch(InboxActions.changetoInbox());
  };
  useEffect(() => {
    console.log("check");
    callInbox();
  }, []);
  const callInbox = async () => {
    await getData();
    console.log("getdata");
  };

  // let a = setTimeout(async () => {
  //   await getData();
  //   clearTimeout(a);
  //   console.log(a, "clear");
  // }, 5000);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-around m-4 ">
          <Button variant="warning" onClick={showComposeMail} type="button">
            Compose Mail
          </Button>
          <Button variant="danger" onClick={showInboxHandler} type="button">
            Inbox<Badge className="py-2 mx-1">{noOfUnreadMessages}</Badge>
          </Button>
          <Button variant="success" onClick={showSentBoxHandler} type="button">
            Sent Items
          </Button>
        </div>
      </Container>
      {showCompose && <ComposeMail hideCompose={hideComposeMail} />}
      {!showCompose && (
        <Inbox
          inbox={inboxState ? inbox : sentBox}
          // getdata={inboxState ? getData : getSentMails}
          getdata={getSentMails}
        ></Inbox>
      )}
      {/* {showInbox && <Inbox inbox={inboxArr} getdata={getData} />}
      {showSentBox && <Inbox inbox={sentBoxArr} getdata={getSentMails}></Inbox>} */}
    </>
  );
}

export default Home;
