import React, { useState,useEffect } from "react";
import "../navbar.css";
import Landing from "./Landing";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { INI_SEARCH } from "../actions/types";

function Navbar() {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const auth =useSelector(state=>state.auth)
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
      <div className={!resize.state?"div2 col s10 row":"div3 col s8 row"}>
       <div
          style={{
            padding: "0px",
         margin:0,
            height:60
          }}
          className={!resize.state?"col s2":"col s1"}
        >{ !resize.state?
          
          
          <Link
            to="/"
            style={{
              textDecoration: "none",display:"flex",justifyContent:"center",height:60
            }}
          >
            <img
              src="/cocoEventtt.jpg"
              alt="COCO EVENT"
              width="80%"
              height="60px"
              style={{
                // paddingTop: "7px",
                // paddingLeft:"40px",
                cursor: "pointer"

              }}
            />
          </Link> : <a href="#" data-target="slide-out" className="sidenav-trigger" 
          style={{
          height:60,
          display:"flex",
          alignItems:"center"}}>
            <i className="material-icons white-text">menu</i></a>}
        </div>
       
        <div className={!resize.state?"div4 col s10 row":" div5 col s2"} style={{margin:0}}>
        {!resize.state?(<>

          <div className="col s11 nav_list " style={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:0}}>
            <Link to="/" style={{borderRadius:"10px" ,backgroundColor:location.pathname=="/"&&"cadetblue"}}>Home</Link>
            <Link to="/about" style={{borderRadius:"10px", backgroundColor:location.pathname=="/about"&&"cadetblue"}}>About</Link>
            <Link to="/dashboard" style={{borderRadius:"10px", backgroundColor:(location.pathname=="/dashboard"||location.pathname==`/dashboard/${auth.user._id}`)&&"cadetblue"}}>Dashboard</Link>
            <Link to="/events" style={{borderRadius:"10px", backgroundColor:location.pathname=="/events"&&"cadetblue"}}>Events</Link>
            <Link to="/calendar" style={{borderRadius:"10px", backgroundColor:location.pathname=="/calendar"&&"cadetblue"}}>Calendar</Link>
            <Link to="/contact" style={{borderRadius:"10px", backgroundColor:location.pathname=="/contact"&&"cadetblue"}}>Contact</Link>

{/* //           <div className="col s11  nav_list" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
//             <Link to="/" style={{color:location.pathname=="/"&&"rgb(14, 161, 152)"}}>Home</Link>
//             <Link to="/dashboard" style={{color:(location.pathname=="/dashboard"||location.pathname==`/dashboard/${auth.user._id}`)&&"rgb(14, 161, 152)"}}>Dashboard</Link>
//             <Link to="/events" style={{color:location.pathname=="/events"&&"rgb(14, 161, 152)"}}>Events</Link>
//             <Link to="/calendar" style={{color:location.pathname=="/calendar"&&"rgb(14, 161, 152)"}}>Calendar</Link> */}

          </div>
          <i
            className="fa fa-search col s1 white-text"
            style={{
              fontSize: "21px",
              cursor: "pointer",
              paddingLeft:10,
              margin:0,
              display:"flex",
              justifyContent:"flex-end",
              alignItems:"center",
              transform: 'translateY(-2px)'
             

            }}
            onClick={() =>
              dispatch({
                type: INI_SEARCH,
                payload: !search.etat,
              })
            }
          ></i>

          
          </>):( <><i
            className="fa fa-search col s1 white-text"
            style={{
              fontSize: "21px",
              cursor: "pointer",
              paddingRight:10,
              margin:0,
              display:"flex",
              justifyContent:"flex-end",
              alignItems:"center",
             
             

            }}
            onClick={() =>
              dispatch({
                type: INI_SEARCH,
                payload: !search.etat,
              })
            }
          ></i>
          {/* <Link
            to="/"
            style={{
              textDecoration: "none",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              width:"100%"
            }}
          > */}
            {/* <img
              src="/cocoEventtt.jpg"
              alt="COCO EVENT"
              width="180px"
              height="45px"

              style={{
                marginRight: "10px",

              }}
            /> */}
          {/* </Link> */}
          </>)}
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
      <div className={!resize.state?" landing col s2": "landing col s4" } style={{
        margin:0
      }}> 
        <Landing />
        
      </div>
    </div>
    </div>
  );
}

export default Navbar;
