import { GET_ERRORS, GET_USERS, GET_EVENTS } from "./types";
import axios from "axios"

//get all users
export const getUsers = () =>(dispatch) => {
    axios
      .get("admin/users")
      .then((res) => {
        dispatch({
            type:GET_USERS,
            payload:res.data
        }) 
      })
      .catch((err) =>
        dispatch({
          type:  GET_ERRORS,
          payload: err.response.data,
        })
      );

  };

//get all event
export const getEvents = () =>(dispatch) => {
  axios
    .get("admin/events")
    .then((res) => {
      dispatch({
          type:GET_EVENTS,
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
// export const deleteEvent=(idEvent)=>(dispatch)=>{
//   axios.delete(`/event/delete/${idEvent}`)
//   .then(res=>dispatch(getEvents()))
//   .catch(err=>console.log(err))
// }