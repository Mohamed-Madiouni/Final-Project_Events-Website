import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUsers, banUser, unbanUser } from "../actions/adminaction";
import { getCurrentUser } from '../actions/authaction';
import {useHistory} from "react-router-dom"
import historyuser from "../outils/history"
import "../events.css";
import M from "materialize-css";

const UserList = () => {
    const dispatch = useDispatch()
    const allusers=useSelector(state=>state.admin.users)
    let auth = useSelector(state=>state.auth)
    const history=useHistory()
    const [deleteid,setDeleteid]= useState("")
    const [banid,setBanid]= useState("")
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
  
     <div className="col s8 offset-s2" style={{marginTop:"20px",fontSize:15,fontWeight:800}} >
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
             height:550,
             margin:5
             
           }}
           // key={el._id}
         >

         <div className="card-image circle" style={{height:"50%", width:"100%", alignItems:"center", display:"flex"}}>
           <img className="activator" src={el.avatar} height="70%" width="60%"  style={{borderRadius:"100%" }} />
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

          

            <span className="black-text">
               <br/>{el.role}
             </span>

             <p className="black-text"><br/>{el.email}</p>
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
              onClick={()=>setDeleteid(el._id)}
              disabled={el.role=="administrator"&&true}
            >
              Delete
            </button>    

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








        { ((!el.banned_date)||((el.banned_date-new Date())/(1000*86400))>2)?
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
              data-target="modal2"
              onClick={()=>setBanid(el._id)}
              disabled={el.role=="administrator"&&true}
            >
              Ban
            </button>:
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
            data-target="modal3"
            onClick={()=>setBanid(el._id)}
            disabled={el.role=="administrator"&&true}
          >
            Unban
          </button>
  }




           <div id="modal2" className="modal">
          <div className="modal-content">
            <h4>User Ban</h4>
            <p>Are you sure you want to Ban this User?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=> dispatch(banUser(banid))}
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


        <div id="modal3" className="modal">
          <div className="modal-content">
            <h4>User Unban</h4>
            <p>Are you sure you want to Unban this User?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=> dispatch(unbanUser(banid))}
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