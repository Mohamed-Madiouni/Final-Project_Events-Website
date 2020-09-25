import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import "../landing.css";
import setAuthToken from "../token/authtoken";

function Landing() {
  const auth = useSelector((state) => state.auth);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(JSON.parse(localStorage));
  useEffect(() => {
    if (!localStorage.token) auth.isAuthenticated = false;
  });

  const onLogoutClick = (e) => {
    e.preventDefault();
    // Remove token from local storage
    localStorage.removeItem("token");
    // Remove auth header for future requests
    setAuthToken(false);
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="landing_app">
        <Link
          to="/dashboard"
          style={{
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            display: !localStorage.token ? "none" : "inline",
          }}
          className="btn"
        >
          Dashbord
        </Link>

        <Link
          to="/register"
          style={{
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            display: localStorage.token ? "none" : "inline",
          }}
          className="btn"
        >
          Register
        </Link>

        <Link
          to="/login"
          style={{
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            display: localStorage.token ? "none" : "inline",
          }}
          className="btn"
        >
          LogIn
        </Link>

        <Link
          to="/myaccount"
          style={{
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            display: !localStorage.token ? "none" : "inline",
          }}
          className="btn"
        >
          Account
        </Link>

        <Link
          to="/"
          style={{
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            display: !localStorage.token ? "none" : "inline",
          }}
          className="btn"
          onClick={onLogoutClick}
        >
          Disconnect
        </Link>
      </div>
    </>
  );
}

export default Landing;
