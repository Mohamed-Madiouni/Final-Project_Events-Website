import { GET_EVENTS } from "./types"
import axios from "axios"
export const getEvent=()=>(dispatch)=>{
    axios.get('/event/all')
    .then(res => dispatch({type:GET_EVENTS,payload:res.data}))
    .catch(err => console.log(err))
}
export const addEvent =(newEvent)=>(dispatch)=>{
    axios.post('/event/add', newEvent)
    .then(res=>dispatch(getEvent()))
    .catch(err=>console.log(err))
}
export const deleteEvent=(idEvent)=>(dispatch)=>{
    axios.delete(`/event/delete/${idEvent}`)
    .then(res=>dispatch(getEvent()))
    .catch(err=>console.log(err))
}
export const editEvent=(idEvent,updatedEvent)=>(dispatch)=>{
    axios.put(`/event/edit/${idEvent}`,updatedEvent)
    .then(res=>dispatch(getEvent()))
    .catch(err=>console.log(err))
}