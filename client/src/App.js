import React, { useEffect, useState } from "react";
import "./App.css";
import Register from "./component/Register";
import Login from "./component/Login";
import Account from "./component/Account";
import {Link, Route, Switch,useLocation } from "react-router-dom";
import setAuthToken from "./token/authtoken";
import PrivateRoute from "./component/Privateroute";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Searchevents from "./component/Searchevents";
import { useDispatch, useSelector } from "react-redux";
import Organizer_events from "./component/Organizer_events";
import Searchresult from "./component/Searchresult";
import Events from "./component/Events";
import Calendar from "./component/Calendar"
import { getCurrentUser, userunBlock } from "./actions/authaction";
import { ADD_TALK, GET_LOADING, INI_RESIZE, SET_RESIZE, SHOW_CHAT, SHOW_NOTIF,SHOW_TALK } from "./actions/types";
import M from "materialize-css";
import historyevent from "./outils/history"
// import AddEvent from "./component/AddEvent";
import ContactUs from "./component/ContactUs"
import AboutUs from "./component/AboutUs";

import Comments from "./component/Comments";
import Bannned_home from "./component/Bannned_home";
import Notifications from "./component/Notifications";
import Maps from "./component/Maps";
import Page_404 from "./component/Page_404";
import Loading from "./component/Loading";
import Organizer_page from "./component/Organizer_page";
import Participant_page from "./component/Participant_page";
import Moderator_page from "./component/Moderator_page";
import Administrator_page from "./component/Administrator_page";
import { getUsers } from "./actions/adminaction";
import { chatuser } from "./outils/chatfunction";


