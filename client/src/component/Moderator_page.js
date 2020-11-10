import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory,Link} from "react-router-dom";
import {unfollowEvent,followEvent,getEvent,endEvent, fullEvent, openEvent} from "../actions/evntAction";
import get_month from "../outils/get_month"
import "../organizer.css";
import M from "materialize-css";
import { GET_ERRORS,ADD_FOCUS, SHOW_MAP, STATE_MAP  } from "../actions/types";
import {getCurrentUser } from "../actions/authaction";
import historyevent from "../outils/history"
import { getUsers } from '../actions/adminaction';
import "../participant.css"
import { logoutUser } from "../actions/authaction";
import calcul_rating from "../outils/calucle_rating";
import Footer from "./Footer"
import { formatRelative } from "date-fns";
import MyMap from "./Maps";
import {geteventorg } from "../outils/geteventorg";
import Navbar from "./Navbar";
import {getComment} from "../actions/comntaction"
import nbr_comments from "../outils/nbr_comments"

function Moderator_page({match}) {
  const dispatch = useDispatch();
  const history =useHistory()
  const auth = useSelector((state) => state.auth);
  const errors=useSelector(state=>state.errors)
  const users=useSelector(state=>state.admin.users)
  const comments=useSelector(state=>state.comments)
  var rs=0;

useEffect(() => {
  if (auth.user.banned===true) {
      dispatch(logoutUser());
      history.push("/banned")
     }
});

useEffect(()=>{
  
 localStorage.token&&dispatch(getCurrentUser())
M.Modal.init(document.querySelectorAll(".modal"))
dispatch(getUsers())
dispatch(getComment())
},[])

 useEffect(()=>{
    M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    M.Slider.init(document.querySelectorAll(".slider"), { height: 60,indicators:false });
    M.updateTextFields()
    if(errors.banned)
    {
    M.toast({ html:`Your account has been banned from subscribtion to any event !! \n your restriction will end in ${new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+7)}  `, classes: "red darken-4",displayLength:10000 });
    dispatch({
      type: GET_ERRORS,
      payload: {},
    })
  }   

  })

  var url = window.location.pathname;
  var iduser = url.substring(url.lastIndexOf('/') + 1);

  return (
<>
<Navbar/>

<div className=" row" style={{verticalAlign: "middle",margin:"30px 15px 20px 15px"
}}>
      <div className=" col s12 organizer_hi "
       >
          {users.length!=0&& <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
               <img  style={{width:130,height:130,paddingTop:10}} src={users.find(el=>el._id==iduser).avatar} alt="../public/User_icon.png" className="circle"/>

           </div>}
          <p className="h5-tit" style={{paddingTop:0}}>
            {users.length!=0&&users.find(el=>el._id==iduser).fname} {users.length!=0&&users.find(el=>el._id==iduser).lname}
          </p>

        </div>
      </div>

<div className="row quicksearch" style={{margin:"30px 15px 20px 15px",fontSize:15,height:200,paddingTop:65,position:"relative"}} >
   <h5 style={{position:"absolute",fontSize:35,left:5,top:-30}}><b>Inscription date: {users.length!=0&&users.find(el=>el._id==iduser).created_at}</b></h5>
     <div className="col s12 l4" style={{fontStyle: "",fontSize:17,marginBottom:10}}>
     <span>Comments number:

{(comments.comments&&comments.comments).map(elc=>{elc.reply.filter(el=>el.postedBy==iduser).map(el=>{rs=rs+1})})}
{comments.comments&& nbr_comments(comments.comments.filter(el=>el.postedBy==iduser).length)+ rs +" "}
comment{comments.comments&&comments.comments.filter(elm=>elm).length==0?"":"s"}</span>
 </div>
 <div className="col s12 l8" style={{fontWeight:800,marginBottom:10}}>
 </div>
</div>
<Footer/>    
      </>
  )
}

export default Moderator_page
