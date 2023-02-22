import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Home from "./Components/Home/Home";
import DisplayMessage from "./Pages/Inbox/DisplayMessage";
import ReadInbox from "./Pages/Inbox/ReadInbox";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <MyNavbar></MyNavbar>
      {isLoggedIn && <Redirect to="/home"></Redirect>}
      {!isLoggedIn && <Redirect to="/login"></Redirect>}
      {/* <Route path="/home" exact>
        {isLoggedIn && <Redirect to="/home"></Redirect>}
        {!isLoggedIn && <Redirect to="/login"></Redirect>}
      </Route> */}

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/home" exact>
        {!isLoggedIn && <Redirect to="/login"></Redirect>}
        {isLoggedIn && <Home />}
      </Route>
      <Route path="/" exact>
        {isLoggedIn && <Redirect to="/home"></Redirect>}
        {!isLoggedIn && <Redirect to="/login"></Redirect>}
      </Route>
      <Route path="/home/:mailid">
        <ReadInbox />
      </Route>
    </>
  );
}

export default App;
