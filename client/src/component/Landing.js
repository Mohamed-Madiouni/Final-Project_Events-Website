import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import "../landing.css";
import M from "materialize-css";

function Landing() {
  const dispatch = useDispatch();
  const history = useHistory()
  const auth = useSelector((state) => state.auth);
  const resize=useSelector(state=>state.resize)

  useEffect(() => {
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))
  });

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

        
        {/* <a
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
        </a> */}

        {/* <a
          to="/"
          style={{
            width: "90%",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            display: !localStorage.token ? "none" : "inline",
            color: "white",
          }}
          
          onClick={onLogoutClick}
        > </a> */}
        {localStorage.token&&<div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:resize.state?"flex-end":"space-around"}}>
          {localStorage.token &&<i className="fas fa-sign-out-alt " style={{cursor:"pointer",fontSize:17}} onClick={onLogoutClick} title="sign out"></i>}
          
       
        {localStorage.token&&<a href='#' data-target='dropdown1' className='dropdown-trigger' style={{margin:resize.state&&"11px",transform:"translateY(3px)"}}><img className="circle" src={auth.user.avatar} width="30px" height="30px"/></a>}
        </div>}
      </div>

      <ul id='dropdown1' className='dropdown-content' >
        <li style={{height:"100%"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",height:"100%"}}>
          
            
          
          <img className="circle" src={auth.user.avatar} width="55px" width="55px" />
         <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}> <span className="black-text name">
            <b>{auth.user.fname + " " + auth.user.lname}</b>
          </span>
          <span className="black-text email">{auth.user.email}</span></div>
          <button className="account" onClick={()=>history.push("/myaccount")} style={{marginBottom:"5px"}}>Account setting</button>
        </div>
       </li>
  </ul>
    </>
  );
}

export default Landing;
