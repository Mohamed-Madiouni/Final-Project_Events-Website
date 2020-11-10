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
    <div class="ban">
      <div class="scene">
        <div class="overlay"></div>
        <div class="overlay"></div>
        <div class="overlay"></div>
        <div class="overlay"></div>
        <span class="bg-403">403</span>
        <div class="text">
          <span class="hero-text"></span>
          <span class="msg">
            Your <span>account</span> get baned.
          </span>
          <span class="support">
            <span>unexpected?</span>
            <a href="/contact">contact support</a>
          </span>
        </div>
        <div class="lock"></div>
      </div>
    </div>
  );
}

export default Bannned_home;
