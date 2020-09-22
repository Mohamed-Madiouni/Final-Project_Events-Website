import React, { useEffect } from 'react';
import './App.css';
import Register from "./component/Register"
import Login from "./component/Login"
import {Route,Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./token/authtoken";
import { setCurrentUser, logoutUser } from "./actions/authaction";
import PrivateRoute from "./component/privateroute";
import Dashboard from "./component/Dashboard";
import store from "./store"
import Test from './component/Navbar';
import Home from './component/Home';

// Check for token to keep user logged in

  


function App() {
  useEffect(()=>{
    if (localStorage.token) {
  // Set auth token header auth
  const token = localStorage.token;
  setAuthToken(token);
    }
  })
  
  return (
    <div className="App">
    <div className="App_center">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          
              <PrivateRoute exact  path="/dashboard" component={Dashboard} />
            </Switch>
            </div>
    </div>
  );
}

export default App;
