import React, { useCallback, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import { useHistory,Link } from 'react-router-dom';
import {followEvent, getEvent, unfollowEvent,endEvent, closeEvent, fullEvent, openEvent} from "../actions/evntAction";
import { useDispatch,useSelector } from 'react-redux';
import "../calendar.css"
import calendarEndEvent from '../outils/calendarEndEvent';
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import eventClosing from "../outils/eventClosing";
import M from "materialize-css";
import Navbar from './Navbar';
import { getCurrentUser } from '../actions/authaction';
import { logoutUser } from "../actions/authaction";
import { formatRelativeWithOptions } from 'date-fns/esm/fp';
import Footer from './Footer';
import calcul_rating from '../outils/calucle_rating';
import { formatRelative } from 'date-fns';


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
        M.Slider.init(document.querySelectorAll(".slider"), { height: 55,indicators:false})
      })


//check if events full
useEffect(()=>{
  for(let i=0;i<allevents.length;i++){
    if( allevents[i].participant.length==allevents[i].nb_participant&&allevents[i].state!="Ended")
    dispatch(fullEvent(allevents[i]._id))
  }
},[])
//check if events ended
useEffect(()=>{
  
  for(let i=0;i<allevents.length;i++){
    if( new Date(allevents[i].end)<new Date())
    dispatch(endEvent(allevents[i]._id))
  }
},[])
//open full events
useEffect(()=>{
  for(let i=0;i<allevents.length;i++){
    if( allevents[i].participant.length!=allevents[i].nb_participant&&allevents[i].state=="Full")
    dispatch(openEvent(allevents[i]._id))
  }
},[])

useEffect(() => {
  if (auth.user.banned===true) {
      dispatch(logoutUser());
      history.push("/banned")
     }
});

const calendarEvents=allevents.filter(el=>el.state!="Invalid").map(el=>{
  return (
  {
  ["title"]:el.title,
  ['start']:new Date(el.start),
  ['end']: new Date(el.end),
  ['id']:el._id,
  // allDay:true,
  ["state"]:el.state
  }
  )
  })





    return (
      < div onClick={(e)=>{
        mod&&!document.querySelector(".custom_mod_cal").contains(e.target)&&setMod(!mod)
      }}>
      <Navbar/>
        <div className="container" >
          <div style={{filter:mod&&"brightness(30%)"}}>
            <FullCalendar
            
        plugins={[ dayGridPlugin,timeGridPlugin ]}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
            // right:"today"
          }}
        initialView="dayGridMonth"
        editable={true}
       
//           eventContent={(arg)=>{
           
//             return (<>
//             {arg.view.type=="dayGridMonth"&&
//               <div style={{
//                 display:"flex",
//                 justifyContent:"space-between",
//                 alignItems:"center",
//                 padding:1.7,
//                 height:19,
//                 width:"100%"
//               }}>
//                 <div><b>{arg.timeText}</b> {arg.event.title}</div>
               
//               <div style={{
//                 width:"12px",
//                 height:"12px",
//                 borderRadius:"100%",
// background:  arg.event.extendedProps.state=="Available"?"#9aff70":"#d5e1df"
//               }}></div></div>}
              
