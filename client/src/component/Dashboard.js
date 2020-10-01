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

function Dashboard({ history }) {
  const auth = useSelector((state) => state.auth);
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
  

  return (
    <div>
      <Navbar />

      <Organizer />
    </div>
  );
}

export default Dashboard;
