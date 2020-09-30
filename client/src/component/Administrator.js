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
function Administrator() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.admin);
  const events = useSelector((state) => state.admin);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  useEffect(() => {
    dispatch(getUsers(), getEvents())
  }, []);

  // to update for delete actions
  // useEffect(()=>{
  //   if(auth.deleted){
  //   M.toast({html: 'SUCCESSFULLY DELETED',classes:"green"})
  // setTimeout(dispatch({type:INI_UPDATE}),4000)
  // }
  // })

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
          <div className="col s1 m4 welcome">
            <img src="welcome.jpg" alt="welcome" width="100%" height="100%" />{" "}
          </div>
        </div>
        <div
          className="col s2 l6"
          style={{
            paddingRight: "0px",
          }}
        >
          <div className="organizer_nav">
            <div>
              <a className="btn-floating waves-effect waves-light cadetblue">
                <i
                  className="material-icons"
                  onClick={toggle2}
                  title="Manage event"
                >
                  delete
                </i>
              </a>
              <label>Manage event</label>
            </div>

            <div>
              <a className="btn-floating waves-effect waves-light cadetblue">
                <i
                  className="material-icons"
                  onClick={toggle}
                  title="Manage accounts"
                >
                  assignment
                </i>
              </a>
              <label>Manage accounts</label>
            </div>
          </div>
        </div>
      </div>

      <div className="col s12">
        {modal2 && (
          <div className="col s8 offset-s2">
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
        )}
      </div>

      <div className="col s12">
        {modal && (
          <div className="col s8 offset-s2">
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

export default Administrator;
