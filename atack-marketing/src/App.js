import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import NavComponent from "./components/NavComponent";
import TabTwo from "./screens/TabTwo";

function App() {
  return (
    <Router>
      <NavComponent />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tabTwo" component={TabTwo} />
      </Switch>
    </Router>
  );
}

export default App;
