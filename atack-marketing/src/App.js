import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import NavComponent from "./components/NavComponent";
import TabTwo from "./screens/TabTwo";
import Register from "./screens/Register";
import Login from "./screens/Login";

function App() {
  return (
    <Router>
      <NavComponent />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tabTwo" component={TabTwo} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
