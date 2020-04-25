import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Events from "./screens/Events";
import Register from "./screens/Register";
import Login from "./screens/Login";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/Events">
          <Events />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Register">
          <Register />
        </Route>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
