import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import {closeEvent,getEventOrganizer, deleteEvent,openEvent, getEvent,endEvent, getParticipant, fullEvent} from "../actions/evntAction";
import { getCurrentUser } from "../actions/authaction";
import AddEvent from "./AddEvent";
 import "../organizer.css";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";
import { Link } from "react-router-dom";
import eventClosing from "../outils/eventClosing";
import Navbar from "./Navbar";
import "../organizer_event.css";
import { logoutUser } from "../actions/authaction";


function Organizer_events({ history }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const allevents= useSelector((state)=>state.events.allEvents)
  const errors=useSelector(state=>state.errors)
  const allparticipant=useSelector(state=>state.participant)
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState("");
  const [action, setAction] = useState({ type: "add", payload: {} });
  const [deleteid,setDeleteid]= useState("")
  const [closedid,setClosedid]= useState("")
  const [participant,setParticipant]=useState(false)
  const [participantId,setParticipantId]=useState("")
 const [btnedit,setBtnedit]=useState("")
 const [btnpart,setBtnPart]=useState("")
 

 const [quickSearch, setQuickSearch] = useState({
  title: "",
  state: "",
  tags: "",
});
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
    M.Modal.init(document.querySelectorAll(".modal"))
  },[]);

  // useEffect(()=>{
  //   return ()=>M.Modal.init(document.querySelectorAll(".modal"))
  // })
  useEffect(() => {
    dispatch(getEventOrganizer());
    
    dispatch(getParticipant())
  }, []);
  useEffect(() => {
    if (!localStorage.token) history.push("/");
     
    M.Slider.init(document.querySelectorAll(".slider"), { height: 40,indicators:false});
    M.updateTextFields()
    
    // return ()=>{setModal(false)}
    if(errors.deleted){
      M.toast({ html: "Event deleted successfully", classes: "green" });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    }
    // M.Modal.init(document.querySelectorAll(".modal"))
  });

 
//check if events full
useEffect(()=>{
  for(let i=0;i<allevents.length;i++){
    if( allevents[i].participant.length==allevents[i].nb_participant)
    dispatch(fullEvent(allevents[i]._id))
  }
  for(let i=0;i<allparticipant.length;i++){
    if( allparticipant.participant[i].participant.length==allparticipant.participant[i].nb_participant)
    dispatch(fullEvent(allparticipant.participant[i]._id))
  }
},[]) 
//check if events ended
  useEffect(()=>{
    dispatch(getEvent())
    for(let i=0;i<allevents.length;i++){
      if( new Date(eventClosing(allevents[i].date,allevents[i].duration))<new Date())
      dispatch(endEvent(allevents[i]._id))
    }
    for(let i=0;i<allparticipant.participant.length;i++){
      if( new Date(eventClosing(allparticipant.participant[i].date,allparticipant.participant[i].duration))<new Date())
      dispatch(endEvent(allparticipant.participant[i]._id))
    }
  },[])

useEffect(() => {
  if (auth.user.banned===true) {
      dispatch(logoutUser());
      history.push("/banned")
     }
});

