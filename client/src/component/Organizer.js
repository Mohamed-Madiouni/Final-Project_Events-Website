import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {closeEvent,getEventOrganizer, deleteEvent,openEvent,getEvent,endEvent, fullEvent} from "../actions/evntAction";
import get_month from "../outils/get_month"
import history from "../outils/history"
import AddEvent from "./AddEvent";
import "../organizer.css";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";
import { GET_ERRORS } from "../actions/types";
import { logoutUser } from "../actions/authaction";


function Organizer() {
  
  
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const auth = useSelector((state) => state.auth);
  const allevents= useSelector((state)=>state.events.allEvents)
  const errors=useSelector(state=>state.errors)
  const hisstory = useHistory();
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState({ type: "add", payload: {} });
  const [deleteid,setDeleteid]= useState("")
  const [closedid,setClosedid]= useState("")
  const toggle = () => {
    setModal(!modal)
  return modal
  };
  
  useEffect(() => {
    if (auth.user.banned===true) {
        dispatch(logoutUser());
        history.push("/banned")
       }
  });


  useEffect(() => {
    dispatch(getEventOrganizer());
    dispatch(getEvent())
  }, []);
  

//check if events full
useEffect(()=>{
  
  for(let i=0;i<allevents.length;i++){
    if( allevents[i].participant.length==allevents[i].nb_participant&&allevents[i].state!="Ended")
    dispatch(fullEvent(allevents[i]._id))
  }

  for(let i=0;i<events.events.length;i++){
    if( events.events[i].participant.length==events.events[i].nb_participant&& events.events[i].state!="Ended")
    dispatch(fullEvent(events.events[i]._id))
  }

},[])
//check if events ended
useEffect(()=>{
  
  for(let i=0;i<allevents.length;i++){
    if( new Date(eventClosing(allevents[i].date,allevents[i].duration))<new Date())
    dispatch(endEvent(allevents[i]._id))
  }

  for(let i=0;i<events.events.length;i++){
    if( new Date(eventClosing(events.events[i].date,events.events[i].duration))<new Date())
    dispatch(endEvent(events.events[i]._id))
  }
},[])
//open full events
useEffect(()=>{
  for(let i=0;i<allevents.length;i++){
    if( allevents[i].participant.length!=allevents[i].nb_participant&&allevents[i].state=="Full")
    dispatch(openEvent(allevents[i]._id))
  }
  for(let i=0;i<events.events.length;i++){
    if( events.events[i].participant.length!=events.events[i].nb_participant&&events.events[i].state=="Full")
    dispatch(openEvent(events.events[i]._id))
  }
},[])
 useEffect(()=>{
    M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    M.Slider.init(document.querySelectorAll(".slider"), { height: 40,indicators:false });
    if(errors.deleted){
      M.toast({ html: "Event deleted successfully", classes: "green" });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    }
  })

  return (
   <>
      { auth.user.alerted_date && new Date()<new Date(auth.user.alerted_date) &&
        <i className="fas fa-exclamation-circle" style={{color:"red",fontSize:15,marginTop:5}}>You are alerted until {auth.user.alerted_date=!null && auth.user.alerted_date.split('.')[0]}, a second alert will automatically ban your account 
        </i>
        }
     
    
     
      <div className="col s12 row">
        
        <div className="col s10 l6 organizer_hi">
          <div
            className="col s12"
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
         
        </div>
        <div
          className="col s2 l6"
          style={{
            paddingRight: "0px",
          }}
        >
          <div className="organizer_nav">
            <div>
              <a className="btn-floating  cadetblue">
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
              <Link className="btn-floating  cadetblue" to={`/dashboard/${auth.user._id}`}>
                <i className="material-icons" title="Show my events">
                  assignment
                </i>
                
              </Link>

              <label htmlFor="">Show my events</label>
            </div>
          </div>
        </div>
      </div>


      {modal && (<div className="container organizer_add row">
        <AddEvent toggle={toggle} action={action} setAction={setAction} /></div>
      )}

{/* <div className="container organizer_add row" >
        <AddEvent toggle={toggle} action={action} setAction={setAction} /></div> */}


<div className="col s12">
  <h5 className="teal-text text-darken-4" style={{marginLeft:10}}> <b>Your last events</b> </h5>
</div>
        {events.events==0&&
        <div  style={{marginLeft:10}}>
          <h4> <b>Your dashboard is empty, get started and create events</b> </h4>
        </div>
        
        }
      <div className="row card_event">
        {events.events &&
          events.events.slice(-6).reverse().map((el) => {
            return (
              <div className="col s12 m6 l4" style={{display:"flex",justifyContent:"center",alignItems:"center"}} key={el._id}>
              <div
               
                className="card medium sticky-action "
                style={{
                  width: 370,
                  height:370
                }}
              >
                <div className="card-image" style={{height:"65%",cursor:"pointer"}}>
                  <img className="activator" src={el.image} height="100%" width="100%" />

                  <div className="date right">
                    <div className="day">{el.date.split("-")[2]}</div>
                    <div className="month">
                      {get_month(Number(el.date.split("-")[1]))}
                    </div>
                  </div>
                 
                </div>
                <div
                  className="card-content  "
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
                        style={{ margin: 10,marginTop:10 }}
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
                        style={{ margin: 10,marginTop:8 }}
                      >
                        person
                      </i>

                      {el.participant.length+"/"+el.nb_participant} 
                    </span>
                  </div>
                  {el.tags.length!=0&&<div className="slider right tag_slide_home">
    <ul className="slides">
              {el.tags.map((el,index)=><li key={index}> <p>{el}</p> </li>)}
    </ul>
  </div>}
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
                    to={`/dashboard/${el.id_organizer}`}
                    style={{ display: "flex", alignItems: "center" ,fontSize:13}}
                  >
                    Show more
                    <i className="material-icons " style={{fontSize:15,marginLeft:3}}>arrow_forward</i>
                  </Link>
                  <span className={el.state=="Available"?"right green-text":"right gray-text text-darken-3"}> {el.state}</span>
                </div>
                <div className="card-reveal"  >
                
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
                   {/* ((new Date(el.date)-new Date())/(1000*86400))>3&& */}
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
                    {el.state=="Closed"&&(
                    <button className="btn-floating waves-effect waves-light cadetblue modal-trigger" title="open"   data-target="modal3" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">done</i>{" "}
                    </button>)}

                    {el.state=="Available"&&(
                    <div>
                      {" "}
                      <a
                        className="btn-floating  cadetblue"
                        onClick={() => {
                          hisstory.push(`/events/${el._id}`)
                         }}
                        title="Show comments"
                      >
                        <i className="material-icons ">comment</i>
                      </a> </div>
                       )}
                  </div>
                </div>
              </div>
              </div>
            );
          })}
         
      </div>
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
              href="#"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=>dispatch(closeEvent(closedid))}
            >
              Agree
            </a>
            <a
              href="#"
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
     </>
  );
}

export default Organizer;
