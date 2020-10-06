import React, { useState,useEffect } from "react";
import "../navbar.css";
import Landing from "./Landing";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { INI_SEARCH } from "../actions/types";

function Navbar() {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const location = useLocation()
  const [nav,setNav]=useState(true)
  const resize =useSelector(state=>state.resize)
  //  useEffect(()=>{
  //   window.addEventListener("resize",()=>{
  //     if(window.innerWidth<=992)
  //     setNav(false)
  //     else
  //     setNav(true)
  //   })
  // })
  return (
    <div className="navbar-fixed" style={{height:"60px"}}>
    <div className="test row">
      <div className="div2 col s10 l11 row">
       <div
          style={{
            padding: "0px",
            marginRight:10
          }}
          className={!resize.state?"col s2":"col s1"}
        >{ !resize.state?
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <img
              src="/coco2.png"
              alt="COCO PARTY"
              width="100%"
              height="100%"
              style={{
                paddingTop: "7px",
                paddingLeft:"5px"
              }}
            />
          </Link> : <a href="#" data-target="slide-out" className="sidenav-trigger" style={{paddingLeft:10,color:"black",display:"flex",alignItems:"center"}}><i className="material-icons">menu</i></a>}
        </div>
       
        <div className={!resize.state?"div4 col s10":" div4 col s11"}>
        {!resize.state?(<>
          <div className="col s11  nav_list" style={{display:"flex",justifyContent:"center",alignItems:"center",transform:"translateX(12px)"}}>
            <Link to="/" style={{color:location.pathname=="/"&&"rgb(14, 161, 152)"}}>Home</Link>
            <Link to="/dashboard" style={{color:location.pathname=="/dashboard"&&"rgb(14, 161, 152)"}}>Dashboard</Link>
            <Link to="/events" style={{color:location.pathname=="/events"&&"rgb(14, 161, 152)"}}>Events</Link>
          </div>
          <i
            className="fa fa-search col s1 "
            style={{
              fontSize: "21px",
              cursor: "pointer",
              paddingLeft:10
             

            }}
            onClick={() =>
              dispatch({
                type: INI_SEARCH,
                payload: !search.etat,
              })
            }
          ></i></>):( <><i
            className="fa fa-search col s1 "
            style={{
              fontSize: "21px",
              cursor: "pointer",
              paddingRight:10,
              marginLeft:0
             

            }}
            onClick={() =>
              dispatch({
                type: INI_SEARCH,
                payload: !search.etat,
              })
            }
          ></i><Link
            to="/"
            style={{
              textDecoration: "none",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              width:"100%"
            }}
          >
            <img
              src="/coco2.png"
              alt="COCO PARTY"
              width="180px"
              height="45px"
              style={{
                marginRight: "10px",
                
              }}
            />
          </Link></>)}
        </div>
        {/* <div className="div3 col s3 l2 ">
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
        </div> */}
      </div>
      <div className="landing col s2 l1" style={{
        margin:0
      }}>
        <Landing />
      </div>
    </div>
    </div>
  );
}

export default Navbar;
