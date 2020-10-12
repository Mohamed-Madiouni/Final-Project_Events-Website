import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import { useHistory,Link } from 'react-router-dom';
import {followEvent, getEvent, unfollowEvent,endEvent, closeEvent} from "../actions/evntAction";
import { useDispatch,useSelector } from 'react-redux';
import "../calendar.css"
import calendarEndEvent from '../outils/calendarEndEvent';
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import eventClosing from "../outils/eventClosing";
import M from "materialize-css";
import Navbar from './Navbar';
import { getCurrentUser } from '../actions/authaction';


function Calendar() {
    const allevents=useSelector(state=>state.events.allEvents)
    const dispatch = useDispatch()
    let auth = useSelector(state=>state.auth)
    const history =useHistory()
    const[mod,setMod]=useState(false)
    const [eventId,setEventId]=useState("")
    const [participate,setParticipate]=useState("")
    const [eventDate,setEventDate]=useState("")

      useEffect(()=>{
        dispatch(getEvent())
        localStorage.token&&dispatch(getCurrentUser())
        M.Modal.init(document.querySelectorAll(".modal"))
      },[])

      useEffect(()=>{
        M.Slider.init(document.querySelectorAll(".slider"), { height: 40,indicators:false})
      })

//check if events ended
useEffect(()=>{
  dispatch(getEvent())
  for(let i=0;i<allevents.length;i++){
    if( new Date(eventClosing(allevents[i].date,allevents[i].duration))<new Date())
    dispatch(endEvent(allevents[i]._id))
  }
},[])
//check if events full
useEffect(()=>{
  for(let i=0;i<allevents.length;i++){
    if( allevents[i].participant.length==allevents[i].nb_participant)
    dispatch(closeEvent(allevents[i]._id))
  }
},[])

let calendarEvents=allevents.map(el=>{
  return (
  {
  ["title"]:el.title,
  ['start']:new Date(el.date),
  ['end']: calendarEndEvent(el.date,el.duration) ,
  ['id']:el._id,
  allDay:true
  }
  )
  })



    return (
      <>
      <Navbar/>
        <div className="container" >
          <div style={{filter:mod&&"brightness(30%)"}}>
            <FullCalendar
        plugins={[ dayGridPlugin,interactionPlugin,timeGridPlugin ]}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
        initialView="dayGridMonth"
        selectable = {true}
        editable={true}
        //  eventLimit={true}
        // events={[{title:"med",start:"2020-10-05",end:"2020-10-7",allDay:true} ]}
// [title:el.title]

//         })}
        //   dateClick={handleDateClick}
          // eventContent='some text'
           eventClick={(e)=>{
             setMod(!mod)
            setEventId(e.event.id)
            }}
        //    selectMirror={true}
        // themeSystem="Sketchy"
        height={605}
        events={calendarEvents}
        dayMaxEvents={2}
      />
      </div>
      {/* <div  className="custom_mod" style={{display:mod?"initial":"none",padding:10}}>
          <div className="modal-content">
        
     <div   style={{display:"flex",justifyContent:"center",alignItems:"center"}} > */}
      {eventId&& <div
                  className="card sticky-action custom_mod_cal"
                  style={{
                    width: 350,
                    height:380,
                    display:mod?"initial":"none"
                    
                  }}
                  // key={el._id}
                >
                  <div className="card-image " style={{height:"59%",cursor:"pointer"}}>
                    <img className="activator" src={allevents.find(e=>e._id==eventId).image} height="100%"  />

                    <div className="date right">
                      <div className="day">{allevents.find(e=>e._id==eventId).date.split("-")[2]}</div>
                      <div className="month">
                        {get_month(Number(allevents.find(e=>e._id==eventId).date.split("-")[1]))}
                      </div>
                    </div>
                    <i
          className="material-icons"
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 10,
            left: 10,
            color:"white",
            fontSize:24,
            textShadow: "0 2px black"
          }}
          onClick={() =>
            setMod(!mod)
          }
        >
          close
        </i>
                  </div>
                  <div
                    className="card-content "
                    style={{ padding: "0px 10px 0px 24px" }}
                  >
                    <span className="card-title  grey-text text-darken-4">
                      <b>{allevents.find(e=>e._id==eventId).title}</b>
                    </span>
                    <p className="red-text">{allevents.find(e=>e._id==eventId).address}</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize:13,
                        width:"100%"
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
                          style={{ margin: 10, marginTop:10}}
                        >
                          history
                        </i>

                        {historyevent(allevents.find(e=>e._id==eventId).created_at)}
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
                          style={{ margin: 10, marginTop:10 }}
                        >
                          person
                        </i>

                        {allevents.find(e=>e._id==eventId).participant.length+"/"+allevents.find(e=>e._id==eventId).nb_participant}
                      </span>
                    </div>
                    {allevents.find(e=>e._id==eventId).tags.length!=0&&<div className="slider right tag_slide_cal">
    <ul className="slides">
              {allevents.find(e=>e._id==eventId).tags.map((el,i)=><li key={i}> <p>{el}</p> </li>)}
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
                    {allevents.find(e=>e._id==eventId).state=="Available"&&(!auth.isAuthenticated?
                    <button
                    
                      onClick={()=>{
                        history.push("/login")
                      }}
                      style={{ display: "flex", alignItems: "center",borderRadius:"5px" }}
                      className="btn-small green white-text"
                    >
                      Participate
                      
                    </button>:(auth.user.role=="participant"&&
                    !auth.user.cancelation.includes(allevents.find(e=>e._id==eventId)._id)&&
                    (auth.user.banned_date?new Date()>auth.user.banned_date:true)&&
                    (
                      !auth.user.events.includes(allevents.find(e=>e._id==eventId)._id)?
                    <button
                    data-target="modalevnt"
                      onClick={()=>{
                        // !auth.user.events.includes(el._id)&&
                         setParticipate(allevents.find(e=>e._id==eventId)._id)
                        // :dispatch(unfollowEvent(el._id))
                      }}
                      style={{ display: "flex", alignItems: "center",borderRadius:"5px" }}
                      className="btn-small green white-text modal-trigger"
                    >
                     Participate
                      
                    </button>
                    :
                    <button
                    data-target="modalevnt"
                      onClick={()=>{
                        // !auth.user.events.includes(el._id)&&
                         setParticipate(allevents.find(e=>e._id==eventId)._id)
                         setEventDate(allevents.find(e=>e._id==eventId).date)
                        // :dispatch(unfollowEvent(el._id))
                      }}
                      style={{ display: "flex", alignItems: "center",borderRadius:"5px" }}
                      className="btn-small red white-text modal-trigger"
                    >
                     Cancel
                      
                    </button>)))}
                    <span
                      className={
                        allevents.find(e=>e._id==eventId).state == "Available"
                          ? "right green-text"
                          : "right gray-text text-darken-3"
                      }
                    >
                      {" "}
                      {allevents.find(e=>e._id==eventId).state}
                    </span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      <b>{allevents.find(e=>e._id==eventId).title}</b>
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{allevents.find(e=>e._id==eventId).description}</p>
                    {/* <div
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
                    </div> */}
                  </div>
                </div>}
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
                {/* </div>

 
              
          </div>
         
        </div> */}
         <div id="modalevnt" className="modal">
          <div className="modal-content">
               {participate&& !auth.user.events.includes(participate)?<><h4>Hi, {auth.user.fname}</h4>
<p>You are about to subscribe to {participate&&(  <b>{allevents.find(el=>el._id==participate).title}</b> )} event, Please
note that: </p><br/>  
<ol><li>You can't subscribe to the same event after <b>annulation</b>. </li>
<li>You are responsible for all comments you send, in case of non respect your account will be <b>banned</b> for one <b>week</b>.</li>
</ol></>:<><h4>Event annulation</h4>
            <p>Are you sure you want to cancel the {participate&&(  <b>{allevents.find(el=>el._id==participate).title}</b> )}  event? 
            {/* {participate&&auth.user.banned_date&&((new Date(allevents.find(el=>el._id==participate).date)-new Date())/(1000*86400))>2?" you will not be able to subscribe again.":" you will be banned for a week"} */}
{" "}you will not be able to <b>subscribe</b> again.
            </p></>}
          </div>
          <div className="modal-footer">
            <a
              href="#"
              className="modal-close btn-flat"
              onClick={()=>{
                participate&&(!auth.user.events.includes(participate)?dispatch(followEvent(participate)):dispatch(unfollowEvent(participate,eventDate)))}}
            >
              Agree
            </a>
            <a
              href="#"
              className="modal-close  btn-flat"
            >
              Cancel
            </a>
            
          </div>
        </div>
        </div>
        </>
    )
}

export default Calendar
