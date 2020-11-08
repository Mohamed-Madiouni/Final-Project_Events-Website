import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "../actions/authaction";
import { INI_UPDATE, GET_USERS } from "../actions/types";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./UserList";
import EventList from "./EventList";
import Notification from "./Notifications";
import Reports from "./Reports";
import "../organizer.css";
import M from "materialize-css";
import { getUsers, getEvents } from "../actions/adminaction";
import Footer from "./Footer";

function Administrator() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.admin);
  const events = useSelector((state) => state.admin);
  const comments=useSelector((state) => state.comments)
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
          height: 200,
          // display: "flex",
          // alignItems: "left",
          position: "relative",
        }}
      >
        <h5 style={{ position: "absolute", fontSize: 35, left: 5, top: -30 }}>
          <b>Hi there,</b> {auth.user.fname}
        </h5>
        <div className="col s12" style={{marginBottom:20}}>
        <div
          className="col s8 "
          style={{
            // fontStyle: "italic",
            fontSize: 17,
            marginBottom: 10,
            marginLeft: 0,
            marginTop: 70,
          }}
        >
          <p> We are happy to see you among US. <br />
          This is your <b> Admin Dashboard</b>, You can manage accounts and
          events.</p>
        </div>
        

<div className="col s4" style={{display:"flex",alignItems:"center",justifyContent:"center",
 marginBottom: 10,
            marginLeft: 0,
            marginTop: 70,}}>
        <span
          style={{
            fontWeight: 800,
            margin: "auto",
            display: "flex",
            alignItems: "right",
            position: "relative",
          }}
        >
          <button
            className="btn btn-medium modal-trigger"
            data-target="modalnotifall"
            style={{ marginBottom: "5px" }}
          >
            View logs
          </button>
          <button
            className="btn btn-medium modal-trigger"
            data-target="modalreports"
            style={{ marginBottom: "5px" }}
          >
            View Reports
          </button>
        </span>
        </div>
        </div>
        <div
          className="switch col s12"
          style={{
            color: "black",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            // marginBottom: "-127px",
            // marginLeft: "-325px",
            // position: "relative",
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

      </div>
      <Footer/>
    </div>
  );
}

export default Administrator;
