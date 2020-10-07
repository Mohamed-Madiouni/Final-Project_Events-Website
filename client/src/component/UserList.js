import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUsers } from "../actions/adminaction";
import { getCurrentUser } from '../actions/authaction';
import {useHistory} from "react-router-dom"
import get_month from "../outils/get_month"
import historyuser from "../outils/history"
import "../events.css";
import M from "materialize-css";

const UserList = () => {
    const dispatch = useDispatch()
    const allusers=useSelector(state=>state.admin.users)
    let auth = useSelector(state=>state.auth)
    const history=useHistory()
    const [deleteid,setDeleteid]= useState("")
    const [quickSearch, setQuickSearch] = useState({
      fname: "",
      lname: "",
      role: "",
    });
  
    useEffect(()=>{
      dispatch(getUsers())
     localStorage.token&&dispatch(getCurrentUser())
  },[])
  useEffect(()=>{
    M.Slider.init(document.querySelectorAll(".slider"), { height: 40,indicators:false})
    M.updateTextFields()
  })
  
    
      let users=allusers.filter(el=>{
          return(
          
           el.fname.toLowerCase().includes(quickSearch.fname.toLowerCase())
           &&el.role.toLowerCase().includes(quickSearch.role.toLowerCase())
           &&el.lname.toLowerCase().includes(quickSearch.lname.toLowerCase())         
           )
         })    
  
      const onChange = (e) => {
          setQuickSearch({ ...quickSearch, [e.target.id]: e.target.value })};
    return (
      <div>
     
      <div ><h5><b>Manage Users</b></h5></div>
  
     <div style={{marginTop:"20px",fontSize:15,fontWeight:800}} >
       <form >
       <div className="input-field col s4 m5">
   <input placeholder="first name" id="fname" type="text"  value ={quickSearch.fname} onChange={onChange}/>
   <label forhtml="fname">First name</label>
  </div>
  <div className="input-field col s4 m3">
  <select id ="role" value={quickSearch.role} onChange={onChange} style={{display:"initial",marginTop:4,borderRadius:5,outline:"none"}}>
  <option value="">Role</option>
  <option value="Participant" className="green-text">Participant</option>
  <option value="Organizer" className="blue-text">Organizer</option>
  <option value="Admin" className="red-text">Admin</option>
  </select>
  <label className="active">Role</label>
  </div>
  <div className="input-field col s4 m4">
   <input placeholder="Last name" id="lname" type="text" value={quickSearch.lname} onChange={onChange}/>
   <label forhtml="title">Last name</label>
  </div>
       </form>
     </div>
      <div className="row">
    
  {users&&users.slice(0).reverse().map(el=>{
  return (<div className="col s12 m6 l4 xl3" key={el._id} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
  <div
           className="card small sticky-action"
           style={{
             width: 335,
             height:450,
             margin:5
             
           }}
           // key={el._id}
         >

         <div className="card-image circle" style={{height:"100%"}}>
           <img className="activator" src={el.avatar} height="100%" />
         </div>
           
           <div
             className="card-content "
             style={{ padding: "0px 10px 0px 24px" }}
           >
             <span className="card-title  grey-text text-darken-4">
               <b>{el.fname}</b>
             </span>
             <p className="black-text">{el.lname}</p>
             <div
               style={{
                 display: "flex",
                 alignItems: "center",
                 fontSize:13,
                 width:"100%"
               }}
             >

               
             </div>

           </div>

           <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              type="button"
              className="btn btn-large modal-trigger"
              data-target="modal1"
              onClick={()=>setDeleteid(el._id)}
            >
              Delete
            </button>

            <span className="black-text">
               <br/><br/>{el.role}
             </span>
               <span
                 style={{
                   margin: 10,
                   marginLeft: 0,
                   marginRight: 0,
                   display: "flex",
                   alignItems: "left",
                 }}
               >
                 <i
                   className=" tiny material-icons"
                   style={{ margin: 10, marginTop:8}}
                 >
                   history
                 </i>
  
                 {historyuser(el.created_at)}
               </span>
    

           <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>User delete</h4>
            <p>Are you sure you want to delete this User?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=>  dispatch(deleteUser(deleteid))}
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
  export default UserList;