//open full events
useEffect(()=>{
  for(let i=0;i<allevents.length;i++){
    if( allevents[i].participant.length!=allevents[i].nb_participant&&allevents[i].state=="Full")
    dispatch(openEvent(allevents[i]._id))
  }
  for(let i=0;i<allparticipant.length;i++){
    if( allparticipant.participant[i].participant.length!=allparticipant.participant[i].nb_participant&&allparticipant.participant[i].state=="Full")
    dispatch(openEvent(allparticipant.participant[i]._id))
  }
},[])
  let eventsorganizer=allparticipant.participant.filter(el=>{
    return(
    
     el.title.toLowerCase().includes(quickSearch.title.toLowerCase())
     &&el.state.toLowerCase().includes(quickSearch.state.toLowerCase())
     &&(quickSearch.tags!=""?el.tags.find(e=>e.toLowerCase().includes(quickSearch.tags.toLowerCase())):true)
     
     )
   })


  const onChange = (e) => {
    setQuickSearch({ ...quickSearch, [e.target.id]: e.target.value })};
  
  return (
      <>
      <Navbar/>

      <div className='row container' ><h5><b>Quick search</b></h5></div>

<div className="row container" style={{marginTop:"20px",fontSize:15,fontWeight:800}} >
  <form >
  <div className="input-field col s4 m5">
<input placeholder="event title" id="title" type="text"  value ={quickSearch.title} onChange={onChange}/>
<label forhtml="title">Event title</label>
</div>
<div className="input-field col s4 m3">
<select id ="state" value={quickSearch.state} onChange={onChange} style={{display:"initial",marginTop:4,borderRadius:5,outline:"none"}}>
<option value="">State</option>
<option value="Available" className="green-text">Available</option>
<option value="Closed" className="gray-text">Closed</option>
<option value="Ended" className="gray-text">Ended</option>
</select>
<label className="active">Event state</label>
</div>
<div className="input-field col s4 m4">
<input placeholder="Tags search" id="tags" type="text" value={quickSearch.tags} onChange={onChange}/>
<label forhtml="title">Event tags</label>
</div>
  </form>
</div>
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
           { (quickSearch.title!="" || quickSearch.state!="" || quickSearch.tags!="")&&eventsorganizer.length!=0&&
            
            <div className="row" style={{marginLeft:10}} > <h5> <b>{eventsorganizer.length+" result(s) found"}</b> </h5></div>}
            {eventsorganizer.length!=0?
            <div className="row">
      {eventsorganizer&&
        eventsorganizer.slice(0).reverse().map((el) => {
          return (
            <div className={modal||participant ? "col s12 row":"col s12 m6 l4"}key={el._id} style={{minHeight:"360px"}}>
              <div className={modal||participant?"col s12 m6":"s12"} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                <div
                  className="card small sticky-action"
                  style={{
                    width: 350,
                    height:350,
                    margin:5
                  }}
                >
                  <div className="card-image" style={{height:"57%",cursor:"pointer"}}>
                    <img className="activator" src={el.image} height="100%"/>

                    <div className="date right">
                      <div className="day">{el.date.split("-")[2]}</div>
                      <div className="month">
                        {get_month(Number(el.date.split("-")[1]))}
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-content"
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
                          style={{ margin: 10, marginTop:10 }}
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
                          style={{ margin: 10,marginTop:8  }}
                        >
                          person
                        </i>

                        {el.participant.length+"/"+el.nb_participant}
                      </span>
                    </div>
                    {el.tags.length!=0&&<div className="slider right tag_slide_orgevnt">
    <ul className="slides">
              {el.tags.map((el,i)=><li key={i}> <p>{el}</p> </li>)}
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
                    to="#"
                      onClick={()=>{
                        if(participant&&btnpart!=el._id){
                        
                        setParticipant(participantToggle(participantToggle()));
                        }
                        else
                        participantToggle()
                        if(!participant)
                        participantToggle()
                        setBtnPart(el._id)
                        setModal(false)
                        setParticipantId(el._id)
                      
                      }}
                      style={{ display: "flex", alignItems: "center",fontSize:12 }}
                    >
                      Show participants
                      <i className="tiny material-icons ">arrow_forward</i>
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
                      {/* ((new Date(el.date)-new Date())/(1000*86400))>3&& */}
                      <a
                      
                        className="btn-floating waves-effect waves-light cadetblue"
                        onClick={() => {
                          setAction({ type: "edit", payload: el });

                          if(modal&&btnedit!=el._id ){
                           
                            setModal(toggle( toggle()))
                          }
                          else
                          toggle()
                          if(!modal)
                          toggle()
                          setBtnedit(el._id)
                          setParticipant(false)
                          setModalId(el._id)
                        }}
                        title={el._id}
                        id={el._id}
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
                      ()=>{setClosedid(el._id);}
                    }>
                      <i className="material-icons ">block</i>{" "}
                    </button>)}
                    {el.state=="Closed"&&(
                    <button className="btn-floating waves-effect waves-light cadetblue modal-trigger" title="open"   data-target="modal3" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">done</i>{" "}
                    </button>)}
                    </div>
                  </div>
                </div>
              </div>
              {modal && modalId==el._id&&<div className="col s12 m6" style={{overflowY:"scroll",height:"360px",backgroundColor:"white"}}><AddEvent toggle={toggle} action={action} setAction={setAction} /></div>}
              {participant&&participantId==el._id&&<div className="col s12 m6" style={{overflowY:"scroll",height:"360px"}}>
              {el.participant.length!=0?<ul className="collection">
    
    {el.participant.map((el,i)=>
    {return(<li key={i} className="collection-item avatar">
      <img src={el.avatar} alt="" className="circle"/>
      <span className="title"><b>{el.fname+" "+el.lname}</b></span>
      <p className="red-text">{el.address}</p>
        <p>{el.email}</p> 
      
      
    </li>)
    })
     }
    
  </ul>:<p> <b>0 participant</b> </p>}
            
              </div>}
            </div>
          );
        })} 
        
        
        </div>:(quickSearch.title!="" || quickSearch.state!="" || quickSearch.tags!="")?
            
            <div className="row" style={{marginLeft:10}} > <h5> <b>{eventsorganizer.length+" result(s) found"}</b> </h5></div>:
        <div  style={{marginLeft:10}}>
          <h4> <b>Your dashboard is empty, get started and create events</b> </h4>
        </div>
        
        }
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
    </>
  );
}

export default Organizer_events;
