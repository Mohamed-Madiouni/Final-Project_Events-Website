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
import { getCurrentUser } from "./actions/authaction";
import { INI_RESIZE, SET_RESIZE } from "./actions/types";
import M from "materialize-css";
import AddEvent from "./component/AddEvent";


function App() {

  const search = useSelector((state) => state.search);
  const auth =useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const resize =useSelector(state=>state.resize)
  const location = useLocation()
  const [homeNav,setHomeNav]=useState(false)
  // Check for token to keep user logged in
  useEffect(() => {
    if (localStorage.token) {
      // Set auth token header auth
      const token = localStorage.token;
      setAuthToken(token);
    }
   
    M.Collapsible.init(document.querySelectorAll('.collapsible'));
    M.Materialbox.init(document.querySelectorAll('.materialboxed'))
   
  });
  useEffect(()=>{ 
    if (localStorage.token) {
    dispatch(getCurrentUser());
  
  }

if(window.innerWidth<=992)
dispatch({
  type:SET_RESIZE
})
else
dispatch({
  type:INI_RESIZE
})

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

  

  return (
    <div className="App">
      {search.etat ? (
        <Searchevents />
      ) : (
        <div className="App_center">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={Searchresult} />
            <Route exact path="/events" component={Events} />

            <PrivateRoute path="/myaccount" component={Account} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              path="/events/:organizer_id"
              component={Organizer_events}
            />
           

          </Switch>
        </div>
      )}
    { resize.state&&<ul id="slide-out" className="sidenav" >
    <li>
        <div style={{height:"60px",display:"flex",justifyContent:"center",alignItems:"center"}}>
          {/* <div className="background">
            <img src="/background_profil.jpg" height="100%" width="100%" />
          </div> */}
         <img
              src="/coco2.png"
              alt="COCO PARTY"
              width="50%"
              height="60%"
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
      <li className="no-padding">
        <ul className="collapsible collapsible-accordion">
          <li className="active" >
            <a className="collapsible-header">Pages<i className="material-icons right chevron">chevron_right </i></a>
            <div className="collapsible-body">
              <ul>
                <li><Link to="/" style={{color:location.pathname=="/"&&"white",backgroundColor:location.pathname=="/"&&"rgb(14, 161, 152)"}}>Home</Link></li>
                <li><Link to="/dashboard" style={{color:location.pathname=="/dashboard"&&"white",backgroundColor:location.pathname=="/dashboard"&&"rgb(14, 161, 152)"}}>Dashboard</Link></li>
                <li> <Link to="/events" style={{color:location.pathname=="/events"&&"white",backgroundColor:location.pathname=="/events"&&"rgb(14, 161, 152)"}}>Events</Link></li>
                
              </ul>
            </div>
          </li>
        </ul>
      </li>
     
  </ul>}
    </div>
  );
}

export default App;
