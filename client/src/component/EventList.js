import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {deleteEvent} from "../actions/adminaction";
import {getEvents} from "../actions/adminaction";
import { getCurrentUser } from '../actions/authaction';
import {useHistory} from "react-router-dom"
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import "../events.css";
import M from "materialize-css";


const EventList = () => {
  const dispatch = useDispatch()
  const allevents=useSelector(state=>state.admin.events)
  let auth = useSelector(state=>state.auth)
  const history=useHistory()
  const [deleteid,setDeleteid]= useState("")
  const [quickSearch, setQuickSearch] = useState({
    title: "",
    state: "",
    tags: "",
  });

  useEffect(()=>{
    dispatch(getEvents())
   localStorage.token&&dispatch(getCurrentUser())
},[])
useEffect(()=>{
  M.Slider.init(document.querySelectorAll(".slider"), { height: 40,indicators:false})
  M.updateTextFields()
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
   
    <div ><h5><b>Manage Events</b></h5></div>

   <div className="col s8 offset-s2" style={{marginTop:"20px",fontSize:15,fontWeight:800}} >
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
   {(quickSearch.title!="" || quickSearch.state!="" || quickSearch.tags!="")&&
            
  <div className="row" style={{marginLeft:10}} > <h5> <b>{events.length+" result(s) found"}</b> </h5></div>}
    <div className="row">
  
{events&&events.slice(0).reverse().map(el=>{
return (<div className="col s12 m6 l4 xl3" key={el._id} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
<div
         className="card small sticky-action"
         style={{
           width: 335,
           height:420,
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

             <div className="month">
                 {el.time}
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
</div>

}
         </div>



         <button
              style={{
                width: "100px",
                height: "40px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="button"
              className="btn btn-medium modal-trigger"
              data-target="modal1"
              onClick={() => setDeleteid(el._id)}
            >
              Delete
            </button>


         <div className="card-reveal">
           <span className="card-title grey-text text-darken-4">
             <b>{el.title}</b>
             <i className="material-icons right">close</i>
           </span>
           <p>{el.description}</p>
         </div>
           <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Event delete</h4>
            <p>Are you sure you want to delete this event?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=>dispatch(deleteEvent(deleteid))}
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Cancel
            </a>
          </div>
        </div>
       </div>
       </div>)

})}
  
   </div>
</div>
)
}
export default EventList;