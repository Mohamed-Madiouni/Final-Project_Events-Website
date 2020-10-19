import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "../actions/authaction";
import { INI_UPDATE, GET_USERS } from "../actions/types";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./UserList";
import EventList from "./EventList";
import "../organizer.css";
import M from "materialize-css";
import { getUsers, getEvents } from "../actions/adminaction";
function Moderator() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.admin);
  const events = useSelector((state) => state.admin);

  const [modal, setModal] = useState(false);
  const toggle = () => {setModal(!modal)}


  useEffect(() => {
    dispatch(getUsers(), getEvents())
  }, []);
useEffect(()=> { M.Modal.init(document.querySelectorAll(".modal"))})
  return (
    <div className="row">
      <div className="col s12 row">
        <div className="col s10 l6 organizer_hi">
          <div
            className="col s11 m8"
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
              This is your <b>Dashboard</b>, you can manage accounts an events.
            </p>
          </div>

        </div>
        <div
          className="col s2 l6"
          style={{
            paddingRight: "0px",
          }}
        >
          <div className="organizer_nav">
              <div class="switch">
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

    </div>
    </div>
  );
}

export default Moderator; 