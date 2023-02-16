import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Welcome from "./Components/Welcome/Welcome";
function App() {
  return (
    <Switch>
      <Route path="/welcome">
        <Welcome></Welcome>
      </Route>
      <Route path="/" exact>
        <MyNavbar></MyNavbar>
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
