import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  unfollowEvent,
  followEvent,
  getEvent,
  endEvent,
  fullEvent,
  openEvent,
} from "../actions/evntAction";
import get_month from "../outils/get_month";
import "../organizer.css";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";
import { GET_ERRORS, ADD_FOCUS, SHOW_MAP, STATE_MAP } from "../actions/types";
import { getMyEvents, getCurrentUser } from "../actions/authaction";
import historyevent from "../outils/history";
import { getUsers } from "../actions/adminaction";
import "../participant.css";
import calcul_rating from "../outils/calucle_rating";
import { formatRelative } from "date-fns";
import MyMap from "./Maps";
import getlenthorg, { getlastdateorg } from "../outils/geteventorg";
import { sendNotifications } from "../actions/notificationaction";
import Count from "./Count";

function Participant() {
  const dispatch = useDispatch();
  const history = useHistory();
  const map = useSelector((state) => state.map);
  const sanctions = useSelector((state) => state.auth.sanctions);
  const auth = useSelector((state) => state.auth);
  const allevents = useSelector((state) => state.events.allEvents);
  const errors = useSelector((state) => state.errors);
  const myevents = useSelector((state) => state.myevents.myevents.events);
  const users = useSelector((state) => state.admin.users);
  const [quickSearch, setQuickSearch] = useState({
    title: "",
    state: "",
    tags: "",
  });
  const [participate, setParticipate] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [clkwidth, setclkwidth] = useState(false);

  let usermail = auth.user.email;
  var useralert = sanctions
    .filter((el) => el.email === usermail && el.type === "alert")
    .pop();

  //check if events full
  useEffect(() => {
    dispatch(getEvent());
    for (let i = 0; i < allevents.length; i++) {
      if (
        allevents[i].participant.length === allevents[i].nb_participant &&
        allevents[i].state !== "Ended"
      )
        dispatch(fullEvent(allevents[i]._id));
    }
    if (myevents)
      for (let i = 0; i < myevents.length; i++) {
        if (
          myevents[i].participant.length === myevents[i].nb_participant &&
          myevents[i].state !== "Ended"
        )
          dispatch(fullEvent(myevents[i]._id));
      }
  }, []);
  //check if events ended
  useEffect(() => {
    for (let i = 0; i < allevents.length; i++) {
      if (new Date(allevents[i].end) < new Date())
        dispatch(endEvent(allevents[i]._id));
    }
    dispatch(getMyEvents());
    if (myevents)
      for (let i = 0; i < myevents.length; i++) {
        if (new Date(myevents[i].end) < new Date())
          dispatch(endEvent(myevents[i]._id));
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
    if (myevents)
      for (let i = 0; i < myevents.length; i++) {
        if (
          myevents[i].participant.length !== myevents[i].nb_participant &&
          myevents[i].state === "Full"
        )
          dispatch(openEvent(myevents[i]._id));
      }
  }, []);

  useEffect(() => {
    localStorage.token && dispatch(getCurrentUser());
    M.Modal.init(document.querySelectorAll(".modal"));
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
    M.Slider.init(document.querySelectorAll(".slider"), {
      height: 60,
      indicators: false,
    });
    M.updateTextFields();
    if (errors.banned) {
      M.toast({
        html: `Your account has been banned from subscribtion to any event !! \n your restriction will end in ${new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 7
        )}  `,
        classes: "red darken-4",
        displayLength: 10000,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    }
  });
  let events =
    myevents &&
    myevents
      .filter((el) => el.state !== "Invalid")
      .filter((el) => el.state !== "Closed")
      .filter((el) => {
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
        clkwidth &&
          !document.querySelector(".organizer_list").contains(e.target) &&
          setclkwidth(!clkwidth);
      }}
    >
      {useralert &&
        useralert.canceled === false &&
        new Date(eventClosing(useralert.created_at, useralert.duration)) >
          new Date() && (
          <i
            className="fas fa-exclamation-circle"
            style={{ color: "red", fontSize: 15, marginTop: 5 }}
          >
            You are alerted by{" " + useralert.author + " "}until{" "}
            {eventClosing(useralert.created_at, useralert.duration)
              .split(".")[0]
              .replace("T", " ")}{" "}
            <br />A second alert could result a ban of your account, reason:{" "}
            {" " + useralert.reason}
          </i>
        )}

      <div
        className=" row"
        style={{ verticalAlign: "middle", margin: "30px 15px 20px 15px" }}
      >
        <div className=" col s12 organizer_hi ">
          <p className="h5-tit">
            {auth.user.fname} {auth.user.lname}
          </p>
          <span className="blue-title">Hi there,</span>
          <p className="para-blue">
            {" "}
            We are happy to see you among US. <br />
            This is your <b>Dashboard</b>, you can see all your events that you
            have been participated.
          </p>
        </div>
      </div>
      {myevents &&
        myevents.length !== 0 &&
        myevents.filter(
          (el) =>
            new Date(el.start) > new Date() &&
            el.state !== "Ended" &&
            el.state !== "Invalid" &&
            el.state !== "Closed"
        ).length !== 0 && (
          <div
            className=" row"
            style={{
              verticalAlign: "middle",
              margin: "30px 15px 20px 15px",
              backgroundColor: " rgb(44, 44, 44)",
              color: "white",
            }}
          >
            <div
              className=" col s12 organizer_hi "
              style={{ padding: 0, margin: 0 }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <p
                  className="h5-tit"
                  style={{ paddingTop: 10, color: "white" }}
                >
                  Get ready !! <br /> Your next event start in
                </p>
                <Count
                  date={
                    myevents &&
                    myevents
                      .filter((el) => new Date(el.start) > new Date())
                      .filter((el) => el.state !== "Ended")
                      .filter((el) => el.state !== "Invalid")
                      .filter((el) => el.state !== "Closed")
                      .sort(function (a, b) {
                        return new Date(a.start) - new Date(b.start);
                      })[0]
                      .start.split("T")
                      .join(" ")
                  }
                />
              </div>
            </div>
          </div>
        )}

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
        <h5 style={{ position: "absolute", fontSize: 35, left: 5, top: -30 }}>
          <b>Looking for an event?</b>
        </h5>
        <div
          className="col s12 l4"
          style={{ fontStyle: "", fontSize: 17, marginBottom: 10 }}
        >
          {/* <p>Select an event state or choose title or tag to discover best events for you.</p> */}

          <p>
            Select an event state or choose title or tag to find the desired one
            from your list.
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
        events.length !== 0 && (
          // <div className="row" style={{marginLeft:10}} > <h5> <b>{events.length+" result(s) found"}</b> </h5></div>
          <div className="row" style={{ marginLeft: "10px" }}>
            <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
              <div className="wpb_column vc_column_container col 12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    <div className="wpb_text_column wpb_content_element ">
                      <div className=" wpb_wrapper">
                        <h2>{events.length}</h2>
                        <p className="pra-2"> result(s) found </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {events && events.length !== 0 ? (
        <div className="row" style={{ marginLeft: "10px", marginTop: "20px" }}>
          <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
            <div className="wpb_column vc_column_container col 12">
              <div className="vc_column-inner">
                <div className="wb_wrapper">
                  <div className="wpb_text_column wpb_content_element ">
                    <div className=" wpb_wrapper">
                      <h2>Your participation</h2>
                      <p className="pra-2">Keep up with the latest events</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {events &&
            events
              .filter((el) => el.state !== "Invalid")
              .filter((el) => el.state !== "Closed")
              .slice(0)
              .reverse()
              .map((el) => {
                return (
                  <div
                    className="col s12 m6 l4 xl3"
                    key={el._id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="card small sticky-action"
                      style={{
                        width: 335,
                        height: 350,
                        margin: 5,
                      }}
                    >
                      <div
                        className="card-image "
                        style={{ height: "55%", cursor: "pointer" }}
                      >
                        <img
                          className="activator"
                          src={el.image}
                          height="100%"
                          alt=""
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
                        className="card-content "
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
                            fontSize: 13,
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              margin: 10,
                              marginLeft: 0,
                              marginRight: 0,
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
                          <div className="slider right tag_slide_event">
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
                        {!auth.isAuthenticated
                          ? el.state === "Available" && (
                              <button
                                onClick={() => {
                                  history.push("/login");
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  borderRadius: "5px",
                                }}
                                className="btn-small green white-text"
                              >
                                Participate
                              </button>
                            )
                          : auth.user.role === "participant" &&
                            !auth.user.cancelation.includes(el._id) &&
                            (!auth.user.events.includes(el._id)
                              ? el.state === "Available" && (
                                  <button
                                    data-target="modalevnt"
                                    onClick={() => {
                                      setParticipate(el._id);
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      borderRadius: "5px",
                                    }}
                                    className="btn-small green white-text modal-trigger"
                                  >
                                    Participate
                                  </button>
                                )
                              : el.state !== "Ended" && (
                                  <button
                                    data-target="modalevnt"
                                    onClick={() => {
                                      setParticipate(el._id);
                                      setEventDate(el.date);
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      borderRadius: "5px",
                                    }}
                                    className="btn-small red white-text modal-trigger"
                                  >
                                    Cancel
                                  </button>
                                ))}
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
                            className="material-icons right"
                            style={{ position: "absolute", right: 10, top: 10 }}
                          >
                            close
                          </i>
                        </span>
                        <p style={{ fontSize: 13, color: "rgb(0, 96, 100)" }}>
                          {formatRelative(new Date(el.start), new Date()) +
                            " - " +
                            formatRelative(new Date(el.end), new Date())}
                        </p>
                        <p style={{ lineHeight: "normal" }}>{el.description}</p>
                        <div
                          className="right"
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
                          <a
                            className="btn-floating  cyan darken-3"
                            onClick={() => {
                              history.push(`/events/${el._id}`);
                            }}
                            title="Show comments"
                          >
                            <i className="material-icons ">comment</i>
                          </a>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      ) : quickSearch.title !== "" ||
        quickSearch.state !== "" ||
        quickSearch.tags !== "" ? (
        <div className="row" style={{ marginLeft: "10px" }}>
          <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
            <div className="wpb_column vc_column_container col 12">
              <div className="vc_column-inner">
                <div className="wpb_wrapper">
                  <div className="wpb_text_column wpb_content_element ">
                    <div className=" wpb_wrapper">
                      <h2>{events.length}</h2>
                      <p className="pra-2"> result(s) found </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: 10 }}>
          {/* <h4> <b>Your dashboard is empty, get started and join events</b> </h4> */}
          <div className="row">
            <div className="col s12 l6" id="down">
              <h1 className="title-h">Your dashboard is empty</h1>
              <p className="title-p">Get started and join events.</p>

              <button className="title-btn">
                <Link to="/events">Get Started</Link>
              </button>
            </div>
            <div className="col s12 l6" id="up">
              <img
                className="working-img"
                src="/illustration-working.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      <div id="modalevnt" className="modal">
        <div className="modal-content">
          {participate && !auth.user.events.includes(participate) ? (
            <>
              <h4>Hi, {auth.user.fname}</h4>
              <p>
                You are about to subscribe to{" "}
                {participate && (
                  <b>{allevents.find((el) => el._id === participate).title}</b>
                )}{" "}
                event, Please note that:{" "}
              </p>
              <br />
              <ol>
                <li>
                  You can't subscribe to the same event after <b>annulation</b>.{" "}
                </li>
                <li>
                  You are responsible for all comments you send, in case of non
                  respect your account will be <b>alerted</b> and you risk to
                  get <b>banned</b> from the admin.
                </li>
              </ol>
            </>
          ) : (
            <>
              <h4>Event annulation</h4>
              <p>
                Are you sure you want to cancel the{" "}
                {participate && (
                  <b>{allevents.find((el) => el._id === participate).title}</b>
                )}{" "}
                event?
                {/* {participate&&((new Date(allevents.find(el=>el._id===participate).date)-new Date())/(1000*86400))>2?" you will not be able to subscribe again.":" you will be banned for a week"} */}{" "}
                you will not be able to <b>subscribe</b> again.
              </p>
            </>
          )}
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() => {
              if (auth.isAuthenticated) {
                if (participate && !auth.user.events.includes(participate)) {
                  dispatch(followEvent(participate));
                  let title = "New Participation";
                  let content =
                    auth.user.fname +
                    " " +
                    auth.user.lname +
                    " participate to " +
                    allevents.find((el) => el._id === participate).title;
                  let notiftype = "New_Participation";
                  let compid = allevents.find((el) => el._id === participate)
                    ._id;
                  let state = [];
                  state = [
                    ...state,
                    {
                      users: allevents.find((el) => el._id === participate)
                        .id_organizer,
                      consulted: false,
                    },
                  ];
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
                } else {
                  dispatch(unfollowEvent(participate, eventDate));
                  let title = "Cancel Participation";
                  let content =
                    auth.user.fname +
                    " " +
                    auth.user.lname +
                    " cancelled participation to " +
                    allevents.find((el) => el._id === participate).title;
                  let notiftype = "Cancel_Participation";
                  let compid = allevents.find((el) => el._id === participate)
                    ._id;
                  let state = [];
                  state = [
                    ...state,
                    {
                      users: allevents.find((el) => el._id === participate)
                        .id_organizer,
                      consulted: false,
                    },
                  ];
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
                }
              }
            }}
          >
            Agree
          </a>
          <a href="#!" className="modal-close  btn-flat">
            Cancel
          </a>
        </div>
      </div>
      {/* <Footer/> */}
      {users.length !== 0 &&
        auth.user.follow.length !== 0 &&
        allevents.length !== 0 && (
          <div className="organizer_list">
            <div
              className="groupofnotes scrollbar"
              id="style-3"
              style={{
                width: clkwidth ? 300 : 0,
                boxShadow:
                  clkwidth && "0px 8px 20px 0px rgba(24, 32, 111, 0.8)",
              }}
            >
              <ul className="collection par">
                {auth.user.follow.map((el, i) => {
                  return (
                    <Link to={`/organizer/${el}`} key={i}>
                      <li style={{ height: "fit-content", padding: 5 }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "center",
                            width: 80,
                          }}
                        >
                          <img
                            src={users.find((elm) => elm._id === el).avatar}
                            alt=""
                            className="circle"
                          />
                          <span className="title">
                            <b>
                              {users
                                .find((elm) => elm._id === el)
                                .fname.slice(0, 8)}
                            </b>
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexDirection: "column",
                            width: 200,
                            paddingLeft: 10,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <span>
                              <b>Events :</b>{" "}
                            </span>
                            <p style={{ marginLeft: 5, lineHeight: "normal" }}>
                              {" " + getlenthorg(allevents, el)}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <span>
                              {" "}
                              <b>Last update :</b>{" "}
                            </span>
                            <span
                              style={{ marginLeft: 5, lineHeight: "normal" }}
                            >
                              {" " +
                                formatRelative(
                                  new Date(getlastdateorg(allevents, el)),
                                  new Date()
                                )}
                            </span>
                          </div>
                        </div>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>

            {!clkwidth && (
              <a
                title="Subscriptions"
                href="#!"
                style={{
                  cursor: "pointer",
                  boxShadow: "0px 8px 20px 0px rgba(24, 32, 111, 0.8)",
                }}
                onClick={() => setclkwidth(!clkwidth)}
              >
                <i className="fas fa-angle-double-right"></i>
              </a>
            )}
          </div>
        )}
    </div>
  );
}

export default Participant;
