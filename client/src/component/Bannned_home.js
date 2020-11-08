import React, { useEffect } from "react";
import { GET_ERRORS } from "../actions/types";
import { useDispatch } from "react-redux";
import "../Bannned_home.css";

function Bannned_home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }, []);

  return (
    <div className="ban">
      <div className="scene">
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <span className="bg-403">403</span>
        <div className="text">
          <span className="hero-text"></span>
          <span className="msg">
            Your <span>account</span> get baned.
          </span>
          <span className="support">
            <span>unexpected?</span>
            <a href="/contact">contact support</a>
          </span>
        </div>
        <div className="lock"></div>
      </div>
    </div>
  );
}

export default Bannned_home;
