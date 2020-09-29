import React, { useEffect, useState } from "react";
import {INI_UPDATE} from "../actions/types"
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { getEvent, addEvent ,editEvent} from '../actions/evntAction';
import EventCard from './EventCard';
import AddEvent from './AddEvent';
import "../organizer.css";
import M from "materialize-css"
function Organizer() {
  const dispatch = useDispatch();
  const Events = useSelector(state => state.events)
  const auth = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [title, setTitle] = useState("")
  const [discription, setDiscription] = useState("")
  const [date, setDate] = useState("")
  const [adress, setAdress] = useState("")
  const [Nb_participant, setNb_participant] = useState("")
  const [duration, setDuration] = useState("")
  const [id, setId] = useState(0)
  const [edit, setedit] = useState(false)
  useEffect(() => {
    dispatch(getEvent())
  }, [])
  useEffect(()=>{
    if(auth.updated){
    M.toast({html: 'SUCCESSFULLY UPDATED',classes:"green"})
  setTimeout(dispatch({type:INI_UPDATE}),4000)  
  }
  })
  const addEvents = () => {
    dispatch(addEvent({ title,Nb_participant,duration, discription, date, adress, price }))
  }
  const editEvents =()=>{
    dispatch(editEvent(id,{id,Nb_participant,duration,title,discription, date, adress, price}))
    setedit(false)
    setAdress("")
    setDate("")
    setTitle("")
    setNb_participant("")
    setDuration("")
    setDiscription("")
    setId("")
  }
  const getEvt =(evt)=>{
    setTitle(evt.title)
    setAdress(evt.adress)
    setDate(evt.date)
    setDiscription(evt.discription)
    setDuration(evt.duration)
    setNb_participant(evt.Nb_participant)
    setId(evt._id)
    setedit(true)
  }  

  return (
    <div className="row">
      <div className="col s12 row">
        <div className="col s10 l6 organizer_hi">
          <div
            className="col s11 m8"
            style={{
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              margin:"0px"
            }}
          >
            {" "}
            <h5>
              <b>Hi there,</b> {auth.user.fname}
            </h5>
            <p>
              {" "}
              We are happy to see you among US. <br />
              This is your <b>Dashboard</b>, you can create edit and delete an event.
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
          <Router>

            <div>
            <Link to="/add-event">

              <a className="btn-floating waves-effect waves-light cadetblue">
                <i
                  className="material-icons"
                  onClick={toggle}
                  title="Add event"
                >
                  add
                </i>
              </a>
              </Link>
              <label>Add event</label>
            </div>
            <div>
            <Link to="/event-list">

              <a className="btn-floating waves-effect waves-light cadetblue">
                <i className="material-icons" title="Show my events">
                  assignment
                </i>
              </a>
              </Link>
              <label htmlFor="">Show my events</label>
            </div>
            <Route exact path="/event-list" render={() => (
          <div>
              <div class="leftBox">
                <div class="container">
    <h1 className="name1">EVENTS AND SHOWS</h1>
<p className="par1">discription</p>
</div>
    </div>
            {
               Events.isLoading ? <h1>Loading....</h1> : Events.events.map(event =>
                <EventCard event={event} getEvt={getEvt}/>)
            }
          </div>
        )} />
        <Route path="/(add-event|edit-event)" render={() =>
          (<AddEvent
          setNb_participant={setNb_participant}
            setTitle={setTitle}
            setDuration={setDuration}
            setDiscription={setDiscription}
            setDate={setDate}
            setAdress={setAdress}
            Nb_participant={Nb_participant}
            duration={duration}
            title={title}
            discription={discription}
            date={date}
            price={price}
            adress={adress}
            action={edit? editEvents :addEvents}
            //addEvents={addEvents} 
            edit={edit}/>)} />
            </Router>

          </div>
        </div>
      </div>

      
      </div>
  );
}

export default Organizer;
