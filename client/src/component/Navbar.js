import React from "react";
import "../navbar.css";
import Landing from "./Landing";
import { Link } from "react-router-dom";

function Navbar({navsearch}) {
  return (
    <div className="test">
      <div className="div2">
        <div
          style={{
            fontSize: "30px",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <img src="coco2.png" alt="COCO PARTY" width="250px" />
            {/* <span className="red-text">CoCo</span>
            <span className=" purple-text">PaRtY</span> */}
          </Link>
        </div>
        <div className="div4">
          <input
            type="text"
            // onChange={(e) => setInp(e.target.value)}
            className="inp"
            placeholder="Search events"
          />
          <i
            className="fa fa-search"
            style={{
              fontSize: "25px",
              position: "absolute",
              right: "30px",
              top: "25px",
              transform: "translate(15px,-12.5px)",
            }}
          ></i>
        </div>
        <div className="div3">
          <button className="btn waves-effect waves-light"  onClick={()=>navsearch(true)}>Advanced Search</button>
        </div>
      </div>
      <div className="landing">
        <Landing />
      </div>
    </div>
  );
}

export default Navbar;