function App() {

  const search = useSelector((state) => state.search);
  const auth =useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const resize =useSelector(state=>state.resize)
  const shownotif=useSelector(state=>state.notification.show)
  const location = useLocation()
  const [homeNav,setHomeNav]=useState(false)
  const loading=useSelector(state=>state.loading.loading)
  const showchat=useSelector(state=>state.chat.show)
  const chat=useSelector(state=>state.chat)
  const users = useSelector((state) => state.admin.users);
const [chatstate,setchatstate]=useState("discussion")
const [blockid,setblockid]=useState("")

  // Check for token to keep user logged in
  useEffect(() => {
   
   
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    if (location.pathname=="/")
     M.Slider.init(document.querySelectorAll(".slider"), { height: 500 });
   
  });
  useEffect(()=>{ 
    if (localStorage.token) {
        // Set auth token header auth
        const token = localStorage.token;
        setAuthToken(token);
    dispatch(getCurrentUser());
  
  }
  dispatch(getUsers())

if(window.innerWidth<=992)
dispatch({
  type:SET_RESIZE
})
else
dispatch({
  type:INI_RESIZE
})
M.Modal.init(document.querySelectorAll(".modal"))
},[])
useEffect(()=>{
  window.addEventListener("resize",()=>{
    if(window.innerWidth<=992)
   dispatch({
     type:SET_RESIZE
   })
    else
    dispatch({
      type:INI_RESIZE
    })
  })
},[resize.state])

  useEffect(()=>{
    if(loading)
setTimeout(()=>{
  dispatch({
    type:GET_LOADING,
    payload:false
  })
},3000)
  })

  return (
    <div className="App"  
     onClick={(e)=>{
        shownotif&&!document.querySelector(".notifications").contains(e.target)&&dispatch({
          type:SHOW_NOTIF,
          payload:!shownotif
        })
        showchat&&!document.querySelector(".chatmodal").contains(e.target)&&dispatch({
          type:SHOW_CHAT,
          payload:!showchat
        })
        chat.talk.show&&!(document.querySelector(".discumodal").contains(e.target)||document.querySelector(".chatmodal").contains(e.target))&&dispatch({
          type:SHOW_TALK,
          payload:!chat.talk.show
        })
      }}>
      {loading?<Loading/>:
      search.etat ? (
        <Searchevents />
      ) : (
        <div className="App_center">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Searchresult} />
            <Route exact path="/events" component={Events} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/maps" component={Maps} />
            <Route exact path="/contact" component={ContactUs} />
            <Route exact path="/about" component={AboutUs} />
            
            <Route exact path="/404" component={Page_404} />
            <Route path="/events/:event_id" component={Comments} />
            <Route path="/organizer/:organizerId" component={Organizer_page} />
            <Route path="/participant/:participantId" component={Participant_page} />
            <Route path="/moderator/:moderatorId" component={Moderator_page} />
            <Route path="/administrator/:administratorId" component={Administrator_page} />
            <PrivateRoute path="/myaccount" component={Account} />
            <Route path="/banned" component={Bannned_home} />
            <Route path="/notifications" component={Notifications} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              path="/dashboard/:organizer_id"
              component={Organizer_events}
            />
             <Route path="/*" component={Page_404} />
           

          </Switch>
          {auth.isAuthenticated&&<div className="chatlist">
{!showchat&&location.pathname!="/login"&&location.pathname!="/register"&&<div className="tap" style={{ cursor:"pointer"}} onClick={()=>{dispatch({type:SHOW_CHAT,payload:!showchat})}}>
{/* <i className="fas fa-angle-double-top"></i> */}
<i className="fas fa-edit"></i>
</div>}
<div className="chatmodal groupofnotes scrollbar"  id="style-3" style={{width:showchat?300:0}}>
<div style={{transition:"all 0.5s",width:280,heigth:50,display:"flex",alignItems:"center",justifyContent:"space-around",borderTopRightRadius:10,borderTopLeftRadius:10,
margin:10,fontWeight:"bold"}}>
  <p style={{transition:"all 0.5s",color:chatstate=="discussion"&&"#2e8fa5",textDecorationLine:chatstate=="discussion"&&"underline",width:"100%",textAlign:"center",borderRight:"1px solid rgb(63, 63, 63)",cursor:"pointer"}} onClick={()=>setchatstate("discussion")}>Discussion</p>
  <p style={{transition:"all 0.5s",color:chatstate=="block"&&"#2e8fa5",textDecorationLine:chatstate=="block"&&"underline",width:"100%",textAlign:"center",cursor:"pointer"}} onClick={()=>setchatstate("block")}>Block list</p>
</div>
{chatstate=="discussion"?
chat.discussion.filter(el=>el.users.includes(auth.user._id)).length==0?
<div style={{height:457,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:"bold"}}> No messages</div>:
<ul className="collection livechat">

{chat.discussion.filter(el=>el.users.includes(auth.user._id)).slice(0).sort((a,b)=> {return new Date(a.sendat)-new Date(b.sendat)}).reverse().map((el,i)=>{
  return (
  <li key={i} className=""  onClick={()=>{
    dispatch({
    type:SHOW_TALK,
    payload:chat.talk.show?chat.talk.show:!chat.talk.show
  })
  dispatch({
    type:ADD_TALK,
    payload:chatuser(el.users,auth.user._id)
  })

}}>
  <div style={{display:"flex",alignItems:"center"}}>
      <img src={users.find(elm=>elm._id==chatuser(el.users,auth.user._id)).avatar} alt="" className="circle"/>
      <div style={{marginLeft:10,display:"flex",flexDirection:"column",alignItems:"flex-start",width:"100%"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>

      <span className="title" style={{display:"flex",alignItems:"center"}}><b>{users.find(elm=>elm._id==chatuser(el.users,auth.user._id)).fname}</b>
      {el.sendby!=auth.user._id&&<span style={{display:"flex",justifyContent:"center",alignItems:"center",
      background:"#2e8fa5",borderRadius:"50%",width:8,height:8,marginLeft:7}}>
        </span>}
        
        </span>
        <span style={{color:"#2e8fa5",fontSize:11}}>{historyevent(el.discussion[el.discussion.length-1].created_at)}</span>
        </div>
    <div>{el.discussion[el.discussion.length-1].text.length<=30?el.discussion[el.discussion.length-1].text:el.discussion[el.discussion.length-1].text.slice(0,27)+" ..."}</div>
     </div> 
     </div>
      
      
    </li>



  )
})}
</ul>:auth.user.blocked.length==0?
<div style={{height:457,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:"bold"}}> Empty list</div>
:<ul className="collection livechat">

{auth.user.blocked&&auth.user.blocked.map((el,i)=>{
  return (
  <li key={i} className="" style={{position:"relative"}}>
  <div style={{display:"flex",alignItems:"center"}}>
      <img src={users.find(elm=>elm._id==el).avatar} alt="" className="circle"/>
     
     

      <span className="title" style={{display:"flex",alignItems:"center",marginLeft:5}}><b>{users.find(elm=>elm._id==el).fname+" "+users.find(elm=>elm._id==el).lname}</b>
        
        </span>
       
       
    
    
     </div>
     <i title='Remove block' className="material-icons modal-trigger" style={{cursor:"pointer",color:"#2e8fa5",position:"absolute",top:5,right:5,fontSize:17}} data-target="modalunblock" onClick={()=>{setblockid(el)}}>delete</i>
      
      
    </li>



  )
})}
</ul>}
</div>
</div>}
        </div>
        
      )}



    { resize.state&&<ul id="slide-out" className="sidenav " style={{background:"white"}}>
    <li>
        <div style={{background:"linear-gradient(90deg, #1c1b1b 0%, rgb(26, 23, 23) 100%)",
 height:"60px",display:"flex",justifyContent:"center",alignItems:"center"}}>
          {/* <div className="background">
            <img src="/background_profil.jpg" height="100%" width="100%" />
          </div> */}
         <img
              src="/cocoEventtt.jpg"
              alt="COCO Event"
              width="130px"
              height="50px"
              // style={{
              //   paddingTop: "7px",
              // }}
            />
          {/* <span className="white-text name">
            {auth.user.fname + " " + auth.user.lname}
          </span>
          <span className="white-text email">{auth.user.email}</span> */}
        </div>
      </li>
 <li style={{transform: "translateY(-8px)"}}>
        <div className="divider"></div>
      </li>
      {/* <li>
        <a href="/myaccount">
          <i className="material-icons">settings</i>Account Setting
        </a>
      </li> */}
      <li className="no-padding" >
        <ul className="collapsible collapsible-accordion">
          <li className="active" >
            <a className="collapsible-header">Pages<i className="material-icons right chevron">chevron_right </i></a>
            <div className="collapsible-body" >
              <ul>
                <li><Link to="/" style={{color:location.pathname=="/"&&"white",backgroundColor:location.pathname=="/"&&"rgb(14, 161, 152)"}}>Home</Link></li>
                <li> <Link to="/about" style={{color:location.pathname=="/about"&&"white",backgroundColor:location.pathname=="/about"&&"rgb(14, 161, 152)"}}>About</Link></li>
                <li><Link to="/dashboard" style={{color:(location.pathname=="/dashboard"||location.pathname==`/dashboard/${auth.user._id}`)&&"white",backgroundColor:(location.pathname=="/dashboard"||location.pathname==`/dashboard/${auth.user._id}`)&&"rgb(14, 161, 152)"}}>Dashboard</Link></li>
                <li> <Link to="/events" style={{color:location.pathname=="/events"&&"white",backgroundColor:location.pathname=="/events"&&"rgb(14, 161, 152)"}}>Events</Link></li>
                <li> <Link to="/calendar" style={{color:location.pathname=="/calendar"&&"white",backgroundColor:location.pathname=="/calendar"&&"rgb(14, 161, 152)"}}>Calendar</Link></li>
                <li> <Link to="/contact" style={{color:location.pathname=="/contact"&&"white",backgroundColor:location.pathname=="/contact"&&"rgb(14, 161, 152)"}}>Contact</Link></li>
                
              </ul>
            </div>
          </li>
        </ul>
      </li>
     
  </ul>}
  <div id="modalunblock" className="modal">
          <div className="modal-content">
            <h4>Block manager</h4>
            <p>Are you sure you want to remove the block from this user?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close  btn-flat"
              onClick={()=>dispatch(userunBlock(blockid))}
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

export default App;
