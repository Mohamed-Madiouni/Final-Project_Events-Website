import { GET_EVENTS,GET_ERRORS,GET_ALL_EVENTS,GET_ALL_PARTICIPANT} from "./types";
import setAuthToken from "../token/authtoken";
import axios from "axios";
import { getCurrentUser, getMyEvents } from "./authaction";



// get all events
export const getEvent = () => (dispatch) => {
  
  axios
    .get("/event/all")
    .then((res) =>{
       dispatch({ 
        type: GET_ALL_EVENTS, 
        payload: res.data 
    })
  
  })
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
  setAuthToken(localStorage.token)
  axios
    .post("/event/add", newEvent)
    .then((res) =>{
       dispatch(getEventOrganizer())
       dispatch(getParticipant())
       dispatch({
        type: GET_ERRORS,
        payload: {success:"done"},
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
      dispatch(getParticipant())
      dispatch({
        type: GET_ERRORS,
        payload: {deleted:"ok"},
      })
    })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};



//open event
export const openEvent = (idEvent) => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .put(`/event/edit/open/${idEvent}`,{state:"Available"})
    .then((res) => {
      dispatch(getEventOrganizer())
      dispatch(getParticipant())
      dispatch(getEvent())
      dispatch(getMyEvents())
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



//close all events 
export const closeAllEvent = () => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .put(`/event/edit/close/`,{state:"Closed"})
    .then((res) => {
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


//end event by id
export const endEvent = (idEvent) => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .put(`/event/edit/end/${idEvent}`,{state:"Ended"})
    .then((res) => {
      dispatch(getEventOrganizer())
      dispatch(getParticipant())
      dispatch(getMyEvents())
      dispatch(getEvent())
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





//close event by id
export const closeEvent = (idEvent) => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .put(`/event/edit/close/${idEvent}`,{state:"Closed"})
    .then((res) => {
      dispatch(getEventOrganizer())
      dispatch(getParticipant())
      dispatch(getMyEvents())
      dispatch(getEvent())
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

//make event full
export const fullEvent = (idEvent) => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .put(`/event/edit/full/${idEvent}`,{state:"Full"})
    .then((res) => {
      dispatch(getEventOrganizer())
      dispatch(getParticipant())
      dispatch(getMyEvents())
      dispatch(getEvent())
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
      dispatch(getParticipant())
      dispatch({
       type: GET_ERRORS,
       payload: {success:"done"},
     })
      
   })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};

// participation

//follow
export const followEvent=(eventId)=>(dispatch) => {
  setAuthToken(localStorage.token)
  axios
  .put('/event/follow',{followId:eventId})
  .then((res) => {
    dispatch(getEvent())
    dispatch(getCurrentUser())
    dispatch(getParticipant())
    dispatch(getMyEvents())
    dispatch({
     type: GET_ERRORS,
     payload: {},
   })
 })
  .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
}

//unfollow
export const unfollowEvent=(eventId,eventDate)=>(dispatch) => {
  setAuthToken(localStorage.token)
  axios
  .put('/event/unfollow',{unfollowId:eventId,date:eventDate})
  .then((res) => {
    dispatch(getEvent())
    dispatch(getCurrentUser())
    dispatch(getParticipant())
    dispatch(getMyEvents())
    dispatch({
     type: GET_ERRORS,
     payload: {}
   })
 })
  .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
}

//show Participant
export const getParticipant = () => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .get("/event/all/participant")
    .then((res) =>{
       dispatch({ 
        type: GET_ALL_PARTICIPANT, 
        payload: res.data 
    })
  
  })

    .catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }));
};




