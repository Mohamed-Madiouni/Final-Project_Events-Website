import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {closeEvent,getEventOrganizer, deleteEvent,openEvent,getEvent,endEvent} from "../actions/evntAction";
import get_month from "../outils/get_month"
import history from "../outils/history"
import AddEvent from "./AddEvent";
import "../organizer.css";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";


function Organizer() {
  
  
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const auth = useSelector((state) => state.auth);
  const allevents= useSelector((state)=>state.events.allEvents)
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState({ type: "add", payload: {} });
  const [deleteid,setDeleteid]= useState("")
  const [closedid,setClosedid]= useState("")
  const toggle = () => setModal(!modal);
  
  
  useEffect(() => {
    dispatch(getEventOrganizer());
  }, []);
  
//check if events ended
useEffect(()=>{
  dispatch(getEvent())
  for(let i=0;i<allevents.length;i++){
    if( new Date(eventClosing(allevents[i].date,allevents[i].duration))<new Date())
    dispatch(endEvent(allevents[i]._id))
  }
},[])
 

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
              This is your <b>Dashboard</b>, you can create edit and delete an
              event.
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
              <Link className="btn-floating waves-effect waves-light cadetblue" to={`/events/${auth.user._id}`}>
                <i className="material-icons" title="Show my events">
                  assignment
                </i>
                
              </Link>

              <label htmlFor="">Show my events</label>
            </div>
          </div>
        </div>
      </div>


      {modal && (<div className="col s10 offset-s2">
        <AddEvent toggle={toggle} action={action} setAction={setAction} /></div>
      )}
<div className="col s12">
  <h5 className="teal-text text-darken-4"> <b>Your last events</b> </h5>
</div>
      <div className="col s12 card_event">
        {events.events &&
          events.events.slice(0, 6).map((el) => {
            return (
              <div
                key={el._id}
                className="card medium sticky-action"
                style={{
                  width: 400,
                }}
              >
                <div className="card-image waves-effect waves-block waves-light">
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

                      {history(el.created_at)}
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
                    to={`/events/${el.id_organizer}`}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Plus de details
                    <i className="material-icons ">arrow_forward</i>
                  </Link>
                  <span className={el.state=="Available"?"right green-text":"right gray-text text-darken-3"}> {el.state}</span>
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
                        toggle();
                      }}
                      title="edit"
                    >
                      <i className="material-icons ">edit</i>
                    </a>
                    <button className="btn-floating waves-effect waves-light cadetblue modal-trigger" title="delete"   data-target="modal1" onClick={
                      ()=>setDeleteid(el._id)
                    }>
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
            );
          })}
          <div id="modal1" className="modal">
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
      
    </div>
  );
}

export default Organizer;
