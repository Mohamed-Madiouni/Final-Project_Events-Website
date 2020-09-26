import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import { logoutUser } from "../actions/authaction";
import jwt_decode from "jwt-decode";
import setAuthToken from "../token/authtoken";

import Navbar from "./Navbar";
import Searchevents from "./Searchevents";

import Organizer from "./Organizer";
import M from "materialize-css"



function Dashboard({ history }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.token) history.push("/");
    M.Sidenav.init(document.querySelectorAll('.sidenav'))
    
  });



  return (
    <div>


	<Navbar/>

        <Organizer/>
       


        <ul id="slide-out" className="sidenav">
    <li><div className="user-view">
      <div className="background">
        <img src="background_profil.jpg" height="100%" width="100%"/>
      </div>
    <img className="circle" src={auth.user.avatar}/>
  <span className="white-text name">{auth.user.fname+" "+auth.user.lname}</span>
  <span className="white-text email">{auth.user.email}</span>
    </div>
    </li>
   
    <li><a href="/myaccount"><i className="material-icons">settings</i>Account Setting</a></li>
    <li><div className="divider"></div></li>
  </ul>
    </div>
  );
}

export default Dashboard;
