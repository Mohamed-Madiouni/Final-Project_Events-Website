import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "../actions/authaction";
import {INI_UPDATE} from "../actions/types"
import { useDispatch, useSelector } from "react-redux";
import "../organizer.css";
import M from "materialize-css"
function Participant() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  return (
    <div className="row">
      <div className="col s12 row">
        <div className="col s10 l6 organizer_hi">
          <div
            className="col s11 m8"
            style={{
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              margin:"0px"
            }}
          >
            {" "}
            <h5>
              <b>Hi there,</b> {auth.user.fname}
            </h5>
            <p>
              {" "}
              We are happy to see you among US. <br />
              This is your <b>Dashboard</b>, you can see and manage your particpation to events.
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
                <i className="material-icons" title="Show my events">
                  assignment
                </i>
              </a>
              <label htmlFor="">Show my participations</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Participant;