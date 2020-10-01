import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/authaction";
import jwt_decode from "jwt-decode";
import setAuthToken from "../token/authtoken";
import { getCurrentUser } from "../actions/authaction";
import { INI_UPDATE } from "../actions/types";

import Navbar from "./Navbar";
import Searchevents from "./Searchevents";

import Organizer from "./Organizer";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";
import { closeEvent, getEvent,endEvent } from "../actions/evntAction";

function Dashboard({ history }) {
  const auth = useSelector((state) => state.auth);
  const allevents= useSelector((state)=>state.events.allEvents)
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.token) history.push("/");
  });
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getCurrentUser());
    }
  },[]);
  useEffect(() => {
    if (auth.updated) {
      M.toast({ html: "SUCCESSFULLY UPDATED", classes: "green" });
      setTimeout(dispatch({ type: INI_UPDATE }), 4000);
    }
    M.Modal.init(document.querySelectorAll(".modal"))
  });
  
  //check if events ended
  useEffect(()=>{
    dispatch(getEvent())
    for(let i=0;i<allevents.length;i++){
      if( new Date(eventClosing(allevents[i].date,allevents[i].duration))<new Date())
      dispatch(endEvent(allevents[i]._id))
    }
  },[])

  return (
    <div>
      <Navbar />

      <Organizer />
    </div>
  );
}

export default Dashboard;
