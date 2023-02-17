import React from "react";
import "./Compose.css";
import { Form, Button, Card } from "react-bootstrap";
import { useRef, useState, useMemo } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
function ComposeMail() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const receiverEmailRef = useRef();
  const subjectRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const receiverEmail = receiverEmailRef.current.value;
    const receiverValidEmail = receiverEmail.replace("@", "").replace(".", "");
    const subject = subjectRef.current.value;
    const body = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
    const email = {
      from: localStorage.getItem("email"),
      to: receiverEmail,
      sub: subject,
      emailBody: body,
    };
    try {
      const Email = JSON.stringify(email);
      const res = await axios.post(
        `https://mailbox-be742-default-rtdb.firebaseio.com/sendItems/${receiverValidEmail}.json`,
        Email
      );
    } catch (error) {
      console.log(error);
    }

    // setEditorState("");
  };
  return (
    <>
      <div className="container">
        <Form className="forms" onSubmit={submitHandler}>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close "
              aria-label="Close"
            ></button>
          </div>
          <Form.Group className="mt-4 mb-2">
            <Form.Label>To,</Form.Label>
            <Form.Control
              type="email"
              placeholder="Recipients Email"
              required
              ref={receiverEmailRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subject :-</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject Line"
              required
              ref={subjectRef}
            />
          </Form.Group>
          <Card className="mt-4" style={{ height: "auto" }}>
            <Card.Body>
              <Editor
                placeholder="Start Composing from Here"
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </Card.Body>
          </Card>
          <Button type="submit" className="mt-2">
            Send Mail
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ComposeMail;
