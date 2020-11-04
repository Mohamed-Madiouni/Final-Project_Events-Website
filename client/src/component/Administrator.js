import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "../actions/authaction";
import { INI_UPDATE, GET_USERS } from "../actions/types";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./UserList";
import EventList from "./EventList";
import Notification from "./Notifications";
import "../organizer.css";
import M from "materialize-css";
import { getUsers, getEvents } from "../actions/adminaction";

function Administrator() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.admin);
  const events = useSelector((state) => state.admin);

  const [modal, setModal] = useState(false);
  const toggle = () => {setModal(!modal)}


  useEffect(() => {
    dispatch(getUsers(), getEvents())
  }, []);
// useEffect(()=> { M.Modal.init(document.querySelectorAll(".modal"))})
  return (
    <div className="row">
      <div className="col s12 ">
        <div className="col s6 m7 organizer_hi">
          <div
            className="col s12"
            style={{
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              margin: "0px",
            }}
          >
            {" "}
            <h5>
              <b>Hi there,</b> {auth.user.fname}
            </h5>
            <p>
              {" "}
              We are happy to see you among US. <br />
              This is your <b>Admin Dashboard</b><br />
              You can manage accounts and events.
            </p>
          </div>

        </div>
        <div
          className="col s6 m5"
          style={{
            paddingRight: "0px",
          }}
        >
          <div>
          <button className="btn btn-medium modal-trigger"
          data-target="modalnotifall"
          style={{marginBottom:"5px"}}>View logs</button>

          <div className="switch right" style={{marginTop:10,color:"black",fontSize:20}}>
              <label>Manage account
            
              <input type="checkbox" onClick={toggle}/>
              <span className="lever"></span>
          
              Manage events</label>
            </div>
          </div>
        </div>
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
        )
     :

       (
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

<div id="modalnotif" className="modal" style={{ padding: 0, margin:0 }}>
<Notification />
 </div>
      </div>   

    </div>
    
  );
}

export default Administrator; 
