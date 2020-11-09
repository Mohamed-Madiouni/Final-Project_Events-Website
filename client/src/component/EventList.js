import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteEvent,
  getEvents,
  validateEvent,
  invalidateEvent,
} from "../actions/adminaction";
import { getCurrentUser } from "../actions/authaction";
import { useHistory } from "react-router-dom";
import get_month from "../outils/get_month";
import historyevent from "../outils/history";
import "../events.css";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";
import {sendNotifications} from "../actions/notificationaction";
import { endEvent, fullEvent, openEvent } from "../actions/evntAction";
import { formatRelative } from "date-fns";
import MyMap from "./Maps";
import {ADD_FOCUS, SHOW_MAP, STATE_MAP  } from "../actions/types";
import calcul_rating from "../outils/calucle_rating";

const EventList = () => {
  const dispatch = useDispatch();
  const allevents = useSelector((state) => state.admin.events);
  let auth = useSelector((state) => state.auth);
  let allusers = useSelector((state) => state.admin.users);
  const map = useSelector(state=>state.map)
  const history = useHistory();
  const [deleteid, setDeleteid] = useState("");
  const [validateid, setValidateid] = useState("");
  const [Organizerid, setOrganizerid] = useState("");
  const [countevent, setCountevent] = useState(0);
  const [quickSearch, setQuickSearch] = useState({
    title: "",
    state: "",
    tags: "",
    address: "",
    description: "",
    id_organizer: "",
  });

  useEffect(() => {
    dispatch(getEvents());

    localStorage.token && dispatch(getCurrentUser());
    M.Modal.init(document.querySelectorAll(".modal"));
  }, []);
  useEffect(() => {
    M.Slider.init(document.querySelectorAll(".slider"), {
      height: 40,
      indicators: false,
    });
    M.updateTextFields();
  });
  useEffect(() => {
    M.Modal.init(document.querySelectorAll(".modal"));
  }, [allevents]);
  //check if events full
  useEffect(() => {
    for (let i = 0; i < allevents.length; i++) {
      if (
        allevents[i].participant.length == allevents[i].nb_participant &&
        allevents[i].state != "Ended"
      )
        dispatch(fullEvent(allevents[i]._id));
    }
  }, []);
  //check if events ended
  useEffect(() => {
    for (let i = 0; i < allevents.length; i++) {
      if (
       new Date(allevents[i].end)<new Date()
      )
        dispatch(endEvent(allevents[i]._id));
    }
  }, []);
  //open full events
  useEffect(() => {
    for (let i = 0; i < allevents.length; i++) {
      if (
        allevents[i].participant.length != allevents[i].nb_participant &&
        allevents[i].state == "Full"
      )
        dispatch(openEvent(allevents[i]._id));
    }
  }, []);

  let events = allevents.filter((el) => {
    return (
      el.title.toLowerCase().includes(quickSearch.title.toLowerCase()) &&
      el.state.toLowerCase().includes(quickSearch.state.toLowerCase()) &&
      el.address.address.toLowerCase().includes(quickSearch.address.toLowerCase()) &&
      el.description
        .toLowerCase()
        .includes(quickSearch.description.toLowerCase()) &&
      // el.id_organizer.toLowerCase().includes(quickSearch.id_organizer.toLowerCase())
      (allusers
        .find((elm) => elm._id == el.id_organizer)
        .fname.toLowerCase()
        .includes(quickSearch.id_organizer.toLowerCase()) ||
        allusers
          .find((elm) => elm._id == el.id_organizer)
          .lname.toLowerCase()
          .includes(quickSearch.id_organizer.toLowerCase()) ||
        (
          allusers
            .find((elm) => elm._id == el.id_organizer)
            .fname.toLowerCase() +
          " " +
          allusers.find((elm) => elm._id == el.id_organizer).lname.toLowerCase()
        ).includes(quickSearch.id_organizer.toLowerCase())) &&
      (quickSearch.tags != ""
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
    <div onClick={(e)=>{
      map.show&&!(document.querySelector(".map_container").contains(e.target)||document.querySelector("reach-portal").contains(e.target)||[...document.getElementsByClassName("address_map")].includes(e.target))&&
      dispatch({
        type:SHOW_MAP,
        payload:false
      })&&
      dispatch({
        type:STATE_MAP,
        payload:""
      })&&
      dispatch({
        type:ADD_FOCUS,
        payload:{}
      })
      
    }}>
       <div className="row quicksearch" style={{margin:"30px 15px 20px 15px",fontSize:15,height:250,paddingTop:45,position:"relative"}} >
     <h5 style={{position:"absolute",fontSize:35,left:5,top:-30}}><b>Looking for an event?</b></h5>
       <div className="col s12 l4" style={{fontStyle: "",fontSize:17,marginBottom:10}}>
   <p>Select an event title or choose an address or tags to find the one looking for.</p>
   </div>
   <div className="col s12 l8" style={{fontWeight:800,marginBottom:10}}>
   <form>
          <div className="input-field col s4">
            <input
              placeholder="Event title search"
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
                background:"transparent",
                border:"1px solid #9e9e9e"
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

          <div className="input-field col s4">
            <input
              placeholder="Address search"
              id="address"
              type="text"
              value={quickSearch.address}
              onChange={onChange}
            />
            <label forhtml="address">Event address</label>
          </div>

          <div className="input-field col s4">
            <input
              placeholder="Description search"
              id="description"
              type="text"
              value={quickSearch.description}
              onChange={onChange}
            />
            <label forhtml="description">Event description</label>
          </div>

          <div className="input-field col s4">
            <input
              placeholder="Organizer search"
              id="id_organizer"
              type="text"
              value={quickSearch.id_organizer}
              onChange={onChange}
            />
            <label forhtml="id_organizer">Event organizer</label>
          </div>
        </form>
   </div>
   </div>

      {/* <div>
        <h5>
          <b>Manage Events</b>
        </h5>
      </div>

      <div
        className="col s8 offset-s2"
        style={{ marginTop: "20px", fontSize: 15, fontWeight: 800 }}
      >
        <form>
          <div className="input-field col s4 m5">
            <input
              placeholder="Event title search"
              id="title"
              type="text"
              value={quickSearch.title}
              onChange={onChange}
            />
            <label forhtml="title">Event title</label>
          </div>
          <div className="input-field col s4 m3">
            <select
              id="state"
              value={quickSearch.state}
              onChange={onChange}
              style={{
                display: "initial",
                marginTop: 4,
                borderRadius: 5,
                outline: "none",
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
          <div className="input-field col s4 m4">
            <input
              placeholder="Tags search"
              id="tags"
              type="text"
              value={quickSearch.tags}
              onChange={onChange}
            />
            <label forhtml="title">Event tags</label>
          </div>

          <div className="input-field col s4 m4">
            <input
              placeholder="Address search"
              id="address"
              type="text"
              value={quickSearch.address}
              onChange={onChange}
            />
            <label forhtml="address">Event address</label>
          </div>

          <div className="input-field col s4 m4">
            <input
              placeholder="Description search"
              id="description"
              type="text"
              value={quickSearch.description}
              onChange={onChange}
            />
            <label forhtml="description">Event description</label>
          </div>

          <div className="input-field col s4 m4">
            <input
              placeholder="Organizer search"
              id="id_organizer"
              type="text"
              value={quickSearch.id_organizer}
              onChange={onChange}
            />
            <label forhtml="id_organizer">Event organizer</label>
          </div>
        </form>
      </div> */}
      { map.show&&<div className=" map_container" id="map">
<MyMap/>
        </div>}
      {(quickSearch.title != "" ||
        quickSearch.state != "" ||
        quickSearch.tags != "" ||
        quickSearch.address != "" ||
        quickSearch.description != "" ||
        quickSearch.id_organizer != "") && (
        // <div className="row" style={{ marginLeft: 10 }}>
        //   {" "}
        //   <h5>
        //     {" "}
        //     <b>{events.length + " result(s) found"}</b>{" "}
        //   </h5>
        // </div>
        <div className="row" style={{marginLeft:"10px"}} > 
              <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
              <div className="wpb_column vc_column_container col 12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    <div className="wpb_text_column wpb_content_element ">
                      <div className=" wpb_wrapper"> 
                      <h2>{events.length}</h2>
                        <p className="pra-2"> result(s) found </p>
                        </div></div></div></div></div></div> 
           

            </div>
      )}
      <div className="row">
        {events &&
          events
           .slice(0)
            .reverse() 
            .slice(0, 10 + countevent * 10)
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
                      height: 480,
                    }}
                    // key={el._id}
                  >
                    <div
                      className="card-image "
                      style={{ height: "55%", cursor: "pointer" }}
                    >
                      <img className="activator" src={el.image} height="100%" />

                      <div className="date right">
                        <div className="day">{el.start.split("T")[0].split("-")[2]}</div>
                        <div className="month">
                          {get_month(Number(el.start.split("T")[0].split("-")[1]))}
                        </div>
                      </div>
                      <div className="star_rate left">
                    <i className="material-icons" style={{color:"rgb(255, 180, 0)",fontSize:65,position:"relative"}}>star</i>
                    <p style={{position:"absolute",top:22,lineHeight:"normal",left:21.5,width:22,height:22, display:"flex",alignItems:"center",justifyContent:"center"}}>{el.rating.length==0?"--":calcul_rating(el.rating)}</p>
                    </div>
                    </div>
                    <div
                      className="card-content "
                      style={{ paddingBottom: 0, paddingTop: 0, height: 175 }}
                    >
                      <span className="card-title  grey-text text-darken-4" style={{height: "fit-content",lineHeight: "normal",marginTop: "2px",marginBottom:2}}>
                      {el.title.length<=20? <b>{el.title}</b>:<marquee scrolldelay={140} behavior="scroll" direction="left"><b>{el.title}</b></marquee> }
                  </span>
                  {el.address.address.length<=20?
                  <a href="#map" >
                  {/* <marquee  behavior="scroll" direction="left" scrolldelay={200}> */}
                    <p className="red-text address_map" style={{cursor:"pointer"}} onClick={()=>{
                      dispatch({
                       type:SHOW_MAP,
                       payload:true
                     })
                     
                     dispatch({
                       type:STATE_MAP,
                       payload:"show"
                     })
                     dispatch({
                       type:ADD_FOCUS,
                       payload:el.address
                     })
                   
 
                  }}><i className="fas fa-home" style={{marginRight:5}}></i>{el.address.address}</p>
                  {/* </marquee>  */}
                   </a>
                  
                  :<a href="#map" >
                 <marquee  behavior="scroll" direction="left" scrolldelay={140}><p className="red-text address_map" style={{cursor:"pointer"}} onClick={()=>{
                     dispatch({
                      type:SHOW_MAP,
                      payload:true
                    })
                    
                    dispatch({
                      type:STATE_MAP,
                      payload:"show"
                    })
                    dispatch({
                      type:ADD_FOCUS,
                      payload:el.address
                    })
                  

                 }}><i className="fas fa-home" style={{marginRight:5}}></i>{el.address.address}</p></marquee>  </a>}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: 13,
                          width: "100%",
                          justifyContent: "space-around",
                        }}
                      >
                        <span
                          style={{
                            margin: 7,
                            marginLeft: 0,
                            marginRight: 0,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className=" tiny material-icons"
                            style={{ margin: 5 }}
                          >
                            history
                          </i>

                          {historyevent(el.created_at)}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className=" tiny material-icons"
                            style={{ margin: 5 }}
                          >
                            person
                          </i>

                          {el.participant.length + "/" + el.nb_participant}
                        </span>
                      </div>

                      {el.tags.length != 0 && (
                        <div
                          className="slider "
                          style={{
                            height: 40,
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <ul className="slides">
                            {el.tags.map((el, i) => (
                              <li key={i}  style={{
                                justifyContent:"center",
                                alignItems: "center",
                                display: "flex",
                                zIndex:1
                              }}>
                                {" "}
                                <p className="chip">{el}</p>{" "}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          className={
                            el.state == "Available"
                              ? " green-text"
                              : " gray-text text-darken-3"
                          }
                        >
                          {" "}
                          {el.state}
                        </span>
                      </div>
                    </div>

                    <div
                      className="card-action"
                      style={{
                        padding: "5px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "90px",
                          height: "38px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          marginRight: 10,
                        }}
                        type="button"
                        className="btn btn-medium modal-trigger"
                        data-target="modal1"
                        onClick={() =>{
                          setDeleteid(el._id)
                          setOrganizerid(el.id_organizer)}}
                        disabled={auth.user.role!="administrator"}
                      >
                        Delete
                      </button>

                      {el.state === "Invalid" ? (
                        <button
                          style={{
                            width: "90px",
                            height: "38px",
                            borderRadius: "3px",
                            letterSpacing: "1px",
                            marginLeft: 10,
                          }}
                          type="button"
                          className="btn btn-medium modal-trigger"
                          data-target="modal2"
                          onClick={() => {
                            setOrganizerid(el.id_organizer)
                            setValidateid(el._id)}}
                        >
                          Valid
                        </button>
                      ) : (
                        <button
                          style={{
                            width: "100px",
                            height: "38px",
                            borderRadius: "3px",
                            letterSpacing: "1px",
                            marginLeft: 10,
                          }}
                          type="button"
                          className="btn btn-medium modal-trigger"
                          data-target="modal3"
                          onClick={() => {
                            setOrganizerid(el.id_organizer)
                            setValidateid(el._id)}}
                        >
                          Invalid
                        </button>
                      )}
                    </div>
                    <div className="card-reveal groupofnotes scrollbar"  id="style-3" style={{paddingRight:55,overflowWrap:"anywhere"}}>
                      <span className="card-title grey-text text-darken-4">
                        <b>{el.title}</b>
                        <i className="material-icons right" style={{position:"absolute",right:10,top:10}}>close</i>
                      </span>
                      <p style={{fontSize:13,color:"rgb(0, 96, 100)"}}>{formatRelative(new Date(el.start),new Date())+" - "+formatRelative(new Date(el.end),new Date())}</p>
                      <p style={{lineHeight:"normal"}}>{el.description}</p>
                      <div
                      className="right"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position:"absolute",
                        right:5,
                        top:65
                      }}
                    >
                      {" "}
                      <a
                        className="btn-floating cyan darken-3"
                        onClick={() => {
                          history.push(`/events/${el._id}`)
                          // setAction({ type: "edit", payload: el });
                          // if(modal){
                           
                          //   setModal(toggle( toggle()))
                          // }
                          // if(!modal)
                          // toggle()
                          // setParticipant(false)
                          // setModalId(el._id)
                        }}
                        title="Show comments"
                      >
                        <i className="material-icons ">comment</i>
                      </a> </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {(countevent + 1) * 12 < events.length && (
        <div style={{
           marginBottom:"5px",
           cursor: "pointer",
           display: "flex",
           justifyContent:"center",
           alignItems:"center"}}
           id="loadMore" className="thb-gp-load-more"
           data-thb-gp-lm-type="event"
           data-org-text="MORE"
           onClick={() => {
           setCountevent(countevent + 1);
        }}>SHOW MORE</div>)}

      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Event delete</h4>
          <p>Are you sure you want to delete this event?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() => {              
              let title="Event Deleted";
              let content= "The event " +  allevents.find((elm) => elm._id==deleteid).title +" was deleted by " + auth.user.fname + " "+ auth.user.lname;
              let notiftype="Event_Deleted";
              let compid=deleteid
              var state=[]
              state=[...state,{users:Organizerid,consulted:false}]
              allevents.find((elm) => elm._id ==deleteid).participant.map(el=>{
                state=[...state,{users:el._id,consulted:false}]
              })
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))  
              dispatch(deleteEvent(deleteid))}}
          >
            Agree
          </a>
          <a href="#!" className="modal-close  btn-flat">
            Cancel
          </a>
        </div>
      </div>

      <div id="modal2" className="modal">
        <div className="modal-content">
          <h4>Event Validate</h4>
          <p>Are you sure you want to validate this event?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() => {
              let title="New Event";
              let content= `A new event was Added by ${allusers.find(el=>el._id==Organizerid).fname} ${allusers.find(el=>el._id==Organizerid).lname}` ;
              let notiftype="Event_Validation";
              let compid=validateid
              var state=[];
              state=[...state,{users:Organizerid,consulted:false}]
              allusers.filter((elm) => elm.follow.includes(Organizerid)).map(el=>{
              state=[...state,{users:el._id,consulted:false}]
             })
              dispatch(sendNotifications(Organizerid,title,content,auth.user.role, notiftype,state,compid))
              dispatch(validateEvent(validateid))
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
          <h4>Event invalidate</h4>
          <p>Are you sure you want to invalidate this event?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() =>{
              let title="Event Invalidated";
              let content= "The event " + allevents.find((elm) => elm._id==validateid).title + " was invalidated by " + auth.user.fname + " " + auth.user.lname;
              let notiftype="Event_Invalidation";
              let compid=validateid
              var state=[]              
              state=[...state,{users:Organizerid,consulted:false}]
              allevents.find((elm) => elm._id ==validateid).participant.map(el=>{
                state=[...state,{users:el,consulted:false}]
              })
              dispatch(invalidateEvent(validateid))
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
            }}
          >
            Agree
          </a>
          <a href="#!" className="modal-close  btn-flat">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};
export default EventList;
