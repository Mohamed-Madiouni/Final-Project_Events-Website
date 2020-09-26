import React from "react";
import "../navbar.css";
import Landing from "./Landing";
import { Link } from "react-router-dom";

function Navbar({navsearch}) {
  return (
    <div className="test row">
      <div className="div2 col s10 row" >
        <div
          style={{
            padding:"0px",
            
          }}
          className="col s3"
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
             
                
             
            }}
          >
            <img src="coco2.png" alt="COCO PARTY" width="100%" height="100%" style={{
              paddingTop:"7px"
            }} />
            {/* <span className="red-text">CoCo</span>
            <span className=" purple-text">PaRtY</span> */}
          </Link>
        </div>
        <div className="div4 col s6" >
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
        <div className="div3 col s3" >
        <Link
          to="/dashboard"
          style={{
            display: !localStorage.token ? "none" : "inline",
            padding:0,
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
          }}
          className="btn "
        >
          Dashbord
        </Link>
          <button className="btn waves-effect waves-light"  style={{
            display: localStorage.token ? "none" : "inline"
          }} onClick={()=>navsearch(true)}>Advanced Search</button>
        </div>
      </div>
      <div className="landing col s2">
        <Landing />
      </div>
    </div>
  );
}

export default Navbar;
