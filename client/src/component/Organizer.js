import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getCurrentUser } from "../actions/authaction";
import {INI_UPDATE} from "../actions/types"
import { useDispatch, useSelector } from "react-redux";
import "../organizer.css";
import M from "materialize-css"
function Organizer() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [events, setEvents] = useState({
    title: "",
    address: "",
    description: "",
    date: "",
    duration: "",
    member: "",
    image: "",
    error: {},
  });
  

  
  useEffect(()=>{
    if(auth.updated){
    M.toast({html: 'SUCCESSFULLY UPDATED',classes:"green"})
  setTimeout(dispatch({type:INI_UPDATE}),4000)  
  }
  })

  const onChange = (e) => {
    if (e.target.id == "image")
      setEvents({ ...events, [e.target.id]: e.target.files[0] });
    else setEvents({ ...events, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title: events.title,
      address: events.address,
      description: events.description,
      date: events.date,
      duration: events.duration,
      member: events.member,
      image: events.image,
    };
    console.log(newEvent);
    // dispatch(addevent(newUser));
    toggle();
  };
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
              This is your <b>Dashboard</b>, you can create edit and delete an event.
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
                  onClick={toggle}
                  title="Add event"
                >
                  add
                </i>
              </a>
              <label>Add event</label>
            </div>
            <div>
              <a className="btn-floating waves-effect waves-light cadetblue">
                <i className="material-icons" title="Show my events">
                  assignment
                </i>
              </a>
              <label htmlFor="">Show my events</label>
            </div>
          </div>
        </div>
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
                <b>
                  <span
                    style={{
                      width: "100%",
                      color: "cadetblue",
                    }}
                  >
                    {" "}
                    Please enter the event information
                  </span>
                </b>
              </div>
              <form className="col s12" onSubmit={onSubmit}>
                <div className="input-field col s12 m6">
                  <input
                    onChange={onChange}
                    value={events.title}
                    id="title"
                    type="text"
                  />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="input-field col s12 m6">
                  <input
                    onChange={onChange}
                    value={events.address}
                    id="address"
                    type="text"
                  />
                  <label htmlFor="address">Event address</label>
                </div>
                <div className="input-field col s12">
                  <textarea
                    id="description"
                    className="materialize-textarea"
                    value={events.description}
                    onChange={onChange}
                  ></textarea>

                  <label htmlFor="description">Event description</label>
                </div>
                <div className="input-field col s12 l6">
                  <input
                    onChange={onChange}
                    value={events.date}
                    id="date"
                    type="date"
                  />
                  <label htmlFor="date">Event date</label>
                </div>

                <div className="input-field file-field col s12 l6 ">
                  <div className="btn">
                    <span>File</span>
                    <input type="file" id="image" onChange={onChange} />
                  </div>
                  <div className="file-path-wrapper">
                    <input
                      className="file-path validate"
                      placeholder="Select image for your event"
                      type="text"
                    />
                  </div>
                </div>

                <div className="input-field col s12 l6 ">
                  <input
                    onChange={onChange}
                    value={events.member}
                    id="member"
                    type="number"
                  />
                  <label htmlFor="member">Number of participant </label>
                </div>

                <div
                  className="col s12 m6"
                  style={{
                    position: "relative",
                    // marginTop: "1rem",
                    marginBottom: "1rem",
                    // bottom:"10px"
                  }}
                >
                  <label htmlFor="duration">Event duration</label>
                  <select
                    style={{
                      display: "initial",
                      padding: 0,
                    }}
                    onChange={onChange}
                    id="duration"
                    value={events.duration}
                  >
                    <option value="" defaultValue>
                      {" "}
                      Select the event duration
                    </option>
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                  </select>
                </div>
                <div className="col s12">
                  <div className="col s6 m4 offset-m2">
                    <button
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        // letterSpacing: "1.5px",
                        // marginTop: "1rem",
                        height: "45px",
                      }}
                      type="submit"
                      className="btn waves-effect waves-light hoverable "
                    >
                      Submit
                    </button>
                  </div>
                  <div className="col s6 m4">
                    <button
                      style={{
                        width: "100%",
                        borderRadius: "3px",
                        // letterSpacing: "1.5px",
                        // marginTop: "1rem",
                        height: "45px",
                      }}
                      type="button"
                      className="btn waves-effect waves-light hoverable "
                      onClick={toggle}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Organizer;
