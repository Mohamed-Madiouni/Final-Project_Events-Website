import React, { useState } from "react";
import "../navbar.css";
import Landing from "./Landing";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { INI_SEARCH } from "../actions/types";

function Navbar() {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  return (
    <div className="test row">
      <div className="div2 col s10 row">
        <div
          style={{
            padding: "0px",
          }}
          className="col s3"
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <img
              src="coco2.png"
              alt="COCO PARTY"
              width="100%"
              height="100%"
              style={{
                paddingTop: "7px",
              }}
            />
          </Link>
        </div>
        <div className="div4 col s6">
          <i
            className="fa fa-search col s2 "
            style={{
              fontSize: "25px",
              cursor: "pointer",
            }}
            onClick={() =>
              dispatch({
                type: INI_SEARCH,
                payload: !search.etat,
              })
            }
          ></i>
        </div>
        <div className="div3 col s3">
          <Link
            to="/dashboard"
            style={{
              display: !localStorage.token ? "none" : "inline",
              padding: 0,
              width: "90%",
              borderRadius: "3px",
              letterSpacing: "1.5px",
            }}
            className="btn "
          >
            Dashbord
          </Link>
        </div>
      </div>
      <div className="landing col s2">
        <Landing />
      </div>
    </div>
  );
}

export default Navbar;
