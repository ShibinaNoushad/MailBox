import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Home from "./Components/Home/Home";
import ComposeMail from "./Pages/Compose_Mail/ComposeMail";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Switch>
      <Route path="/home">
        <Home />
        <ComposeMail></ComposeMail>
      </Route>
      {isLoggedIn && <Redirect to="/home"></Redirect>}
      <Route path="/" exact>
        <MyNavbar></MyNavbar>
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
