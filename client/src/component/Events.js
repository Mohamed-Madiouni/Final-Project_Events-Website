import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCurrentUser } from "../actions/authaction";
import { fullEvent, openEvent } from "../actions/evntAction";
import { sendNotifications } from "../actions/notificationaction";
import {
  followEvent,
  getEvent,
  unfollowEvent,
  endEvent,
} from "../actions/evntAction";
import get_month from "../outils/get_month";
import historyevent from "../outils/history";
import Navbar from "./Navbar";
import "../events.css";
import M from "materialize-css";
import { ADD_FOCUS, GET_ERRORS, SHOW_MAP, STATE_MAP } from "../actions/types";
import calcul_rating from "../outils/calucle_rating";
import { formatRelative } from "date-fns";
import MyMap from "./Maps";
function Events() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allevents = useSelector((state) => state.events.allEvents);
  const [countevent, setCountevent] = useState(0);
  // const comment=useSelector(state=>state.comments.comment)
  const map = useSelector((state) => state.map);
  let auth = useSelector((state) => state.auth);
  let errors = useSelector((state) => state.errors);
  const [quickSearch, setQuickSearch] = useState({
    title: "",
    state: "",
    tags: "",
  });
  const [participate, setParticipate] = useState("");
  const [eventDate, setEventDate] = useState("");

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
  }, []);
  //check if events ended
  useEffect(() => {
    for (let i = 0; i < allevents.length; i++) {
      if (new Date(allevents[i].end) < new Date())
        dispatch(endEvent(allevents[i]._id));
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
  }, []);
  useEffect(() => {
    localStorage.token && dispatch(getCurrentUser());
    M.Modal.init(document.querySelectorAll(".modal"));
  }, []);
  useEffect(() => {
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

  //   useEffect(()=>{
  //     dispatch(makeComment(),getComment())
  // },[])
  // const [edit, setedit] = useState(false)
  // const [content, setContent] = useState("")
  // const editComment =(id)=>{
  //   dispatch(editComment(id,content))
  //   setedit(false)
  //   setContent("")
  // }
  // const EDITCOM =(e)=>{
  //   setContent(e.content)
  //   setedit(true)

  // }
  // const deleteComment = (comment) => {
  //   dispatch(deleteComment(comment._id))
  // }
  let events = allevents
    .filter((el) => el.state !== "Invalid")
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
      }}
    >
      <Navbar />
      {/* <Search
  quickSearch={quickSearch}
  setQuickSearch={setQuickSearch}/> */}

      {/* //         <div>
//              <Navbar/> */}

      {/* <div className='row container' ><h5><b>Quick search</b></h5></div> */}

      {/* 
            <div className="row container" 
            style={{marginLeft:"30px",marginTop:"20px",fontSize:15,fontWeight:800}} 
            >
          </div> */}

      {/* //      <form >
//               <div className="input-field col s4 m5">
//           <input placeholder="event title" id="title" type="text"  value ={quickSearch.title} onChange={onChange}/>
//           <label forhtml="title">Event title</label>
//         </div>
//         <div className="input-field col s4 m3">
//     <select id ="state" value={quickSearch.state} onChange={onChange} style={{display:"initial",marginTop:4,borderRadius:5,outline:"none"}}>
//       <option value="">State</option>
//       <option value="Available"  className="green-text">Available</option>
//       <option value="Closed" className="gray-text">Closed</option>
//       <option value="Ended" className="gray-text">Ended</option>
//     </select>
//     <label className="active">Event state</label>
//   </div>
//   <div className="input-field col s4 m4">
//           <input placeholder="Tags search" id="tags" type="text" value={quickSearch.tags} onChange={onChange}/>
//           <label forhtml="title">Event tags</label>
//         </div>
//               </form> */}

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
        quickSearch.tags !== "") && (
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

      <div className="row">
        <div style={{ marginLeft: "10px" }}>
          <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
            <div className="wpb_column vc_column_container col 12">
              <div className="vc_column-inner">
                <div className="wb_wrapper">
                  <div className="wpb_text_column wpb_content_element ">
                    <div className=" wpb_wrapper">
                      <h2>Upcoming Events</h2>
                      <p className="pra-2">Keep up with the latest events</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {events&&events.slice(0).reverse().map(el=>{ */}
        {/* return (
      <div className="col s12 m3 l2 xl3" key={el._id} style={{display:"flex",justifyContent:"center",alignItems:"center"}} > */}

        {events &&
          events
            .slice(0)
            .reverse()
            .slice(0, 12 + countevent * 12)
            .filter((el) => el.state !== "Invalid")
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
                    // key={el._id}
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
                              className="btn-small green white-text  pulse"
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
                                    // !auth.user.events.includes(el._id)&&
                                    setParticipate(el._id);
                                    // :dispatch(unfollowEvent(el._id))
                                  }}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: "5px",
                                  }}
                                  className="btn-small green white-text modal-trigger  pulse"
                                >
                                  Participate
                                </button>
                              )
                            : el.state !== "Ended" && (
                                <button
                                  data-target="modalevnt"
                                  onClick={() => {
                                    // !auth.user.events.includes(el._id)&&
                                    setParticipate(el._id);
                                    setEventDate(el.date);
                                    // :dispatch(unfollowEvent(el._id))
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
                    </div>

                    {/* <button
                        className="btn-floating waves-effect waves-light cadetblue modal-trigger"
                        title="delete"
                        data-target="modal1"
                        onClick={() => setDeleteid(el._id)}
                      >
                        <i className="material-icons ">delete</i>{" "}
                      </button>
                      {el.state==="Available"&&(
                    <button className="btn-floating waves-effect waves-light cadetblue modal-trigger" title="close"   data-target="modal2" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">block</i>{" "}
                    </button>)}
                    {el.state==="Closed"&&(new Date(el.date)>new Date())&&(
                    <button className="btn-floating waves-effect waves-light cadetblue modal-trigger" title="open"   data-target="modal3" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">done</i>{" "}
                    </button>)} */}
                  </div>
                  {/* {
                    el.comment.map(elt=>{
                      return(
                      <h6>
                      <span>{elt.postedBy.name}</span>
                      {elt.content}
                      </h6>
                      )
                    })} */}
                  {/* <form on onSubmit={(e)=>{
                    e.preventDefault()
                    makeComment(e.target.value,el._id)
                  }}>
                    <input type="text"
                     placeholder="add comment"
                     value={content} 
                    onChange={(e)=>setContent(e.target.value)}/>
                    <button 
                 style={{
                    width: "100%",
                    borderRadius: "3px",
                    height: "45px",
                  }} 
                  type="delete"
                  className="btn waves-effect waves-light hoverable " 
                  onClick={()=>deleteComment()}>Delete</button>
                
                    <button 
                     style={{
                        width: "100%",
                        borderRadius: "3px",
                        height: "45px",
                      }}
                     type="edit"
                      className="btn waves-effect waves-light hoverable "
                      onClick={() => EDITCOM(comment)}>Edit</button>
                  </form> */}
                </div>
              );
            })}
      </div>

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
                {/* {participate&&auth.user.banned_date&&((new Date(allevents.find(el=>el._id===participate).date)-new Date())/(1000*86400))>2?" you will not be able to subscribe again.":" you will be banned for a week"} */}{" "}
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

      {(countevent + 1) * 12 <
        events.filter((el) => el.state !== "Invalid").length && (
        <div
          style={{
            marginBottom: "5px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="loadMore"
          className="thb-gp-load-more"
          data-thb-gp-lm-type="event"
          data-org-text="MORE"
          onClick={() => {
            setCountevent(countevent + 1);
          }}
        >
          SHOW MORE
        </div>
      )}
      {/* <Footer/> */}
    </div>
  );
}

export default Events;
