import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {closeEvent,getEventOrganizer, deleteEvent,openEvent,getEvent,endEvent, fullEvent} from "../actions/evntAction";
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import AddEvent from "./AddEvent";
import "../organizer.css";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";
import { ADD_FOCUS, ADD_INP, ADD_PLACE, GET_ERRORS, SHOW_MAP, STATE_MAP } from "../actions/types";
import { logoutUser } from "../actions/authaction";
import calcul_rating from "../outils/calucle_rating";
import { getUsers } from '../actions/adminaction';
import MyMap from "./Maps";
import {sendNotifications} from "../actions/notificationaction";
import { formatRelative } from "date-fns";
import Footer from './Footer';

function Organizer() {
  
  const users=useSelector(state=>state.admin.users)

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const auth = useSelector((state) => state.auth);
  const allevents= useSelector((state)=>state.events.allEvents)
  const errors=useSelector(state=>state.errors)
  const map = useSelector(state=>state.map)
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState({ type: "add", payload: {} });
  const [deleteid,setDeleteid]= useState("")
  const [closedid,setClosedid]= useState("")
  const toggle = () => {
    setModal(!modal)
    dispatch({
      type:ADD_PLACE,
      payload:{}
    })
    dispatch({
      type:ADD_INP,
      payload:{
        state:false,
        inp:{}
      }
    })
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
    dispatch(getUsers())
    M.Modal.init(document.querySelectorAll(".modal"))
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
    if( new Date(allevents[i].end)<new Date())
    dispatch(endEvent(allevents[i]._id))
  }

  for(let i=0;i<events.events.length;i++){
    if( new Date(events.events[i].end)<new Date())
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
    M.Slider.init(document.querySelectorAll(".slider"), { height: 60,indicators:false });
    if(errors.deleted){
      M.toast({ html: "Event deleted successfully", classes: "green" });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    }
  })

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

      { auth.user.alerted_date && new Date()<new Date(auth.user.alerted_date) &&
        <i className="fas fa-exclamation-circle" style={{color:"red",fontSize:15,marginTop:5}}>You are alerted until {auth.user.alerted_date=!null && auth.user.alerted_date.split('.')[0]}, a second alert will automatically ban your account 
        </i>
        }
     

      <div className="col s12 row" >
      <div className="row quicksearch" style={{margin:"30px 15px 20px 15px",fontSize:15,height:200,display:"flex",alignItems:"center",position:"relative"}} >
     <h5 style={{position:"absolute",fontSize:35,left:5,top:-30}}><b>Hi there,</b> {auth.user.fname}</h5>
       <div className="col s8 " style={{fontStyle: "",fontSize:17,marginBottom:10}}>
   <p>  We are happy to see you among US. <br />
    This is your <b>Dashboard</b>, you can create edit and delete an event.</p>
   </div>
   <div className="col s4" style={{fontWeight:800,marginBottom:10,height: "60%",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
   <div>
              <a className="btn-floating cyan darken-3" style={{marginRight:10}}>
                <i
                  className="material-icons"
                  onClick={()=>{
                    setAction({ type: "add", payload:{} });
                    toggle()
                  }
                }
                  title="Add event"

                >
                  add
                </i>
              </a>

              <label>Add event</label>
            </div>
            <div>
              <Link className="btn-floating  cyan darken-3" to={`/dashboard/${auth.user._id}`} style={{marginRight:10}}>
                <i className="material-icons" title="Show my events">
                  assignment
                </i>
                
              </Link>

              <label htmlFor="">Show my events</label>
            </div>
   
   
   </div>
 </div>

        {/* <div className="col s12 l12 organizer_hi">
          <div
         
            className=" div-1 col s12"
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
            </p> */}
             {/* <figure >
    <img  className="circle" src="https://www.bacp.co.uk/media/7326/partybanner.jpg?anchor=center&mode=crop&width=1120&heightratio=0&format=jpg&quality=80&slimmage=true&rnd=132207170210000000" alt="Profile banner" />
  </figure>  */}
          {/* </div>
         
        </div>
        <div
          className="col s2 l6"
          style={{
            paddingRight: "0px",
          }}
        >
          <div className="organizer_nav">
            <div>
              <a className="btn-floating cyan darken-3">
                <i
                  className="material-icons"
                  onClick={()=>{
                    setAction({ type: "add", payload:{} });
                    toggle()
                  }
                }
                  title="Add event"
                >
                  add
                </i>
              </a>

              <label>Add event</label>
            </div>
            <div>
              <Link className="btn-floating  cyan darken-3" to={`/dashboard/${auth.user._id}`}>
                <i className="material-icons" title="Show my events">
                  assignment
                </i>
                
              </Link>

              <label htmlFor="">Show my events</label>
            </div>
          </div>
        </div> */}
      </div>


     { !map.show?modal && (<div className="container organizer_add row" id="edt">
        <AddEvent toggle={toggle} action={action} setAction={setAction} /></div>
      ):
      <div className=" map_container" id="map">
<MyMap/>
        </div>}

{/* <div className="container organizer_add row" >
        <AddEvent toggle={toggle} action={action} setAction={setAction} /></div> */}



<div className=" col s12" >
               <div style={{marginLeft:"10px"}}>
             <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
              <div className="wpb_column vc_column_container col 12">
                <div className="vc_column-inner">
                  <div className="wb_wrapper">
                    <div className="wpb_text_column wpb_content_element ">
                      <div className=" wpb_wrapper">
                        <h2>Your Last Events</h2>
                        {/* <p className="pra-2">Keep up with the latest events</p> */}
                        </div></div></div></div></div></div></div>
  {/* <h5  style={{marginLeft:10,color:"rgb(0, 96, 100)"}}> <b>Your last events</b> </h5> */}
</div>
        {events.events.length==0&&
        // <div  style={{marginLeft:10}}>
        //   <h4> <b>Your dashboard is empty, get started and create events</b> </h4>
        // </div>
        <div className="row" style={{marginLeft:"10px"}} > 
         <div className="row">
        <div className="col s12 l6" id="down">
          <h1 className="title-h">Your dashboard is empty</h1>
          <p className="title-p">
          Get started and create events.
          </p>
        </div>
        <div className="col s12 l6" id="up">
          <img className="working-img" src="/illustration-working.svg" />
        </div>
      </div>
     

      </div>
        }
      <div className="row ">
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
                  style={{ padding: "0px 10px 0px 24px" }}
                >
                  <span className="card-title  grey-text text-darken-4" style={{height: "fit-content",lineHeight: "normal",marginTop: "2px",marginBottom:2}}>
                  {el.title.length<=12? <b>{el.title}</b>:<marquee scrolldelay={140} behavior="scroll" direction="left"><b>{el.title}</b></marquee> }
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
                        style={{ margin: 10,marginTop:8 }}
                      >
                        person
                      </i>

                      {el.participant.length+"/"+el.nb_participant} 
                    </span>
                  </div>
                  {el.tags.length!=0&&<div className="slider right tag_slide_home">
    <ul className="slides" >
              {el.tags.map((el,index)=><li key={index} style={{height:60}}> <p className='chip' style={{padding:8,display:"flex",alignItems:"center",fontSize:12}}>{el}</p> </li>)}
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
                    style={{ display: "flex", alignItems: "center" ,fontSize:13,color:"#006064"}}
                  
                  >
                    Show more
                    <i className="material-icons  " style={{fontSize:15,marginLeft:3,color:"#006064"}}>arrow_forward</i>
                  </Link>
                  <span className={el.state=="Available"?"right green-text":"right gray-text text-darken-3"}> {el.state}</span>
                </div>
                <div className="card-reveal" style={{paddingRight:55,overflowWrap:"anywhere"}} >
                
                  <span className="card-title grey-text text-darken-4">
                    <b>{el.title}</b>
                    <i className="material-icons" style={{position:"absolute",right:10,top:10}}>close</i>
                  </span>
                  <p style={{fontSize:13,color:"rgb(0, 96, 100)"}}>{formatRelative(new Date(el.start),new Date())+" - "+formatRelative(new Date(el.end),new Date())}</p>
                  <p style={{lineHeight:"normal"}}>{el.description}</p>
                  <div
                    // className="right"
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
                   {/* ((new Date(el.date)-new Date())/(1000*86400))>3&& */}
                   {el.state!="Ended"&& <a
                      className="btn-floating   cyan darken-3"
                      onClick={() => {
                        
                       
                        setAction({ type: "edit", payload: el });
                        
                       
                        toggle();
                      
                      }}
                      title="edit"
                      href={!modal?"#edt":undefined}
                    >
                      <i className="material-icons ">edit</i>
                    </a>}
                    <button className="btn-floating cyan darken-3 modal-trigger" title="delete"   data-target="modal1" onClick={
                      ()=>setDeleteid(el._id)
                    }>
                      <i className="material-icons ">delete</i>{" "}
                    </button>
                    {(el.state=="Available"||el.state=="Full")&&(
                    <button className="btn-floating cyan darken-3 modal-trigger" title="close"   data-target="modal2" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">block</i>{" "}
                    </button>)}
                    {el.state=="Closed"&&(
                    <button className="btn-floating cyan darken-3 modal-trigger" title="open"   data-target="modal3" onClick={
                      ()=>setClosedid(el._id)
                    }>
                      <i className="material-icons ">done</i>{" "}
                    </button>)}

                    {el.state!="Invalid"&&(
                    <div>
                      {" "}
                      <a
                        className="btn-floating  cyan darken-3"
                        onClick={() => {
                          history.push(`/events/${el._id}`)
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
              className="modal-close  btn-flat"
              onClick={()=>{
                dispatch(deleteEvent(deleteid))
                let title="Event Deleted";
                let content=  "The organizer " + auth.user.fname+ " " + auth.user.fname +" deleted the event " +  allevents.find((elm) => elm._id==deleteid).title;
                let notiftype="Event_Deleted";
                let compid=deleteid
                var state=[]
                allevents.find((elm) => elm._id ==deleteid).participant.map(el=>{
                  state=[...state,{users:el,consulted:false}]
                })
               dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              }}
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close  btn-flat"
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
              className="modal-close  btn-flat"
              onClick={()=>{dispatch(closeEvent(closedid))
                let title="Event Closed";
                let content= "The organizer " + auth.user.fname+ " " + auth.user.fname +" closed the event " +  allevents.find((elm) => elm._id==closedid).title;
                let notiftype="Event_Closed";
                let compid=closedid
                var state=[]
                allevents.find((elm) => elm._id ==closedid).participant.map(el=>{
                  state=[...state,{users:el,consulted:false}]
                })
               dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))              
              }}
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close  btn-flat"
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
              className="modal-close  btn-flat"
              onClick={()=>{
                dispatch(openEvent(closedid))
                let title="Event Opened";
                let content=  "The organizer " + auth.user.fname+ " " + auth.user.fname +" reopened the event " +  allevents.find((elm) => elm._id==closedid).title;
                let notiftype="Event_Opened";
                let compid=closedid
                var state=[]
                allevents.find((elm) => elm._id ==closedid).participant.map(el=>{
                  state=[...state,{users:el,consulted:false}]
                })
               dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              }}
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close  btn-flat"
            >
              Cancel
            </a>
          </div>
        </div>
        <Footer/>
     </div>
  );
}

export default Organizer;
