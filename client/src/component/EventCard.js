import React from 'react'
import { useDispatch } from "react-redux";
import { deleteEvent } from "../actions/evntAction"
import { Link } from "react-router-dom";

function EventCard({ event, getEvt }) {
    const dispatch = useDispatch()
    const deleteEvents = () => {
        dispatch(deleteEvent(event._id))
    }
    return (


<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="images/office.jpg" alt=""/>
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">{event.title}<i class="material-icons right">more_vert</i></span>
      <div>
      <button 
                 style={{
                    width: "100%",
                    borderRadius: "3px",
                    height: "45px",
                  }} 
                  type="delete"
                  className="btn waves-effect waves-light hoverable " 
                  onClick={deleteEvents}>Delete</button>
                
                <Link to="edit-event" onClick={() => getEvt(event)}>
                    <button 
                     style={{
                        width: "100%",
                        borderRadius: "3px",
                        height: "45px",
                      }}
                     type="edit"
                      className="btn waves-effect waves-light hoverable ">Edit</button>
                </Link>
                </div>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Information
      <i class="material-icons right">close</i></span>
      
      <p>{event.discription}</p>
        <h3>{event.adress}</h3>
        <h3>{event.duration}</h3>
        <h3>{event.Nb_participant}</h3>
        <h5>{event.adress}</h5>
        <h6>{event.date}</h6>
        
</div>
    </div>
 
    )
}

export default EventCard

