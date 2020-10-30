import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import "../landing.css";
import M from "materialize-css";
import {useLocation} from "react-router-dom";
import { getNotifications } from "../actions/notificationaction";
import notif, { filter_notif } from "../outils/notif_length";
import historyevent from "../outils/history";

function Landing({}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const auth = useSelector((state) => state.auth);
  const resize=useSelector(state=>state.resize)
  const location=useLocation()
  const allnotif=useSelector(state=>state.notification.notifications)
  const [clknotif,setclknotif]=useState(false)
  useEffect(() => {
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
    
    
  });

  console.log(filter_notif(allnotif,auth.user._id))
useEffect(()=>{M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))},[])
  const onLogoutClick = () => {
  
    dispatch(logoutUser());
  };
useEffect(()=>{
  M.Modal.init(document.querySelectorAll(".modal"))
  dispatch(getNotifications())
},[])
  return (
    <>
      <div className="landing_app">
        <Link
          to="/register"
          style={{
            width: "100%",
            borderRadius: "3px",
            
            // letterSpacing: "1.5px",
            display: localStorage.token ? "none" : "inline",
            marginRight:5
          }}
          className="btn waves-effect waves-light "
        >
          Register
        </Link>

        <Link
          to="/login"
          style={{
            width: "100%",
            borderRadius: "3px",
            // letterSpacing: "1.5px",
             marginRight:5,

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
        {localStorage.token&&
        <div style={{width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:resize.state?"flex-end":"space-around"}}
        
        >
          {localStorage.token &&
          <a href="#signoutmodal" 
          className="modal-trigger" 
          style={{color:"white",marginTop:5}}>
            <i className="fas fa-sign-out-alt" 
            style={{cursor:"pointer",fontSize:20}}   
            title="sign out"></i></a>}
          
       
        {localStorage.token&&
        <a href='#' data-target='dropdown1' className='dropdown-trigger' 
        style={{margin:resize.state&&"11px",
        transform:"translateY(3.2px)"}}>
          <img className="circle" src={auth.user.avatar} width="30px" height="30px"/></a>}
        </div>}
      </div>

    {localStorage.token &&
    <ul onClick={()=>console.log(2)}>     
    <li>
    <a href='#!' data-target='dropdown2' className='dropdown-trigger' >
    <span className="notification-box" >
    <span className="notification-count">{allnotif.length!=0&&notif(allnotif,auth.user._id)}</span>
    <span className="notification-bell">
      <span className="bell-top"></span>
      <span className="bell-middle"></span>
      <span className="bell-bottom"></span>
      <span className="bell-rad"></span>
    </span></span>
    </a>
    </li>
    </ul>}

  <ul id='dropdown1' className='dropdown-content lan' >
    <li style={{height:"100%"}}>
  <div style={{display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"space-around",
  height:"100%"}}>
  <img className="circle" src={auth.user.avatar} width="55px" width="55px" />
   <div style={{width:"100%",
   display:"flex",
   flexDirection:"column",
   alignItems:"center"}}> 
   <span className="black-text name">
   <b>{auth.user.fname + " " + auth.user.lname}</b>
   </span>
   <span className="black-text email">{auth.user.email}</span></div>
   <button className="account"
   onClick={()=>history.push("/myaccount")} 
   style={{marginBottom:"5px"}}>Account setting</button>
   </div>
    </li>
  </ul>

  <ul id='dropdown2' className='dropdown-content notif' style={{height: "auto",overflowY:"auto", cursor: "not-allowed"}}>
    <li style={{
           display: "flex",
           justifyContent:"center",
           alignItems:"center",
           height: "auto"
          
     

     }}>
     <div style={{width:"400px",height:"auto",overflowY:"auto"}}>
    
    
    {(filter_notif(allnotif,auth.user._id)).map(el=>{
      return(
     <div  style={{
           justifyContent:"center",
           alignItems:"center",
           width:"400px",    
           overflowY:"auto",
           bottom: "0px",
           onmouseOver:"bgChange('red')"}}>
    
      <div style={{
      display: "flex",
      justifyContent:"left",
      alignItems:"left",
      }}>{(el.title)}</div>
      <p/>
    <div style={{
      display: "flex",
      justifyContent:"center",
      alignItems:"center",
      }}> {(el.content)}
    </div><p/>
    <div style={{
      display: "flex",
      justifyContent:"left",
      alignItems:"left",
      }}>{historyevent(el.created_at)}</div>
    <hr/>    
    </div>)})}

          <div style={{
           cursor: "pointer",
           display: "flex",
           justifyContent:"center",
           alignItems:"center",
           width:"400px",
           height:"70px",
           overflowY:"auto",
           bottom: "0px",
           color:"red",
           backgroundColor: "coral"}}
           onClick={() => {

    }}> Show all my notifications
     </div>
     </div>
    </li>
  </ul>

  <div id="signoutmodal" className="modal">
          <div className="modal-content">
            <h4> <b>Sign out</b> </h4>
            <p>Are you sure you want to log out?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close  btn-flat"
              onClick={()=>onLogoutClick()}
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close  btn-flat"
            >
              Cancel
            </a>
          </div>
        </div>
    </>
  );
}

export default Landing;
