import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import {closeEvent,getEventOrganizer, deleteEvent,openEvent, getEvent,endEvent} from "../actions/evntAction";
import { getCurrentUser } from "../actions/authaction";
import AddEvent from "./AddEvent";
 import "../organizer.css";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";
import { Link } from "react-router-dom";
import eventClosing from "../outils/eventClosing";
import Navbar from "./Navbar";



function Organizer_events({ history }) {
  
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const allevents= useSelector((state)=>state.events.allEvents)
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState("");
  const [action, setAction] = useState({ type: "add", payload: {} });
  const [deleteid,setDeleteid]= useState("")
  const [closedid,setClosedid]= useState("")
  const [participant,setParticipant]=useState(false)
  const [participantId,setParticipantId]=useState("")
  const toggle = () =>{ 
    setModal(!modal)
  return modal};
  const participantToggle= () => {
    setParticipant(!participant);
  return participant
  } 

  useEffect(() => {
    if (localStorage.token) {
      dispatch(getCurrentUser());
    }
  },[]);
  useEffect(() => {
    dispatch(getEventOrganizer());
  }, []);
  useEffect(() => {
    if (!localStorage.token) history.push("/");
    M.Modal.init(document.querySelectorAll(".modal"))
   
  });

  //check if events ended
  useEffect(()=>{
    dispatch(getEvent())
    for(let i=0;i<allevents.length;i++){
      if( new Date(eventClosing(allevents[i].date,allevents[i].duration))<new Date())
      dispatch(endEvent(allevents[i]._id))
    }
  },[])
  
  return (
      <>
      <Navbar/>
    {/* <div className="col s12">
        <Link
              to="/dashboard"
              className="btn-flat waves-effect"
              onClick={() =>
                dispatch({
                  type: GET_ERRORS,
                  payload: {},
                })
              }
            >
              <i className="material-icons left">keyboard_backspace</i> Back to
              dashboard
            </Link>
            </div> */}
            <div className="row">
      {events.events &&
        events.events.map((el) => {
          return (
            <div className={modal||participant ? "col s12 row":"col s12 m6 l4"}key={el._id} style={{minHeight:"350px"}}>
              <div className={modal||participant?"col s12 m6":"s12"} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                <div
                  className="card small sticky-action"
                  style={{
                    width: 350,
                    height:350
                  }}
                >
                  <div className="card-image waves-effect waves-block waves-light" style={{height:"55%"}}>
                    <img className="activator" src={el.image} />

                    <div className="date right">
                      <div className="day">{el.date.split("-")[2]}</div>
                      <div className="month">
                        {get_month(Number(el.date.split("-")[1]))}
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-content "
                    style={{ padding: "0px 10px 0px 24px" }}
                  >
                    <span className="card-title  grey-text text-darken-4">
                      <b>{el.title}</b>
                    </span>
                    <p className="red-text">{el.address}</p>
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
                          style={{ margin: 10, transform: "translateY(1.4px)" }}
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
                          style={{ margin: 10 }}
                        >
                          person
                        </i>

                        {el.nb_participant}
                      </span>
                    </div>
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
                    <Link
                    to="#"
                      onClick={()=>{
                        if(participant){
                        
                        setParticipant(participantToggle(participantToggle()));
                        }
                        if(!participant)
                        participantToggle()
                        setModal(false)
                        setParticipantId(el._id)
                      
                      }}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Show participants
                      <i className="material-icons ">arrow_forward</i>
                    </Link>
                    <span
                      className={
                        el.state == "Available"
                          ? "right green-text"
                          : "right gray-text text-darken-3"
                      }
                    >
                      {" "}
                      {el.state}
                    </span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      <b>{el.title}</b>
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{el.description}</p>
                    <div
                      className="right"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <a
                        className="btn-floating waves-effect waves-light cadetblue"
                        onClick={() => {
                          setAction({ type: "edit", payload: el });
                          if(modal){
                           
                            setModal(toggle( toggle()))
                          }
                          if(!modal)
                          toggle()
                          setParticipant(false)
                          setModalId(el._id)
                        }}
                        title="edit"
                      >
                        <i className="material-icons ">edit</i>
                      </a>
                      <button
                        className="btn-floating waves-effect waves-light cadetblue modal-trigger"
                        title="delete"
                        data-target="modal1"
                        onClick={() => setDeleteid(el._id)}
                      >
                        <i className="material-icons ">delete</i>{" "}
                      </button>
                      {el.state=="Available"&&(
                    <button className="btn-floating waves-effect waves-light cadetblue modal-trigger" title="close"   data-target="modal2" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">block</i>{" "}
                    </button>)}
                    {el.state=="Closed"&&(new Date(el.date)>new Date())&&(
                    <button className="btn-floating waves-effect waves-light cadetblue modal-trigger" title="open"   data-target="modal3" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">done</i>{" "}
                    </button>)}
                    </div>
                  </div>
                </div>
              </div>
              {modal && modalId==el._id&&<div className="col s12 m6" style={{overflowY:"scroll",height:"350px"}}><AddEvent toggle={toggle} action={action} setAction={setAction} /></div>}
              {participant&&participantId==el._id&&<div className="col s12 m6" style={{overflowY:"scroll",height:"350px"}}>
              <ul className="collection">
    <li className="collection-item avatar">
      <img src="user_icon.png" alt="" class="circle"/>
      <span class="title">Title</span>
      <p>First Line <br/>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    
  </ul>
            
              </div>}
            </div>
          );
        })} <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Event delete</h4>
            <p>Are you sure you want to delete this event?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=>dispatch(deleteEvent(deleteid))}
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
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
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=>dispatch(closeEvent(closedid))}
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
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
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=>dispatch(openEvent(closedid))}
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Cancel
            </a>
          </div>
        </div>
        </div>
        
    </>
  );
}

export default Organizer_events;
