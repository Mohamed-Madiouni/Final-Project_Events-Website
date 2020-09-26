import React,{useEffect} from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import "../landing.css";
import M from "materialize-css"



function Landing() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
   
    M.Sidenav.init(document.querySelectorAll('.sidenav'))
    
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
      
      <ul id="slide-out" className="sidenav">
    <li><div className="user-view">
      <div className="background">
        <img src="background_profil.jpg" height="100%" width="100%"/>
      </div>
    <img className="circle" src={auth.user.avatar}/>
  <span className="white-text name">{auth.user.fname+" "+auth.user.lname}</span>
  <span className="white-text email">{auth.user.email}</span>
    </div>
    </li>
   
    <li><a href="/myaccount"><i className="material-icons">settings</i>Account Setting</a></li>
    <li><div className="divider"></div></li>
  </ul>
    </>
  );
}

export default Landing;
