import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import get_month from "../outils/get_month";
import historyevent from "../outils/history";
import {
  closeEvent,
  getEventOrganizer,
  deleteEvent,
  openEvent,
  getEvent,
  endEvent,
  getParticipant,
  fullEvent,
} from "../actions/evntAction";
import { getCurrentUser } from "../actions/authaction";
import AddEvent from "./AddEvent";
import "../organizer.css";
import M from "materialize-css";
import {
  ADD_FOCUS,
  ADD_INP,
  ADD_PLACE,
  GET_ERRORS,
  SHOW_MAP,
  STATE_MAP,
} from "../actions/types";

import Navbar from "./Navbar";
import "../organizer_event.css";
import { sendNotifications } from "../actions/notificationaction";
import calcul_rating from "../outils/calucle_rating";
import MyMap from "./Maps";
import { formatRelative } from "date-fns";
import { Link } from "react-router-dom";

function Organizer_events({ history }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const allevents = useSelector((state) => state.events.allEvents);
  const errors = useSelector((state) => state.errors);
  const allparticipant = useSelector((state) => state.participant);
  const map = useSelector((state) => state.map);
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState("");
  const [action, setAction] = useState({ type: "add", payload: {} });
  const [deleteid, setDeleteid] = useState("");
  const [closedid, setClosedid] = useState("");
  const [participant, setParticipant] = useState(false);
  const [participantId, setParticipantId] = useState("");
  const [btnedit, setBtnedit] = useState("");
  const [btnpart, setBtnPart] = useState("");

  const [quickSearch, setQuickSearch] = useState({
    title: "",
    state: "",
    tags: "",
  });
  const toggle = () => {
    setModal(!modal);
    dispatch({
      type: ADD_PLACE,
      payload: {},
    });
    dispatch({
      type: ADD_INP,
      payload: {
        state: false,
        inp: {},
      },
    });
    return modal;
  };
  const participantToggle = () => {
    setParticipant(!participant);
    return participant;
  };

  useEffect(() => {
    if (localStorage.token) {
      dispatch(getCurrentUser());
    }
    M.Modal.init(document.querySelectorAll(".modal"));
  }, []);

  // useEffect(()=>{
  //   return ()=>M.Modal.init(document.querySelectorAll(".modal"))
  // })
  useEffect(() => {
    dispatch(getEventOrganizer());
    dispatch(getEvent());
    dispatch(getParticipant());
  }, []);
  useEffect(() => {
    if (!localStorage.token) history.push("/");

    M.Slider.init(document.querySelectorAll(".slider"), {
      height: 60,
      indicators: false,
    });
    M.updateTextFields();

    // return ()=>{setModal(false)}
    if (errors.deleted) {
      M.toast({ html: "Event deleted successfully", classes: "green" });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    }
    // M.Modal.init(document.querySelectorAll(".modal"))
  });

  //check if events full
  useEffect(() => {
    for (let i = 0; i < allevents.length; i++) {
      if (
        allevents[i].participant.length === allevents[i].nb_participant &&
        allevents[i].state !== "Ended"
      )
        dispatch(fullEvent(allevents[i]._id));
    }
    for (let i = 0; i < allparticipant.length; i++) {
      if (
        allparticipant.participant[i].participant.length ===
          allparticipant.participant[i].nb_participant &&
        allparticipant.participant[i].state !== "Ended"
      )
        dispatch(fullEvent(allparticipant.participant[i]._id));
    }
  }, []);
  //check if events ended
  useEffect(() => {
    for (let i = 0; i < allevents.length; i++) {
      if (new Date(allevents[i].end) < new Date())
        dispatch(endEvent(allevents[i]._id));
    }
    for (let i = 0; i < allparticipant.participant.length; i++) {
      if (new Date(allparticipant.participant[i].end) < new Date())
        dispatch(endEvent(allparticipant.participant[i]._id));
    }
  }, []);

  //open full events
  useEffect(() => {
    for (let i = 0; i < allevents.length; i++) {
      if (
        allevents[i].participant.length !== allevents[i].nb_participant &&
        allevents[i].state === "Full"
      )
        dispatch(openEvent(allevents[i]._id));
    }
    for (let i = 0; i < allparticipant.length; i++) {
      if (
        allparticipant.participant[i].participant.length !==
          allparticipant.participant[i].nb_participant &&
        allparticipant.participant[i].state === "Full"
      )
        dispatch(openEvent(allparticipant.participant[i]._id));
    }
  }, []);
  let eventsorganizer = allparticipant.participant.filter((el) => {
    return (
      el.title.toLowerCase().includes(quickSearch.title.toLowerCase()) &&
      el.state.toLowerCase().includes(quickSearch.state.toLowerCase()) &&
      (quickSearch.tags !== ""
        ? el.tags.find((e) =>
            e.toLowerCase().includes(quickSearch.tags.toLowerCase())
          )
        : true)
    );
  });

  const onChange = (e) => {
    setQuickSearch({ ...quickSearch, [e.target.id]: e.target.value });
  };

  return (
    <div
      onClick={(e) => {
        map.show &&
          !(
            document.querySelector(".map_container").contains(e.target) ||
            document.querySelector("reach-portal").contains(e.target) ||
            [...document.getElementsByClassName("address_map")].includes(
              e.target
            )
          ) &&
          dispatch({
            type: SHOW_MAP,
            payload: false,
          }) &&
          dispatch({
            type: STATE_MAP,
            payload: "",
          }) &&
          dispatch({
            type: ADD_FOCUS,
            payload: {},
          });
      }}
    >
      <Navbar />

      {/* <Search
        quickSearch={quickSearch}
        setQuickSearch={setQuickSearch}
        /> */}

      <div
        className="row quicksearch"
        style={{
          margin: "30px 15px 20px 15px",
          fontSize: 15,
          height: 200,
          paddingTop: 65,
          position: "relative",
        }}
      >
        {/* <h5 className="h5-org" style={{position:"absolute",fontSize:35,left:5,top:-30}}><b>Looking for an event?</b></h5>
       <div className="col s12 l4 div-orEv" style={{fontSize:17,marginBottom:10}}>
   <p className="para-org">Select an event state or choose title or tag to discover best events for you.</p> */}

        <h5 style={{ position: "absolute", fontSize: 35, left: 5, top: -30 }}>
          <b>Looking for an event?</b>
        </h5>
        <div
          className="col s12 l4"
          style={{ fontStyle: "", fontSize: 17, marginBottom: 10 }}
        >
          <p>
            Select an event state or choose title or tag to discover best events
            for you.
          </p>
        </div>
        <div
          className="col s12 l8"
          style={{ fontWeight: 800, marginBottom: 10 }}
        >
          <form>
            <div className="input-field col s4">
              <input
                placeholder="event title"
                id="title"
                type="text"
                value={quickSearch.title}
                onChange={onChange}
              />
              <label forhtml="title">Event title</label>
            </div>
            <div className="input-field col s4">
              <select
                id="state"
                value={quickSearch.state}
                onChange={onChange}
                style={{
                  display: "initial",
                  marginTop: 4,
                  borderRadius: 5,
                  outline: "none",
                  background: "transparent",
                  border: "1px solid #9e9e9e",
                }}
              >
                <option value="">State</option>
                <option value="Available" className="green-text">
                  Available
                </option>
                <option value="Closed" className="gray-text">
                  Closed
                </option>
                <option value="Ended" className="gray-text">
                  Ended
                </option>
                <option value="Invalid" className="gray-text">
                  Invalid
                </option>
              </select>
              <label className="active">Event state</label>
            </div>
            <div className="input-field col s4">
              <input
                placeholder="Tags search"
                id="tags"
                type="text"
                value={quickSearch.tags}
                onChange={onChange}
              />
              <label forhtml="title">Event tags</label>
            </div>
          </form>
        </div>
      </div>

      {map.show && (
        <div className=" map_container" id="map">
          <MyMap />
        </div>
      )}

      {(quickSearch.title !== "" ||
        quickSearch.state !== "" ||
        quickSearch.tags !== "") &&
        eventsorganizer.length !== 0 && (
          // <div className="row" style={{marginLeft:10}} > <h5> <b>{eventsorganizer.length+" result(s) found"}</b> </h5></div>
          <div className="row" style={{ marginLeft: "10px" }}>
            <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
              <div className="wpb_column vc_column_container col 12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    <div className="wpb_text_column wpb_content_element ">
                      <div className=" wpb_wrapper">
                        <h2>{eventsorganizer.length}</h2>
                        <p className="pra-2"> result(s) found </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {eventsorganizer.length !== 0 ? (
        // <div className="row">
        <div className="row">
          <div style={{ marginLeft: "10px" }}>
            <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
              <div className="wpb_column vc_column_container col 12">
                <div className="vc_column-inner">
                  <div className="wb_wrapper">
                    <div className="wpb_text_column wpb_content_element ">
                      <div className=" wpb_wrapper">
                        <h2>Your Events</h2>
                        <p className="pra-2">Keep up with the latest events</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {eventsorganizer &&
            eventsorganizer
              .slice(0)
              .reverse()
              .map((el) => {
                return (
                  <div
                    className={
                      modal || participant ? "col s12 row" : "col s12 m6 l4"
                    }
                    key={el._id}
                    style={{ minHeight: "360px" }}
                  >
                    <div
                      className={modal || participant ? "col s12 m6" : "s12"}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className="card small sticky-action"
                        style={{
                          width: 350,
                          height: 350,
                          margin: 5,
                        }}
                      >
                        <div
                          className="card-image"
                          style={{ height: "57%", cursor: "pointer" }}
                        >
                          <img
                            className="activator"
                            src={el.image}
                            height="100%"
                          />

                          <div className="date right">
                            <div className="day">
                              {el.start.split("T")[0].split("-")[2]}
                            </div>
                            <div className="month">
                              {get_month(
                                Number(el.start.split("T")[0].split("-")[1])
                              )}
                            </div>
                          </div>
                          <div className="star_rate left">
                            <i
                              className="material-icons"
                              style={{
                                color: "rgb(255, 180, 0)",
                                fontSize: 65,
                                position: "relative",
                              }}
                            >
                              star
                            </i>
                            <p
                              style={{
                                position: "absolute",
                                top: 22,
                                lineHeight: "normal",
                                left: 21.5,
                                width: 22,
                                height: 22,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {el.rating.length === 0
                                ? "--"
                                : calcul_rating(el.rating)}
                            </p>
                          </div>
                        </div>
                        <div
                          className="card-content"
                          style={{ padding: "0px 10px 0px 24px" }}
                        >
                          <span
                            className="card-title  grey-text text-darken-4"
                            style={{
                              height: "fit-content",
                              lineHeight: "normal",
                              marginTop: "2px",
                              marginBottom: 2,
                            }}
                          >
                            {el.title.length <= 12 ? (
                              <b>{el.title}</b>
                            ) : (
                              <marquee
                                scrolldelay={140}
                                behavior="scroll"
                                direction="left"
                              >
                                <b>{el.title}</b>
                              </marquee>
                            )}
                          </span>
                          {el.address.address.length <= 18 ? (
                            <a href="#map">
                              {/* <marquee  behavior="scroll" direction="left" scrolldelay={200}> */}
                              <p
                                className="red-text address_map"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  dispatch({
                                    type: SHOW_MAP,
                                    payload: true,
                                  });

                                  dispatch({
                                    type: STATE_MAP,
                                    payload: "show",
                                  });
                                  dispatch({
                                    type: ADD_FOCUS,
                                    payload: el.address,
                                  });
                                }}
                              >
                                <i
                                  className="fas fa-home"
                                  style={{ marginRight: 5 }}
                                ></i>
                                {el.address.address}
                              </p>
                              {/* </marquee>  */}
                            </a>
                          ) : (
                            <a href="#map">
                              <marquee
                                behavior="scroll"
                                direction="left"
                                scrolldelay={140}
                              >
                                <p
                                  className="red-text address_map"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: SHOW_MAP,
                                      payload: true,
                                    });

                                    dispatch({
                                      type: STATE_MAP,
                                      payload: "show",
                                    });
                                    dispatch({
                                      type: ADD_FOCUS,
                                      payload: el.address,
                                    });
                                  }}
                                >
                                  <i
                                    className="fas fa-home"
                                    style={{ marginRight: 5 }}
                                  ></i>
                                  {el.address.address}
                                </p>
                              </marquee>{" "}
                            </a>
                          )}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                margin: 10,
                                marginLeft: 0,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className=" tiny material-icons"
                                style={{ margin: 10, marginTop: 10 }}
                              >
                                history
                              </i>

                              {historyevent(el.created_at)}
                            </span>
                            <span
                              style={{
                                margin: 10,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className=" tiny material-icons"
                                style={{ margin: 10, marginTop: 8 }}
                              >
                                person
                              </i>

                              {el.participant.length + "/" + el.nb_participant}
                            </span>
                          </div>
                          {el.tags.length !== 0 && (
                            <div className="slider right tag_slide_orgevnt">
                              <ul className="slides">
                                {el.tags.map((el, i) => (
                                  <li key={i}>
                                    {" "}
                                    <p
                                      className="chip"
                                      style={{
                                        padding: 8,
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: 12,
                                      }}
                                    >
                                      {el}
                                    </p>{" "}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div
                          className="card-action"
                          style={{
                            padding: "10px 24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <a
                            href="#style-3"
                            onClick={() => {
                              if (participant && btnpart !== el._id) {
                                setParticipant(
                                  participantToggle(participantToggle())
                                );
                              } else participantToggle();
                              if (!participant) participantToggle();
                              setBtnPart(el._id);
                              setModal(false);
                              setParticipantId(el._id);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: 12,
                              color: "#006064",
                            }}
                          >
                            Show participants
                            <i
                              className="tiny material-icons "
                              style={{ color: "#006064" }}
                            >
                              arrow_forward
                            </i>
                          </a>
                          <span
                            className={
                              el.state === "Available"
                                ? "right green-text"
                                : "right gray-text text-darken-3"
                            }
                          >
                            {" "}
                            {el.state}
                          </span>
                        </div>
                        <div
                          className="card-reveal groupofnotes scrollbar"
                          id="style-3"
                          style={{ paddingRight: 55, overflowWrap: "anywhere" }}
                        >
                          <span className="card-title grey-text text-darken-4">
                            <b>{el.title}</b>
                            <i
                              className="material-icons "
                              style={{
                                position: "absolute",
                                right: 10,
                                top: 10,
                              }}
                            >
                              close
                            </i>
                          </span>
                          <p style={{ fontSize: 13, color: "rgb(0, 96, 100)" }}>
                            {formatRelative(new Date(el.start), new Date()) +
                              " - " +
                              formatRelative(new Date(el.end), new Date())}
                          </p>
                          <p style={{ lineHeight: "normal" }}>
                            {el.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-between",
                              position: "absolute",
                              right: 5,
                              top: 65,
                            }}
                          >
                            {" "}
                            {/* ((new Date(el.date)-new Date())/(1000*86400))>3&& */}
                            {el.state !== "Ended" && (
                              <Link
                                className="btn-floating  cyan darken-3"
                                onClick={() => {
                                  setAction({ type: "edit", payload: el });

                                  if (modal && btnedit !== el._id) {
                                    setModal(toggle(toggle()));
                                  } else toggle();
                                  if (!modal) toggle();
                                  setBtnedit(el._id);
                                  setParticipant(false);
                                  setModalId(el._id);
                                }}
                                title="edit"
                                id={el._id}
                                to="#style-3"
                              >
                                <i className="material-icons ">edit</i>
                              </Link>
                            )}
                            <button
                              className="btn-floating  cyan darken-3 modal-trigger"
                              title="delete"
                              data-target="modal1"
                              onClick={() => setDeleteid(el._id)}
                            >
                              <i className="material-icons ">delete</i>{" "}
                            </button>
                            {(el.state === "Available" ||
                              el.state === "Full") && (
                              <button
                                className="btn-floating  cyan darken-3 modal-trigger"
                                title="close"
                                data-target="modal2"
                                onClick={() => {
                                  setClosedid(el._id);
                                }}
                              >
                                <i className="material-icons ">block</i>{" "}
                              </button>
                            )}
                            {el.state === "Closed" && (
                              <button
                                className="btn-floating  cyan darken-3 modal-trigger"
                                title="open"
                                data-target="modal3"
                                onClick={() => setClosedid(el._id)}
                              >
                                <i className="material-icons ">done</i>{" "}
                              </button>
                            )}
                            {el.state !== "Invalid" && (
                              <div>
                                {" "}
                                <a
                                href="#!"
                                  className="btn-floating  cyan darken-3"
                                  onClick={() => {
                                    history.push(`/events/${el._id}`);
                                  }}
                                  title="Show comments"
                                >
                                  <i className="material-icons ">comment</i>
                                </a>{" "}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {modal && modalId === el._id && (
                      <div
                        className="col s12 m6 groupofnotes scrollbar"
                        id="style-3"
                        style={{
                          overflowY: "scroll",
                          height: "360px",
                          backgroundColor: "white",
                        }}
                      >
                        <AddEvent
                          toggle={toggle}
                          action={action}
                          setAction={setAction}
                        />
                      </div>
                    )}
                    {participant && participantId === el._id && (
                      <div
                        className="col s12 m6 groupofnotes scrollbar"
                        id="style-3"
                        style={{ overflowY: "auto", height: "360px" }}
                      >
                        {el.participant.length !== 0 ? (
                          <ul className="collection org">
                            {el.participant.map((el, i) => {
                              return (
                                <li
                                  key={i}
                                  className="collection-item avatar"
                                  style={{ margin: 10 }}
                                >
                                  <img
                                    src={el.avatar}
                                    alt=""
                                    className="circle"
                                  />
                                  <span className="title">
                                    <b>{el.fname + " " + el.lname}</b>
                                  </span>
                                  <p className="red-text">
                                    <i
                                      className="fas fa-home"
                                      style={{ marginRight: 5 }}
                                    ></i>
                                    {el.address}
                                  </p>
                                  <p>{el.email}</p>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <p>
                            {" "}
                            <b>0 participant</b>{" "}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
      ) : quickSearch.title !== "" ||
        quickSearch.state !== "" ||
        quickSearch.tags !== "" ? (
        // <div className="row" style={{marginLeft:10}} > <h5> <b>{eventsorganizer.length+" result(s) found"}</b> </h5></div>
        <div className="row" style={{ marginLeft: "10px" }}>
          <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
            <div className="wpb_column vc_column_container col 12">
              <div className="vc_column-inner">
                <div className="wpb_wrapper">
                  <div className="wpb_text_column wpb_content_element ">
                    <div className=" wpb_wrapper">
                      <h2>{eventsorganizer.length}</h2>
                      <p className="pra-2"> result(s) found </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <div  style={{marginLeft:10}}>
        //   <h4> <b>Your dashboard is empty, get started and create events</b> </h4>
        // </div>
        <div className="row" style={{ marginLeft: "10px" }}>
          {/* <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
        <div className="wpb_column vc_column_container col 12">
          <div className="vc_column-inner">
            <div className="wpb_wrapper">
              <div className="wpb_text_column wpb_content_element ">
                <div className=" wpb_wrapper"> 
                <h4>Your dashboard is empty, get started and create events</h4>
                 
                  </div></div></div></div></div></div>  */}
          <div className="row">
            <div className="col s12 l6" id="down">
              <h1 className="title-h">Your dashboard is empty</h1>
              <p className="title-p">Get started and create events.</p>
            </div>
            <div className="col s12 l6" id="up">
              <img className="working-img" src="/illustration-working.svg" />
            </div>
          </div>
        </div>
      )}
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Event delete</h4>
          <p>Are you sure you want to delete this event?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() => {
              dispatch(deleteEvent(deleteid));
              let title = "Event Deleted";
              let content =
                "The organizer " +
                auth.user.fname +
                " " +
                auth.user.fname +
                " deleted the event " +
                allevents.find((elm) => elm._id === deleteid).title;
              let notiftype = "Event_Deleted";
              let compid = deleteid;
              var state = [];
              allevents
                .find((elm) => elm._id === deleteid)
                .participant.map((el) => {
                  state = [...state, { users: el, consulted: false }];
                });
              dispatch(
                sendNotifications(
                  auth.user._id,
                  title,
                  content,
                  auth.user.role,
                  notiftype,
                  state,
                  compid
                )
              );
            }}
          >
            Agree
          </a>
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
        </div>
      </div>
      <div id="modal2" className="modal">
        <div className="modal-content">
          <h4>Event Close</h4>
          <p>Are you sure you want to close this event?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() => {
              dispatch(closeEvent(closedid));
              let title = "Event Closed";
              let content =
                "The organizer " +
                auth.user.fname +
                " " +
                auth.user.fname +
                " closed the event " +
                allevents.find((elm) => elm._id === closedid).title;
              let notiftype = "Event_Closed";
              let compid = closedid;
              var state = [];
              allevents
                .find((elm) => elm._id === closedid)
                .participant.map((el) => {
                  state = [...state, { users: el, consulted: false }];
                });
              dispatch(
                sendNotifications(
                  auth.user._id,
                  title,
                  content,
                  auth.user.role,
                  notiftype,
                  state,
                  compid
                )
              );
            }}
          >
            Agree
          </a>
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
        </div>
      </div>
      <div id="modal3" className="modal">
        <div className="modal-content">
          <h4>Event Close</h4>
          <p>Are you sure you want to open this event?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() => {
              dispatch(openEvent(closedid));
              let title = "Event Opened";
              let content =
                "The organizer " +
                auth.user.fname +
                " " +
                auth.user.fname +
                " reopened the event " +
                allevents.find((elm) => elm._id === closedid).title;
              let notiftype = "Event_Opened";
              let compid = closedid;
              var state = [];
              allevents
                .find((elm) => elm._id === closedid)
                .participant.map((el) => {
                  state = [...state, { users: el, consulted: false }];
                });
              dispatch(
                sendNotifications(
                  auth.user._id,
                  title,
                  content,
                  auth.user.role,
                  notiftype,
                  state,
                  compid
                )
              );
            }}
          >
            Agree
          </a>
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Organizer_events;