//               </>
//             )
//           }}
           eventClick={(e)=>{
             setMod(!mod)
            setEventId(e.event.id)
            }}
        height={700}
        events={calendarEvents}
        dayMaxEvents={2}
        // events={[{title:"med",start:"2020-10-13T12:00",end:"2020-10-13T19:00"},{title:"med1",start:"2020-10-13T14:00",end:"2020-10-13T18:00"}]}
        eventTimeFormat={{
          hour:"2-digit",
          minute:"2-digit",
          hour12:false
        }}
      />
      </div>
      {/* <div  className="custom_mod" style={{display:mod?"initial":"none",padding:10}}>
          <div className="modal-content">
        
     <div   style={{display:"flex",justifyContent:"center",alignItems:"center"}} > */}
      {eventId&& <div
                  className="card sticky-action custom_mod_cal"
                  style={{
                    width: 350,
                    height:385,
                    display:mod?"initial":"none"
                    
                  }}
                  // key={el._id}
                >
                  <div className="card-image " style={{height:"59%",cursor:"pointer"}}>
                    <img className="activator" src={allevents.find(e=>e._id==eventId).image} height="100%"  />

                    <div className="date right">
                      <div className="day">{allevents.find(e=>e._id==eventId).start.split("T")[0].split("-")[2]}</div>
                      <div className="month">
                        {get_month(Number(allevents.find(e=>e._id==eventId).start.split("T")[0].split("-")[1]))}
                      </div>
                    </div>
                    <div className="star_rate left">
                    <i className="material-icons" style={{color:"rgb(255, 180, 0)",fontSize:65,position:"relative"}}>star</i>
                    <p style={{position:"absolute",top:22,lineHeight:"normal",left:21.5,width:22,height:22, display:"flex",alignItems:"center",justifyContent:"center"}}>{allevents.find(e=>e._id==eventId).rating.length==0?"--":calcul_rating(allevents.find(e=>e._id==eventId).rating)}</p>
                    </div>
                    {/* <div className="cal_hov" style={{
                       position: "absolute",
                       top: 10,
                       left: 10,
                      //  background:"gray",
                       borderRadius:"100%",
                       width:37,
                       height:37
                    }}>
                      <i
          className="material-icons"
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 6,
            left: 6.25,
            // color:"white",
            fontSize:25,
            // textShadow: "0px 3px black"
          }}
          onClick={() =>
            setMod(!mod)
          }
          title="Close"
        >
          close
        </i>
        </div> */}
                    
                  </div>
                  <div
                    className="card-content "
                    style={{ padding: "0px 10px 0px 24px" }}
                  >
                    <span className="card-title  grey-text text-darken-4" style={{height: "fit-content",lineHeight: "normal",marginTop: "2px",marginBottom:2}}>
                    {allevents.find(e=>e._id==eventId).title.length<=12? <b>{allevents.find(e=>e._id==eventId).title}</b>:<marquee scrolldelay={140} behavior="scroll" direction="left"><b>{allevents.find(e=>e._id==eventId).title}</b></marquee> }
                  </span>
                  {allevents.find(e=>e._id==eventId).address.address.length<=20?
                    <p className="red-text address_map" style={{cursor:"pointer"}}><i className="fas fa-home" style={{marginRight:5}}></i>{allevents.find(e=>e._id==eventId).address.address}</p>
                  :
                 <marquee  behavior="scroll" direction="left" scrolldelay={140}><p className="red-text address_map" style={{cursor:"pointer"}}><i className="fas fa-home" style={{marginRight:5}}></i>{allevents.find(e=>e._id==eventId).address.address}</p></marquee> }
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
                          style={{ margin: 10, marginTop:8 }}
                        >
                          person
                        </i>

                        {allevents.find(e=>e._id==eventId).participant.length+"/"+allevents.find(e=>e._id==eventId).nb_participant}
                      </span>
                    </div>
                    {allevents.find(e=>e._id==eventId).tags.length!=0&&<div className="slider right tag_slide_cal">
    <ul className="slides">
              {allevents.find(e=>e._id==eventId).tags.map((el,i)=><li key={i}> <p className='chip' style={{padding:8,display:"flex",alignItems:"center",fontSize:12}}>{el}</p> </li>)}
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
                    {(!auth.isAuthenticated?
                    allevents.find(e=>e._id==eventId).state=="Available"&&<button
                    
                      onClick={()=>{
                        history.push("/login")
                      }}
                      style={{ display: "flex", alignItems: "center",borderRadius:"5px" }}
                      className="btn-small green white-text"
                    >
                      Participate
                      
                    </button>:(auth.user.role=="participant"&&
                    !auth.user.cancelation.includes(allevents.find(e=>e._id==eventId)._id)&&
                    
                    (
                      !auth.user.events.includes(allevents.find(e=>e._id==eventId)._id)?
                      allevents.find(e=>e._id==eventId).state=="Available"&& <button
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
                         setEventDate(allevents.find(e=>e._id==eventId).start)
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
                  <div className="card-reveal" style={{paddingRight:55,overflowWrap:"anywhere"}}>
                    <span className="card-title grey-text text-darken-4">
                      <b>{allevents.find(e=>e._id==eventId).title}</b>
                      <i className="material-icons right" style={{position:"absolute",right:10,top:10}}>close</i>
                    </span>
                    <p style={{fontSize:13,color:"rgb(0, 96, 100)"}}>{formatRelative(new Date(allevents.find(e=>e._id==eventId).start),new Date())+" - "+formatRelative(new Date(allevents.find(e=>e._id==eventId).end),new Date())}</p>
                    <p  style={{lineHeight:"normal"}}>{allevents.find(e=>e._id==eventId).description}</p>
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
                        className="btn-floating  cyan darken-3"
                        onClick={() => {
                          history.push(`/events/${allevents.find(e=>e._id==eventId)._id}`)
                         
                        }}
                        title="Show comments"
                      >
                        <i className="material-icons ">comment</i>
                      </a> </div>
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
<li>You are responsible for all comments you send, in case of non respect your account will be <b>alerted</b> for one <b>week</b> and you risk to get banned from the admin.</li>
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
        <Footer/>
        </div>
    )
}

export default Calendar
