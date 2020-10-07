import { GET_ERRORS, GET_USERS_ADMIN, GET_EVENTS_ADMIN } from "./types";
import axios from "axios"
import setAuthToken from "../token/authtoken";

//get all users
export const getUsers = () =>(dispatch) => {
  setAuthToken(localStorage.token)
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
    .then((res) => {
      dispatch({
          type:GET_EVENTS_ADMIN,
          payload:res.data
      }) 
    })
    .catch((err) =>
      dispatch({
        type:  GET_ERRORS,
        payload: err.response.data
      })
    );

};

//Delete event
export const deleteEvent=(idEvent)=>(dispatch)=>{
  setAuthToken(localStorage.token)
  axios.delete(`admin/events/delete/${idEvent}`)
  .then(res=>dispatch(getEvents()))
  .catch(err=>console.log(err))
 }

 //Delete user
export const deleteUser=(idUser)=>(dispatch)=>{
  setAuthToken(localStorage.token)
  axios.delete(`admin/users/delete/${idUser}`)
  axios.delete(`admin/events/delete/${idUser}`)
  .then(res=>dispatch(getUsers()))
  .catch(err=>console.log(err))
 } 