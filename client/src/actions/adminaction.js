import { GET_ERRORS, GET_USERS_ADMIN, GET_EVENTS_ADMIN } from "./types";
import axios from "axios"
import setAuthToken from "../token/authtoken";
//get all users
export const getUsers = () =>(dispatch) => {
   // setAuthToken(localStorage.token)
    axios
      .get("/admin/users")
      .then((res) => dispatch({
            type:GET_USERS_ADMIN,
            payload:res.data
        }))
      .catch((err) => dispatch({
          type:  GET_ERRORS,
          payload: err.response.data,
        }));
};

//get all event
export const getEvents = () =>(dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .get("/admin/events")
    .then((res) => dispatch({
          type:GET_EVENTS_ADMIN,
          payload:res.data
      }))
    .catch((err) => dispatch({
        type:  GET_ERRORS,
        payload: err.response.data
      }));
};

//Delete event
export const deleteEvent=(idEvent)=>(dispatch)=>{
  setAuthToken(localStorage.token)
  axios.delete(`admin/events/delete/${idEvent}`)
  .then(res=>{dispatch(getEvents())})
  .catch(err=>console.log(err))
 }

 //Delete user
export const deleteUser=(idUser)=>(dispatch)=>{
  setAuthToken(localStorage.token)
  axios.delete(`admin/users/delete/${idUser}`)
  .then(res=>{
    dispatch(getUsers())
    dispatch({
      type: GET_ERRORS,
      payload: {success:"done"},
    })   
  })
  .catch(err=>console.log(err))
 }

  //Ban user
export const banUser=(idUser, ban)=>(dispatch)=>{
  setAuthToken(localStorage.token)
  axios.put(`admin/users/ban/${idUser}`, ban)
  .then((res)=>{
    dispatch(getUsers())
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

  //Unban user
  export const unbanUser=(idUser, unban)=>(dispatch)=>{
    setAuthToken(localStorage.token)
    axios.put(`admin/users/unban/${idUser}`, unban)
    .then((res)=>{
      dispatch(getUsers())
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


  //Alert user
  export const alertUser=(email,type,duration,reason)=>(dispatch)=>{
    setAuthToken(localStorage.token)
    axios.post('admin/sanction/alert/add/',{email:email,type:type,duration:duration,reason:reason})
    .then((res)=>{
      dispatch({
        type: GET_ERRORS,
        payload: {success:"done"},
      })
      dispatch(getUsers())
    })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
  };
  
    //Remove alert user
    export const unalertUser=(Idalert)=>(dispatch)=>{
      setAuthToken(localStorage.token)
      axios.delete(`admin/sanction/alert/delete/${Idalert}`)
      .then((res)=>{
        dispatch(getUsers())
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


//Validate Event
export const validateEvent=(idEvent, valid)=>(dispatch)=>{
  setAuthToken(localStorage.token)
  axios.put(`admin/events/valid/${idEvent}`, valid)
  .then((res)=>{
    dispatch(getEvents())
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

  //Invalidate Event
  export const invalidateEvent=(idEvent, unvalid)=>(dispatch)=>{
    setAuthToken(localStorage.token)
    axios.put(`admin/events/invalid/${idEvent}`, unvalid)
    .then((res)=>{
      dispatch(getEvents())
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