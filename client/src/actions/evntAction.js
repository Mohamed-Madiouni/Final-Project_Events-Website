import { GET_EVENTS,GET_ERRORS } from "./types";
import setAuthToken from "../token/authtoken";
import axios from "axios";


// get all events
export const getEvent = () => (dispatch) => {
  
  axios
    .get("/event/all")
    .then((res) => dispatch({ 
        type: GET_EVENTS, 
        payload: res.data 
    }))
    .catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }));
};


//get organizer events
export const getEventOrganizer = () => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .get("/event/all/organizer")
    .then((res) => dispatch({ 
        type: GET_EVENTS, 
        payload: res.data 
    }))
    .catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }));
};

// add event
export const addEvent = (newEvent) => (dispatch) => {
  axios
    .post("/event/add", newEvent)
    .then((res) =>{
       dispatch(getEventOrganizer())
       dispatch({
        type: GET_ERRORS,
        payload: {},
      })
       
    }
    )
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

//delete event
export const deleteEvent = (idEvent) => (dispatch) => {
  axios
    .delete(`/event/delete/${idEvent}`)
    .then((res) => {
      dispatch(getEventOrganizer())
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};


//close.event

export const closeEvent = (idEvent) => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .put(`/event/edit/close/${idEvent}`,{state:"Closed"})
    .then((res) => {
      dispatch(getEventOrganizer())
      dispatch({
       type: GET_ERRORS,
       payload: {},
     })
      
   })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};


// edit event
export const editEvent = (idEvent, updatedEvent) => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .put(`/event/edit/${idEvent}`, updatedEvent)
    .then((res) => {
      dispatch(getEventOrganizer())
      dispatch({
       type: GET_ERRORS,
       payload: {},
     })
      
   })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};
