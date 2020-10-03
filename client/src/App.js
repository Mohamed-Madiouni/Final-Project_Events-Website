import React, { useEffect } from "react";
import "./App.css";
import Register from "./component/Register";
import Login from "./component/Login";
import Account from "./component/Account";
import { Route, Switch } from "react-router-dom";
import setAuthToken from "./token/authtoken";
import PrivateRoute from "./component/Privateroute";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Searchevents from "./component/Searchevents";
import { useSelector } from "react-redux";
import Organizer_events from "./component/Organizer_events";
import Searchresult from "./component/Searchresult";
import Events from "./component/Events";

function App() {
  const search = useSelector((state) => state.search);
  // Check for token to keep user logged in
  useEffect(() => {
    if (localStorage.token) {
      // Set auth token header auth
      const token = localStorage.token;
      setAuthToken(token);
    }
  });

  return (
    <div className="App">
      {search.etat ? (
        <Searchevents />
      ) : (
        <div className="App_center">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Searchresult} />
            <Route exact path="/events" component={Events} />

            <PrivateRoute path="/myaccount" component={Account} />

            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute
              path="/events/:organizer_id"
              component={Organizer_events}
            />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
