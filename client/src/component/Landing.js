import React from "react";
import { Link } from "react-router-dom";
import "../landing.css";
function Landing() {
  return (
    <div className="landing_app">
     
        <Link
          to="/register"
          style={{
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
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
          }}
          className="btn"
        >
          Log In
        </Link>
      
    </div>
  );
}

export default Landing;
