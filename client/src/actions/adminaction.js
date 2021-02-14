import { GET_ERRORS, GET_USERS_ADMIN, GET_EVENTS_ADMIN } from "./types";
import axios from "axios"
import setAuthToken from "../token/authtoken";
import { getSanctions } from "./authaction";
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
export const banUser=(email,type,duration,reason,author)=>(dispatch)=>{
  setAuthToken(localStorage.token)
  axios.post('admin/sanction/ban/add',{email:email,type:type,duration:duration,reason:reason,author:author})
  .then((res)=>{
    dispatch({
      type: GET_ERRORS,
      payload: {alerted:"done"},
    })
    dispatch(getSanctions())
  })
  .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
};

  //Unban user
  export const unbanUser=(IdBan, cancelreason, cancelauthor)=>(dispatch)=>{
    setAuthToken(localStorage.token)
    axios.put(`admin/sanction/ban/delete/${IdBan}`,{ canceled:true, cancelreason:cancelreason, cancelauthor:cancelauthor, cancelled_at:new Date()})
    .then((res)=>{
      dispatch(getSanctions())
      dispatch({
        type: GET_ERRORS,
        payload: {alerted:"done"},
      })
    })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
  };


  //Alert user
  export const alertUser=(email,type,duration,reason,author)=>(dispatch)=>{
    setAuthToken(localStorage.token)
    axios
    .post('admin/sanction/alert/add',{email:email,type:type,duration:duration,reason:reason,author:author})
    .then((res)=>{
      dispatch({
        type: GET_ERRORS,
        payload: {alerted:"done"},
      })
      dispatch(getSanctions())
    })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
  };
  
    //Remove alert user
    export const unalertUser=(IdAlert,cancelreason, cancelauthor)=>(dispatch)=>{
      setAuthToken(localStorage.token)
      axios.put(`admin/sanction/alert/delete/${IdAlert}`, {canceled:true, cancelreason:cancelreason, cancelauthor:cancelauthor, cancelled_at:new Date()})
      .then((res)=>{
        dispatch(getSanctions())
        dispatch({
          type: GET_ERRORS,
          payload: {alerted:"done"},
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

  //Add Modo
  export const AddModo=(idUser, moderator)=>(dispatch)=>{
    setAuthToken(localStorage.token)
    axios.put(`admin/users/addmodo/${idUser}`, moderator)
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

  //Remove Modo
  export const DeleteModo=(idUser, participant)=>(dispatch)=>{
    setAuthToken(localStorage.token)
    axios.put(`admin/users/removemodo/${idUser}`, participant)
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