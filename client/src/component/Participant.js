import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {useHistory,Link} from "react-router-dom";
import {unfollowEvent,followEvent,getEvent,endEvent,closeEvent, fullEvent, openEvent} from "../actions/evntAction";
import get_month from "../outils/get_month"
import "../organizer.css";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";
import { GET_ERRORS } from "../actions/types";
import { getMyEvents,getCurrentUser } from "../actions/authaction";
import historyevent from "../outils/history"
import { logoutUser } from "../actions/authaction";


function Participant() {

    const dispatch = useDispatch();
    const history =useHistory()
  
    const auth = useSelector((state) => state.auth);
    const allevents= useSelector((state)=>state.events.allEvents)
    const errors=useSelector(state=>state.errors)
    const myevents=useSelector(state=>state.myevents.myevents.events)
  
    const [modal, setModal] = useState(false);
    const [action, setAction] = useState({ type: "add", payload: {} });
    const [deleteid,setDeleteid]= useState("")
    const [closedid,setClosedid]= useState("")
    const [quickSearch, setQuickSearch] = useState({
        title: "",
        state: "",
        tags: "",
      });
      const [participate,setParticipate]=useState("")
      const [eventDate,setEventDate]=useState("")
    const toggle = () => {
      setModal(!modal)
    return modal
    };
    const onChange = (e) => {
        setQuickSearch({ ...quickSearch, [e.target.id]: e.target.value })};
    
   
    
 
  //check if events full
  useEffect(()=>{
    dispatch(getEvent())
    for(let i=0;i<allevents.length;i++){
      if( allevents[i].participant.length==allevents[i].nb_participant&&allevents[i].state!="Ended")
      dispatch(fullEvent(allevents[i]._id))
    }
    if(myevents)
    for(let i=0;i<myevents.length;i++){
      if( myevents[i].participant.length==myevents[i].nb_participant&&myevents[i].state!="Ended")
      dispatch(fullEvent(myevents[i]._id))
    }
  },[])
   //check if events ended
  useEffect(()=>{
    
    for(let i=0;i<allevents.length;i++){
      if( new Date(eventClosing(allevents[i].date,allevents[i].duration))<new Date())
      dispatch(endEvent(allevents[i]._id))
    }
    dispatch(getMyEvents())
    if(myevents) 
    for(let i=0;i<myevents.length;i++){
      if( new Date(eventClosing(myevents[i].date,myevents[i].duration))<new Date())
      dispatch(endEvent(myevents[i]._id))
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
  if(myevents)
  for(let i=0;i<myevents.length;i++){
    if( myevents[i].participant.length!=myevents[i].nb_participant&& myevents[i].state=="Full")
    dispatch(openEvent(myevents[i]._id))
  }
},[])

  useEffect(()=>{
    
   localStorage.token&&dispatch(getCurrentUser())
 M.Modal.init(document.querySelectorAll(".modal"))
},[])

   useEffect(()=>{
      M.Materialbox.init(document.querySelectorAll('.materialboxed'))
      M.Slider.init(document.querySelectorAll(".slider"), { height: 40,indicators:false });
      M.updateTextFields()
      if(errors.banned)
      {
      M.toast({ html:`Your account has been banned from subscribtion to any event !! \n your restriction will end in ${new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+7)}  `, classes: "red darken-4",displayLength:10000 });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    }   
  
    })
    let events=myevents&&myevents.filter(el=>{
        return(
        
         el.title.toLowerCase().includes(quickSearch.title.toLowerCase())
         &&el.state.toLowerCase().includes(quickSearch.state.toLowerCase())
         &&(quickSearch.tags!=""?el.tags.find(e=>e.toLowerCase().includes(quickSearch.tags.toLowerCase())):true)
         
         )
       })
  
    return (
        <>        
        { auth.user.alerted_date && new Date()<new Date(auth.user.alerted_date) &&
        <i className="fas fa-exclamation-circle" style={{color:"red",fontSize:15,marginTop:5}}>You are alerted until {auth.user.alerted_date=!null && auth.user.alerted_date.split('.')[0]}, a second alert will automatically ban your account 
        </i>
        }
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
            
      <div className="col s12 row">
        
        <div className="col s10 l8 organizer_hi">
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

          This is your <b>Dashboard</b>, you can see all your events that
          you have been participated.
        </p>
           
          </div>
         
        </div>
        {/* <div
          className="col s2 l4"

          style={{
            paddingRight: "0px",
          }}
        >

          <div className="organizer_nav_part">
            <div>
              <a className="btn-floating  cadetblue">
                <i
                  className="material-icons"
                  onClick={toggle}
                  title="Add Comment"
                >
                  add
                </i>
              </a>

              <label>Add comment</label>

            </div>
          </div>
        </div> */}
      </div>

      
 { (quickSearch.title!="" || quickSearch.state!="" || quickSearch.tags!="")&&events.length!=0&&
            
            <div className="row" style={{marginLeft:10}} > <h5> <b>{events.length+" result(s) found"}</b> </h5></div>}

 {events&&events.length!=0?
<div className="row">
           
           {events&&events.slice(0).reverse().map(el=>{
               return (<div className="col s12 m6 l4 xl3" key={el._id} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                 <div
                            className="card small sticky-action"
                            style={{
                              width: 335,
                              height:350,
                              margin:5
                              
                            }}
                           
                          >
                            <div className="card-image " style={{height:"55%",cursor:"pointer"}}>
                              <img className="activator" src={el.image} height="100%" />
          
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
                                    style={{ margin: 10, marginTop:8 }}
                                  >
                                    person
                                  </i>
          
                                  {el.participant.length+"/"+el.nb_participant}
                                </span>
                              </div>
                              {el.tags.length!=0&&<div className="slider right tag_slide_event">
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
                              {(!auth.isAuthenticated?
                             el.state=="Available"&& <button
                              
                                onClick={()=>{
                                  history.push("/login")
                                }}
                                style={{ display: "flex", alignItems: "center",borderRadius:"5px" }}
                                className="btn-small green white-text"
                              >
                                Participate
                                
                              </button>:(auth.user.role=="participant"&&
                              !auth.user.cancelation.includes(el._id)&&
                              (auth.user.banned_date?new Date()>auth.user.banned_date:true)&&
                              (
                                !auth.user.events.includes(el._id)?
                                el.state=="Available"&& <button
                              data-target="modalevnt"
                                onClick={()=>{
                                  
                                   setParticipate(el._id)
                               
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
                                 
                                   setParticipate(el._id)
                                   setEventDate(el.date)
                                  
                                }}
                                style={{ display: "flex", alignItems: "center",borderRadius:"5px" }}
                                className="btn-small red white-text modal-trigger"
                              >
                               Cancel
                                
                              </button>)))}
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
                            
                            </div>
                          </div>
                          </div>)
          
           })}
                     
                      </div>: (quickSearch.title!="" || quickSearch.state!="" || quickSearch.tags!="")?
            
            <div className="row" style={{marginLeft:10}} > <h5> <b>{events.length+" result(s) found"}</b> </h5></div>:<div  style={{marginLeft:10}}>
          <h4> <b>Your dashboard is empty, get started and join events</b> </h4>
        </div>}
                      <div id="modalevnt" className="modal">
                    <div className="modal-content">
                         {participate&& !auth.user.events.includes(participate)?<><h4>Hi, {auth.user.fname}</h4>
          <p>You are about to subscribe to {participate&&(  <b>{allevents.find(el=>el._id==participate).title}</b> )} event, Please
          note that: </p><br/>  
          <ol><li>You can't subscribe to the same event after <b>annulation</b>. </li>
          <li>You are responsible for all comments you send, in case of non respect your account will be <b>alerted</b> for one <b>week</b> and you risk to get banned from the admin.</li>
          </ol></>:<><h4>Event annulation</h4>
                      <p>Are you sure you want to cancel the {participate&&(  <b>{allevents.find(el=>el._id==participate).title}</b> )}  event? 
                      {/* {participate&&((new Date(allevents.find(el=>el._id==participate).date)-new Date())/(1000*86400))>2?" you will not be able to subscribe again.":" you will be banned for a week"} */}
                    {" "} you will not be able to <b>subscribe</b> again.
                      </p></>}
                    </div>
                    <div className="modal-footer">
                      <a
                        href="#!"
                        className="modal-close btn-flat"
                        onClick={()=>{
                          participate&&(!auth.user.events.includes(participate)?dispatch(followEvent(participate)):dispatch(unfollowEvent(participate,eventDate)))}}
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

        </>
    )
}

export default Participant

