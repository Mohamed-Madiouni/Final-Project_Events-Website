import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import jwt_decode from "jwt-decode";
import setAuthToken from "../token/authtoken";

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
          <h4>
            <b>Hey there,</b> {localStorage.token && auth.user.fname}
          </h4>
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
      </div>
    </div>
  );
}

export default Dashboard;
