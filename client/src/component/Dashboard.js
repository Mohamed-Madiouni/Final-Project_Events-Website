import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import jwt_decode from "jwt-decode";
import setAuthToken from "../token/authtoken";
import Organizer from "./Organizer";
import M from "materialize-css"



function Dashboard({ history }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.token) history.push("/");
  });

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div>
      <div>
        <div>
       

        

          <button
            style={{
              width: "150px",
              borderRadius: "3px",
            }}
            onClick={onLogoutClick}
            className="btn btn-large"
          >
            Logout
          </button>
          
        </div>

        <Organizer/>
       
      </div>
    </div>
  );
}

export default Dashboard;
