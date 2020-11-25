import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "../actions/authaction";
import { INI_UPDATE, GET_USERS } from "../actions/types";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./UserList";
import EventList from "./EventList";
import Notification from "./Notifications";
import Reports from "./Reports";
import Sanctions from "./Sanctions";
import "../organizer.css";
import M from "materialize-css";
import { getUsers, getEvents } from "../actions/adminaction";
import Footer from "./Footer";

function Moderator() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.admin);
  const events = useSelector((state) => state.admin);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getEvents());
  }, []);

  return (
    <div className="col s12 row">
      <div
        className="row quicksearch"
        style={{
          margin: "30px 15px 20px 15px",
          fontSize: 15,
          height: 275,
          position: "relative",
        }}
      >
       <div className=" row" style={{verticalAlign: "middle",margin:"30px 15px 20px 15px"
}}>
        <div className=" col s12 organizer_hi "
         >
            <p className="h5-tit">
              {auth.user.fname} {auth.user.lname}
            </p>
            <span className="blue-title">Hi there,</span> 
        <p className="para-blue">
          {" "}
          We are happy to see you among US. <br />
          This is your <b> Moderator Dashboard</b>, You can manage accounts and
          events.</p>
          <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{display:"flex",
            alignItems:"center",
            justifyContent:"center",
            marginBottom: 10,
            height:"100%",
           // boxShadow: "0px 0px 13px 6px #888888",
            marginTop: "-15px"
            }}>
        
          <button
            className="btn btn-medium modal-trigger"
            data-target="modalnotifall"
            style={{ margin: "5px", fontSize:13, width:"120px" }}
          >
            Logs
          </button>
          <button
            className="btn btn-medium modal-trigger"
            data-target="modalreports"
            style={{ margin: "5px", fontSize:13, width:"120px" }}
          >
            Reports
          </button>
          <button
            className="btn btn-medium modal-trigger"
            data-target="modalsanctions"
            style={{ margin: "5px", fontSize:13, width:"120px" }}
          >
            Sanctions
          </button>        
        </div></div></div></div></div>
        
        <div
          className="switch col s12"
          style={{
            color: "black",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            justifyContent:"center"
          }}
        >
          <label>
            Manage account
            <input type="checkbox" onClick={toggle} />
            <span className="lever"></span>
            Manage events
          </label>
        </div>
     

      <div className="col s12">
        {modal ? (
          <div>
            <div className="row">
              <div
                className="col s12"
                style={{
                  textAlign: "center",
                }}
              >
                <EventList events={events.events} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="row">
              <div
                className="col s12"
                style={{
                  textAlign: "center",
                }}
              >
                <UserList users={users.users} />
              </div>
            </div>
          </div>
        )}

        <div
          id="modalnotif"
          className="modal"
          style={{ padding: 0, margin: 0 }}
        >
          <Notification />
        </div>

        <div
          id="modalreports"
          className="modal"
          style={{ padding: 0, margin: 0 }}
        >
          <Reports />
        </div>

        <div
          id="modalsanctions"
          className="modal"
          style={{ padding: 0, margin: 0,}}
        >
          <Sanctions />
        </div> 

      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Moderator;
