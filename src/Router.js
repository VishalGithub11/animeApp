import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./auth/Signup";
import SignIn from "./auth/Signin";
import Dashboard from "./Dashboard/Dashboard";
import AnimeInfo from "./Dashboard/AnimeInfo";

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/anime/:id" exact component={AnimeInfo} />
      </Switch>
    </Router>
  );
};

export default Routers;
