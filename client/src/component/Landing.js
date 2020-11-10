import React, { useEffect, useState,useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import "../landing.css";
import "../notification.scss";
import M from "materialize-css";
import {useLocation} from "react-router-dom";
import { getNotifications, closeNotif } from "../actions/notificationaction";
import notif, { filter_inactive_notif, filter_notif } from "../outils/notif_length";
import historyevent from "../outils/history";
import Notificationuser from "./Notificationsuser";
import Notifications from "./Notifications";
import { getUsers } from "../actions/adminaction";
import { SHOW_NOTIF } from "../actions/types";
import { roundToNearestMinutes } from "date-fns";
import Pusher from 'pusher-js'

function Landing({}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const auth = useSelector((state) => state.auth);
  const resize=useSelector(state=>state.resize)
  const location=useLocation()
  const allnotif=useSelector(state=>state.notification.notifications)
  let notifsize=notif(allnotif,auth.user._id);
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
  localStorage.token&&dispatch(getNotifications())
  
},[])
const notifref=useRef()

useEffect(()=>{
  
  window.addEventListener("resize",()=>{
    if(shownotif===true&&notifref.current)
   { if(window.innerWidth<=545)
notifref.current.style.width=Number(Number(window.innerWidth)-195).toString()+"px"
else
notifref.current.style.width="350px"
  }})
 
})

useEffect(()=>{
  if(shownotif&&notifref.current&&window.innerWidth<=545)
notifref.current.style.width=Number(Number(window.innerWidth)-195).toString()+"px"
},[shownotif])

