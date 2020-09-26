import React from "react";
import { Link} from "react-router-dom";
import {useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import "../landing.css";
import M from "materialize-css"



function Landing() {
  const dispatch = useDispatch();



  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="landing_app">
        

        <Link
          to="/register"
          style={{
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            display: localStorage.token ? "none" : "inline",
          }}
          className="btn waves-effect waves-light "
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


        <a
         href="#"
         data-target="slide-out" 
         className="sidenav-trigger btn"
          style={{
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            display: !localStorage.token ? "none" : "inline",
            
          }}
        >
          Account
        </a>

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
          LogOut
        </Link>
        
      </div>
    </>
  );
}

export default Landing;
