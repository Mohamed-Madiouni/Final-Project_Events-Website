import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import "../landing.css";
import "../notification.scss";
import M from "materialize-css";
import {useLocation} from "react-router-dom";
import { getNotifications, closeNotif } from "../actions/notificationaction";
import notif, { filter_notif } from "../outils/notif_length";
import historyevent from "../outils/history";
import Notificationuser from "./Notificationsuser";
import Notifications from "./Notifications";
import { getUsers } from "../actions/adminaction";
import { SHOW_NOTIF } from "../actions/types";
function Landing({}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const auth = useSelector((state) => state.auth);
  const resize=useSelector(state=>state.resize)
  const location=useLocation()
  const allnotif=useSelector(state=>state.notification.notifications)
  var notifsize=notif(allnotif,auth.user._id);
  const users=useSelector(state=>state.admin.users)
  const shownotif =useSelector(state=>state.notification.show)
  // const [show,setshow]=useState(false)
  useEffect(() => {
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
  });
  useEffect(() => {
    dispatch(getUsers())
  }, []);

//  console.log(filter_notif(allnotif,auth.user._id))
useEffect(()=>{M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))})
  const onLogoutClick = () => {
  
    dispatch(logoutUser());
  };
useEffect(()=>{
  M.Modal.init(document.querySelectorAll(".modal"))
  dispatch(getNotifications())
},[])
  return (
    <div 
    // onClick={(e)=>{
    //   show&&!document.querySelector(".notifications").contains(e.target)&&setshow(!show)
    // }}
      >
     { users.length!=0&&<div className="landing_app">
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

     {localStorage.token &&
    // <div><input type="checkbox" id="navtoggle" value="unchecked" /><input type="checkbox"/>
    <div className="toggleNotifications">
    {(notifsize>0)&&<div className="count">
            <div className="num">{allnotif.length!=0&&notif(allnotif,auth.user._id)}</div></div>}
        <label className="show" htmlFor="navtoggle" onClick={()=>dispatch({
type:SHOW_NOTIF,
payload:!shownotif

        })}>
          <i className="material-icons">notifications</i></label>
      { shownotif&& <div className="notifications">
            <ul className="groupofnotes scrollbar" id="style-3" style={{ maxHeight: "500px", backgroundColor:"rgb(51, 50, 50)", overflowY: "auto"}}>

     {(notifsize>0)?
    (filter_notif(allnotif,auth.user._id)).reverse().slice(0, (notifsize>10)?10:10).map((el,i)=>{
      return(
        <li key={i} className="note">
          <span style={{ display: "flex", marginRight: "8px", marginTop: "8px"}}>
          {(el.notiftype=="Event_Validation")&&
           <img src="/Event_Validation.png" alt="Event_Validation" width="25px" height="25px"/>}
          {(el.notiftype=="New_Event")&&
           <img src="/New_Event.png" alt="New_Event" width="25px" height="25px"/>}
          {(el.notiftype=="Event_Edition")&&
           <img src="/Event_Edition.png" alt="Event_Edition" width="25px" height="25px"/>}
          {(el.notiftype=="Comment_Reply_organizer")&&
           <img src="/Comment_Reply_organizer.png" alt="Comment_Reply_organizer" width="25px" height="25px"/>}
          {(el.notiftype=="Comment_Reply_User")&&
           <img src="/Comment_Reply_User.png" alt="Comment_Reply_User" width="25px" height="25px"/>}
          {(el.notiftype=="New_Follow")&&
           <img src="/New_Follow.png" alt="New_Follow" width="25px" height="25px"/>}
          {(el.notiftype=="New_Like")&&
           <img src="/New_Like.png" alt="New_Like" width="25px" height="25px"/>}
          {(el.notiftype=="New_Dislike")&&
           <img src="/New_Dislike.png" alt="New_Dislike" width="25px" height="25px"/>}
          {(el.notiftype=="Remove_Follow")&&
           <img src="/Remove_Follow.png" alt="Remove_Follow" width="25px" height="25px" width="25px" height="25px" width="25px" height="25px" width="25px" height="25px" />}
          {(el.notiftype=="Event_Deleted")&&
           <img src="/Event_Deleted.png" alt="Event_Deleted" width="25px" height="25px" width="25px" height="25px" width="25px" height="25px" />}
          {(el.notiftype=="Event_Invalidation")&&
           <img src="/Event_Invalidation.png" alt="Event_Invalidation" width="25px" height="25px" width="25px" height="25px" />}
          {(el.notiftype=="New_Participation")&&
           <img src="/New_Participation.png" alt="New_Participation" width="25px" height="25px" />}
          {(el.notiftype=="Cancel_Participation")&&
           <img src="/Cancel_Participation.png" alt="Cancel_Participation" width="25px" height="25px" />}
          {(el.notiftype=="Event_Closed")&&
           <img src="/Event_Closed.png" alt="Event_Closed" width="25px" height="25px" width="25px" height="25px" width="25px" height="25px" width="25px" height="25px" width="25px" height="25px" />}
          {(el.notiftype=="Event_Opened")&&
           <img src="/Event_Opened.png" alt="Event_Opened" width="25px" height="25px" width="25px" height="25px" width="25px" height="25px" width="25px" height="25px" />}
          {(el.notiftype=="Account_Banned")&&
           <img src="/Account_Banned.png" alt="Account_Banned" width="25px" height="25px" width="25px" height="25px" width="25px" height="25px" />}
          {(el.notiftype=="Account_Unbanned")&&
           <img src="/Account_Unbanned.png" alt="Account_Unbanned" width="25px" height="25px" width="25px" height="25px" />}
          {(el.notiftype=="Account_Alerted")&&
           <img src="/Account_Alerted.png" alt="Account_Alerted" width="25px" height="25px" />}
          {(el.notiftype=="Alert_Removed")&&
           <img src="/Alert_Removed.png" alt="Alert_Removed" width="25px" height="25px" />}
          {(el.notiftype=="New_Comment")&&
           <img src="/New_Comment.png" alt="New_Comment" width="25px" height="25px" />}
          {(el.notiftype=="Comment_Edition")&&
           <img src="/Comment_Edition.png" alt="Comment_Edition" width="25px" height="25px" />}  
          
           <span style={{ display: "flex", marginLeft: "8px", marginBottom: "8px", bottom: "2px", position: "relative"}}>{(el.title)}</span></span>
    <div style={{ display: "flex",marginTop:2}}>
      <img src={users.find(e=>e._id==el.userId).avatar} alt="" className="circle" width="37px" height="37px" style={{ marginRight: "8px"}}/>
     <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
      <div>
 {(el.content)}
      </div>
<div style={{ display: "flex",alignItems:"center", position: "relative", left: "157px"}}>
<i className=" tiny material-icons" style={{marginTop:1}}> history </i>
         {historyevent(el.created_at)}
      </div>
     </div>
    
     
     </div>
   </li>
      
        )}): <li style={{
           display: "flex",
           justifyContent:"center",
           alignItems:"center",
           height:"40px",
           overflowY:"auto",
           bottom: "0px",
           cursor:"auto",
           color:"#4d4d4d",
           backgroundColor: "#8f8b8b"
           }}>No new Notifications</li>}</ul>
                
            
            <div data-target="modalnotifuser" className="btnbar modal-trigger" onClick={() => {
              dispatch(closeNotif())
              dispatch({
                type:SHOW_NOTIF,
                payload:!shownotif
              })
            }} style={{
              display: "flex",
              justifyContent:"center",
              alignItems:"center",
              height:"50px",
              overflowY:"auto",
              bottom: "0px",
              cursor:"pointer",
              color:"#b9b6b6",
              backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
               
       Show all my notifications</div>
        </div>}
    </div>
// </div>
}

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
        <a href='#!' data-target='dropdown1' className='dropdown-trigger' 
        style={{margin:resize.state&&"11px",
        transform:"translateY(3.2px)"}}>
          <img className="circle" src={auth.user.avatar} width="30px" height="30px"/></a>}
        </div>}


</div>}

<div id="modalnotifuser" className="modal" style={{ padding: 0, margin:0 }}>
<Notificationuser />
 </div>

 <div id="modalnotifall" className="modal" style={{ padding: 0, margin:0 }}>
<Notifications />
 </div>

  <ul id='dropdown1' className='dropdown-content lan' >
    <li style={{height:"100%"}}>
  <div style={{display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"space-around",
  height:"100%"}}>
  <img className="circle" src={auth.user.avatar} height="55px" width="55px" />
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
    </div>
  );
}

export default Landing;
