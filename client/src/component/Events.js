
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import { getCurrentUser } from '../actions/authaction';
import {followEvent, getEvent, unfollowEvent,endEvent, closeEvent} from "../actions/evntAction";
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import Navbar from './Navbar';
import "../events.css";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";
import eventClosing from "../outils/eventClosing";
function Events() {
    const dispatch = useDispatch()
    const history =useHistory()
    const allevents=useSelector(state=>state.events.allEvents)
    let auth = useSelector(state=>state.auth)
    let errors=useSelector(state=>state.errors)
    const [quickSearch, setQuickSearch] = useState({
      title: "",
      state: "",
      tags: "",
    });
    const [participate,setParticipate]=useState("")
    const [eventDate,setEventDate]=useState("")

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
    useEffect(()=>{
        dispatch(getEvent())
       localStorage.token&&dispatch(getCurrentUser())
       M.Modal.init(document.querySelectorAll(".modal"),{dismissible:false})
    },[])
    useEffect(()=>{
      M.Slider.init(document.querySelectorAll(".slider"), { height: 40,indicators:false})
      M.updateTextFields()
      if(errors.banned)
      {
      M.toast({ html:`Your account has been banned from subscribtion to any event !! \n your restriction will end in ${new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+7)}  `, classes: "red darken-4" });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    }
    })

    let events=allevents.filter(el=>{
      return(
      
       el.title.toLowerCase().includes(quickSearch.title.toLowerCase())
       &&el.state.toLowerCase().includes(quickSearch.state.toLowerCase())
       &&(quickSearch.tags!=""?el.tags.find(e=>e.toLowerCase().includes(quickSearch.tags.toLowerCase())):true)
       
       )
     })


    const onChange = (e) => {
      setQuickSearch({ ...quickSearch, [e.target.id]: e.target.value })};
    return (
        <div>
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
                  // key={el._id}
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
                          style={{ margin: 10, marginTop:8}}
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
                    {el.state=="Available"&&(!auth.isAuthenticated?
                    <button
                    
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
                    <button
                    data-target="modalevnt"
                      onClick={()=>{
                        // !auth.user.events.includes(el._id)&&
                         setParticipate(el._id)
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
                         setParticipate(el._id)
                         setEventDate(el.date)
                        // :dispatch(unfollowEvent(el._id))
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
                </div>
                </div>)

 })}
            {/* </div> */}
            </div>
            <div id="modalevnt" className="modal">
          <div className="modal-content">
               {participate&& !auth.user.events.includes(participate)?<><h4>Hi, {auth.user.fname}</h4>
<p>You are about to subscribe to {participate&&(  <b>{allevents.find(el=>el._id==participate).title}</b> )} event, Please
note that: </p><br/>  
<ol><li>You can't subscribe to the same event after <b>annulation</b>. </li>
<li>You must valid your cancelation at least <b>two days</b> before the event's day, or you will be banned for participation to any event for one week.</li>
</ol></>:<><h4>Event annulation</h4>
            <p>Are you sure you want to cancel the {participate&&(  <b>{allevents.find(el=>el._id==participate).title}</b> )}  event? you will not be able to <b>subscribe</b>  again.</p></>}
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
        </div>
    )
}

export default Events
