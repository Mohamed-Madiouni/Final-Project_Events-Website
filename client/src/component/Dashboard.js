import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../actions/authaction";
import { INI_UPDATE } from "../actions/types";
import "../dashboard.css";
import Administrator from "./Administrator";
import Moderator from "./Moderator";
import Participant from "./Participant";
import Navbar from "./Navbar";

import Organizer from "./Organizer";

import M from "materialize-css";

function Dashboard({ history }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const [dashOrganizer,setDashOrganizer]= useState({state:"welcome"})

  useEffect(() => {
    if (!localStorage.token) history.push("/login");
  });
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getCurrentUser());
    }
    M.Modal.init(document.querySelectorAll(".modal"));
  }, []);
  useEffect(() => {
    if (auth.updated) {
      M.toast({ html: "Account successfully updated", classes: "green" });
      setTimeout(dispatch({ type: INI_UPDATE }), 4000);
    }

    M.Sidenav.init(document.querySelectorAll(".sidenav"));
    // M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))
    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
  });

  //check if events ended
  // useEffect(()=>{
  //   dispatch(getEvent())

  //   for(let i=0;i<allevents.length;i++){
  //     if( new Date(eventClosing(allevents[i].date,allevents[i].duration))<new Date())
  //     dispatch(endEvent(allevents[i]._id))
  //   }
  // },[])
  // useEffect(()=>{
  //   window.addEventListener("resize",()=>{
  //     if(window.innerWidth<=992)
  //     setDashNav(false)
  //     else
  //     setDashNav(true)
  //   })
  // })

  return (
    <>
      {" "}
      <Navbar />
      {/* <div style={{paddingLeft:!resize.state?"300px":"0px"}}> */}
      {auth.user.role == "organizer" && <Organizer />}
      {auth.user.role == "administrator" && <Administrator />}
      {auth.user.role == "participant" && <Participant />}
      {auth.user.role == "moderator" && <Moderator />}
      {/* </div> */}
      {/* {!resize.state&&<ul id="slide-out" class="sidenav sidenav-fixed" style={{marginTop:"60px",borderTop:"1px solid #e5e2e2"}}> */}
      {/* <li>
        <div className="user-view">
          <div className="background">
            <img src="/background_profil.jpg" height="100%" width="100%" />
          </div>
          <img className="circle" src={auth.user.avatar} />
          <span className="white-text name">
            {auth.user.fname + " " + auth.user.lname}
          </span>
          <span className="white-text email">{auth.user.email}</span>
        </div>
      </li>

      <li>
        <a href="/myaccount">
          <i className="material-icons">settings</i>Account Setting
        </a>
      </li>
      <li>
        <div className="divider"></div>
      </li> */}
      {/* <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li >
            <a class="collapsible-header" style={{paddingRight:0}}><b>Dashboard</b> <i class="material-icons right chevron">chevron_right </i></a>
            <div class="collapsible-body">
              <ul>
                <li style={{display:"flex",alignItems:"center"}}><i class="material-icons left">add </i><Link to='/dashboard/add' style={{width:"100%"}}>Add event </Link></li>
                <li style={{display:"flex",alignItems:"center"}}><i class="material-icons left">assignment </i><Link to="#" style={{width:"100%"}}>My events</Link></li>
                <li style={{display:"flex",alignItems:"center"}}> <i class="material-icons left">people </i><Link to="#" style={{width:"100%"}}>List of participant</Link></li>
                
              </ul>
            </div>
          </li>
        </ul>
      </li>
  </ul>} */}
    </>
  );
}

export default Dashboard;