useEffect(()=>{
  // Pusher.logToConsole = true;

  var pusher = new Pusher(process.env.REACT_APP_KEY, {
    cluster: 'eu'
  });
  var channel = pusher.subscribe('channel1');
  channel.bind('notification', function(data) {
   dispatch(getNotifications())
  });
},[])


  return (
    <div 
    // onClick={(e)=>{
    //   show&&!document.querySelector(".notifications").contains(e.target)&&setshow(!show)
    // }}
      >
     { users.length!=0&&
     <div className="landing_app">
    {!localStorage.token?<div style={{width:"100%",height:60,display: "flex",alignItems: "center",justifyContent: "space-around"}}>
        <Link
          to="/register"
          style={{
           
            
          }}
          className="btn-nav"
        >
          Register Now
        </Link>

        <Link
          to="/login"
          style={{
           
            

           
          }}
          className="btn-nav"
        >
          Log In
        </Link>

        </div>
     :<div style={{width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-around"}}
        
        >
    <div className="toggleNotifications">
    {(notifsize>0)&&<div className="count">
            <div className="num">{allnotif.length!=0&&notif(allnotif,auth.user._id)}</div></div>}
        <label className="show" htmlFor="navtoggle" onClick={()=>dispatch({
type:SHOW_NOTIF,
payload:!shownotif

        })}>
          <i className="material-icons">notifications</i></label>
      { shownotif&& <div className="notifications" style={{width:"350px"}} ref={notifref}>
            <ul className="groupofnotes scrollbar" id="style-3" style={{ maxHeight: "420px", backgroundColor:"rgb(51, 50, 50)", overflowY: "auto"}}>

     {(notifsize>0)?
    (filter_inactive_notif(allnotif,auth.user._id)).reverse().slice(0, (notifsize>10)?10:10).map((el,i)=>{
      return(
        <li key={i} className="note" onClick={() => {
          if (el.notiftype=="Event_Validation") { history.push("/events/"+el.compid)}
          else if (el.notiftype=="New_Event") { history.push("/events")}
          else if (el.notiftype=="Event_Edition") {history.push("/events/"+el.compid)}
          else if (el.notiftype=="Comment_Reply_organizer") { history.push("/events/"+el.compid)}
          else if (el.notiftype=="Comment_Reply_User") { history.push("/events/"+el.compid)}
          else if (el.notiftype=="New_Follow") { history.push(`/${el.role}/${el.userId}`)}
          else if (el.notiftype=="New_Like") { history.push("/events/"+el.compid)}
          else if (el.notiftype=="New_Dislike") { history.push("/events/"+el.compid)}
          else if (el.notiftype=="Remove_Follow") { history.push(`/${el.role}/${el.userId}`)}
          else if (el.notiftype=="Event_Deleted") { history.push("/events")}
          else if (el.notiftype=="Event_Invalidation") { history.push("/dashboard")}
          else if (el.notiftype=="New_Participation") { history.push(`/${el.role}/${el.userId}`)}
          else if (el.notiftype=="Cancel_Participation") { history.push(`/${el.role}/${el.userId}`)}
          else if (el.notiftype=="Event_Closed") { history.push("/events")}
          else if (el.notiftype=="Event_Opened") { history.push("/events"+el.compid)}
          else if (el.notiftype=="Account_Banned") {history.push("/dashboard")}
          else if (el.notiftype=="Account_Unbanned") { history.push("/dashboard")}
          else if (el.notiftype=="Account_Alerted") { history.push("/dashboard")}
          else if (el.notiftype=="Alert_Removed") { history.push("/dashboard")}
          else if (el.notiftype=="New_Comment") { history.push("/events"+el.compid)}
          else {  history.push("/")}
          dispatch(closeNotif([el]))
          dispatch({
            type:SHOW_NOTIF,
            payload:!shownotif
          })
          }}>
                      
          <span style={{ display: "flex", marginRight: "8px", marginTop: "8px",alignItems:"center", marginBottom: "4px"}}>
          {(el.notiftype=="Event_Validation")&&
           <img src="/Event_Validation.png" alt="Event_Validation" width="20px" height="20px"/>}
          {(el.notiftype=="New_Event")&&
           <img src="/New_Event.png" alt="New_Event" width="20px" height="20px"/>}
          {(el.notiftype=="Event_Edition")&&
           <img src="/Event_Edition.png" alt="Event_Edition" width="20px" height="20px"/>}
          {(el.notiftype=="Comment_Reply_organizer")&&
           <img src="/Comment_Reply_organizer.png" alt="Comment_Reply_organizer" width="20px" height="20px"/>}
          {(el.notiftype=="Comment_Reply_User")&&
           <img src="/Comment_Reply_User.png" alt="Comment_Reply_User" width="20px" height="20px"/>}
          {(el.notiftype=="New_Follow")&&
           <img src="/New_Follow.png" alt="New_Follow" width="20px" height="20px"/>}
          {(el.notiftype=="New_Like")&&
           <img src="/New_Like.png" alt="New_Like" width="20px" height="20px"/>}
          {(el.notiftype=="New_Dislike")&&
           <img src="/New_Dislike.png" alt="New_Dislike" width="20px" height="20px"/>}
          {(el.notiftype=="Remove_Follow")&&
           <img src="/Remove_Follow.png" alt="Remove_Follow" width="20px" height="20px" width="20px" height="20px" width="20px" height="20px" width="20px" height="20px" />}
          {(el.notiftype=="Event_Deleted")&&
           <img src="/Event_Deleted.png" alt="Event_Deleted" width="20px" height="20px" width="20px" height="20px" width="20px" height="20px" />}
          {(el.notiftype=="Event_Invalidation")&&
           <img src="/Event_Invalidation.png" alt="Event_Invalidation" width="20px" height="20px" width="20px" height="20px" />}
          {(el.notiftype=="New_Participation")&&
           <img src="/New_Participation.png" alt="New_Participation" width="20px" height="20px" />}
          {(el.notiftype=="Cancel_Participation")&&
           <img src="/Cancel_Participation.png" alt="Cancel_Participation" width="20px" height="20px" />}
          {(el.notiftype=="Event_Closed")&&
           <img src="/Event_Closed.png" alt="Event_Closed" width="20px" height="20px" width="20px" height="20px" width="20px" height="20px" width="20px" height="20px" width="20px" height="20px" />}
          {(el.notiftype=="Event_Opened")&&
           <img src="/Event_Opened.png" alt="Event_Opened" width="20px" height="20px" width="20px" height="20px" width="20px" height="20px" width="20px" height="20px" />}
          {(el.notiftype=="Account_Banned")&&
           <img src="/Account_Banned.png" alt="Account_Banned" width="20px" height="20px" width="20px" height="20px" width="20px" height="20px" />}
          {(el.notiftype=="Account_Unbanned")&&
           <img src="/Account_Unbanned.png" alt="Account_Unbanned" width="20px" height="20px" width="20px" height="20px" />}
          {(el.notiftype=="Account_Alerted")&&
           <img src="/Account_Alerted.png" alt="Account_Alerted" width="20px" height="20px" />}
          {(el.notiftype=="Alert_Removed")&&
           <img src="/Alert_Removed.png" alt="Alert_Removed" width="20px" height="20px" />}
          {(el.notiftype=="New_Comment")&&
           <img src="/New_Comment.png" alt="New_Comment" width="20px" height="20px" />}
          {(el.notiftype=="Comment_Edition")&&
           <img src="/Comment_Edition.png" alt="Comment_Edition" width="20px" height="20px" />}  
          
           <span style={{marginLeft: "8px"}}>{(el.title)}</span></span>
    <div style={{ display: "flex",marginTop:2}}>
      <img src={users.find(e=>e._id==el.userId).avatar} alt="" className="circle" width="37px" height="37px" style={{ marginRight: "8px"}}/>
     <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",width:"100%"}}>
      <div>
 {(el.content)}
      </div>
<div style={{ display: "flex",alignItems:"center", width: "100%",
    justifyContent: "flex-end",
    // paddingRight: "15px"
    }}>
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
              notifsize>0&&dispatch(closeNotif(filter_notif(allnotif,auth.user._id)))
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
 



        
          
          <a href="#signoutmodal" 
          className="modal-trigger" 
          style={{color:"white",height:60,display:"flex",alignItems:"center",transform: "translateX(-5px)"}}>
            <i className="fas fa-sign-out-alt" 
            style={{cursor:"pointer",fontSize:20}}   
            title="sign out"></i></a>
          
       
       
        <a href='#!' data-target='dropdown1' className='dropdown-trigger' 
        style={{height:60,display:"flex",alignItems:"center"}}>
          <img className="circle" src={auth.user.avatar} width="32px" height="32px" alt=""/></a>
        

</div>}
</div>}

<div id="modalnotifuser" className="modal">
<Notificationuser />
 </div>

 <div id="modalnotifall" className="modal" >
<Notifications />
 </div>

  <ul id='dropdown1' className='dropdown-content lan' >
    <li style={{height:"100%"}}>
  <div style={{display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"space-around",
  height:"100%"}}>
  <img className="circle" src={auth.user.avatar} height="55px" width="55px" alt=""/>
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
