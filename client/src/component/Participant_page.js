import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory,Link} from "react-router-dom";
import {unfollowEvent,followEvent,getEvent,endEvent, fullEvent, openEvent} from "../actions/evntAction";
import get_month from "../outils/get_month"
import "../organizer.css";
import M from "materialize-css";
import { GET_ERRORS,ADD_FOCUS, SHOW_MAP, STATE_MAP,SHOW_TALK, ADD_TALK  } from "../actions/types";
import {getCurrentUser, userBlock } from "../actions/authaction";
import history from "../outils/history"
import { getUsers,getEvents } from '../actions/adminaction';
import "../participant.css"
import { logoutUser } from "../actions/authaction";
import calcul_rating from "../outils/calucle_rating";
import Footer from "./Footer"
import { formatRelative } from "date-fns";
import MyMap from "./Maps";
import {geteventorg } from "../outils/geteventorg";
import Navbar from "./Navbar";
import historyuser from "../outils/history";
import {getComment} from "../actions/comntaction"
import nbr_comments from "../outils/nbr_comments"
import Sanctions from "./User_Sanctions";
function Participant_page({match}) {
    const dispatch = useDispatch();
    const history =useHistory()
    const auth = useSelector((state) => state.auth);
    const errors=useSelector(state=>state.errors)
    const users=useSelector(state=>state.admin.users)
    const allevents = useSelector((state) => state.admin.events);
    const comments=useSelector(state=>state.comments)
    const chat=useSelector(state=>state.chat)
    var rs=0;
    var pr=0;
    var useremail=(users.find(el=>el._id==match.params.participantId).email)

  useEffect(()=>{
    
   localStorage.token&&dispatch(getCurrentUser())
 M.Modal.init(document.querySelectorAll(".modal"))
 dispatch(getUsers())
 dispatch(getComment())
 dispatch(getEvents())
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

    return (
<>
<Navbar/>

<div className=" row" style={{verticalAlign: "middle",margin:"30px 15px 20px 15px"
}}>
        <div className=" col s12 organizer_hi "
         >
            {users.length!=0&& <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div style={{position:"relative"}}>
                 <img  style={{width:130,height:130,paddingTop:10}} src={users.find(el=>el._id==match.params.participantId).avatar} alt="" className="circle"/>

                {auth.user.blocked&&auth.user._id!=match.params.participantId&&!(auth.user.blocked.includes(match.params.participantId)||users.find(el=>el._id==match.params.participantId).blocked.includes(auth.user._id))&&<i

                  className="fas fa-envelope"
style={{color:"#ffbc1c",lineHeight:"unset",position:"absolute",left:-5,top:1,fontSize:22,cursor:"pointer"}}
                  title="Let's talk"
                  onClick={()=>{
                    if(auth.isAuthenticated)
                    {dispatch({
                    type:SHOW_TALK,
                    payload:!chat.talk.show
                  })
                  dispatch({
                    type:ADD_TALK,
                    payload:match.params.participantId
                  })
                }
                else
                history.push("/login")
                }}
                  >  
                  </i>}
                  {auth.user.blocked&&auth.isAuthenticated&&auth.user._id!=match.params.participantId&&!auth.user.blocked.includes(match.params.participantId)&&auth.user.role!="moderator"&&auth.user.role!="administrator"&&<i
                  className="material-icons modal-trigger"
style={{color:"red",lineHeight:"unset",position:"absolute",left:-4,bottom:1,fontSize:22,cursor:"pointer"}}
                  title={`block ${users.find(el=>el._id==match.params.participantId).fname} ${users.find(el=>el._id==match.params.participantId).lname}`}
                  data-target="modalblock"
                  > block 
                  </i>}
               
                 {users.find(el=>el._id==match.params.participantId).online?<div style={{
                              display:"flex",
                              justifyContent:"center",
                              alignItems:"center",
                              position:"absolute",
                              background:"green",
                              right:4,
                              bottom:8,
                              borderRadius:"50%",
                              width:10,
                              height:10
                            }}><span style={{marginLeft:50, color:"green", fontSize:11, fontWeight:"bold"}}>Online</span></div>:
                            <div style={{
                              display:"flex",
                              justifyContent:"center",
                              alignItems:"center",
                              position:"absolute",
                              background:"#616161",
                              right:4,
                              bottom:8,
                              borderRadius:"50%",
                              width:10,
                              height:10
                            }}><span style={{marginLeft:50, color:"#616161", fontSize:11, fontWeight:"bold"}}>Offline</span></div>
                            }
                            </div>
                            </div>}
            <p className="h5-tit" style={{paddingTop:0}}>
              {users.length!=0&&users.find(el=>el._id==match.params.participantId).fname} {users.length!=0&&users.find(el=>el._id==match.params.participantId).lname}
            </p>
            <div className="h5-tit" style={{padding:0,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#2e8fa5",fontSize:25,marginBottom:3}}>¤ {users.length!=0&&users.find(el=>el._id==match.params.participantId).note} ¤</div>
          </div>
          {(match.params.participantId==auth.user._id||auth.user.role=="administrator"||auth.user.role=="moderator")&&
          <div className="sanction_list">  
          <a className="modal-trigger" data-target="modalsanction" title="Subscriptions" href='#!' style={{ cursor:"pointer",  boxShadow: "0px 8px 20px 0px rgba(24, 32, 111, 0.8)"}}>
<i className="fas fa-angle-double-right"  style={{ marginRight: "5px" }}></i>
<span>Sanctions</span>
</a></div>}
        </div>

<div className="row quicksearch" style={{margin:"30px 15px 20px 15px",fontSize:15,height:200,paddingTop:10,position:"relative"}} >
 <div className="col s12 l4" style={{fontSize:14, fontWeight:"bold"}}>
 Inscription date: {users.length!=0&&users.find(el=>el._id==match.params.participantId).created_at.toString().replace('Z', '').replace('T', ' ').replace(/\.\d+/, "")}
<br /><br />Comments number:{" "}
    {(comments.comments&&comments.comments).map(elc=>{elc.reply.filter(el=>el.postedBy==match.params.participantId).map(el=>{rs=rs+1})})}
    {comments.comments&& nbr_comments(comments.comments.filter(el=>el.postedBy==match.params.participantId).length)+ rs}
    <br /><br /><div>{(allevents&&allevents).map(el=>{el.participant.includes(match.params.participantId) && (pr=pr+1)})}  Participated to: {pr} events</div>
 </div></div>  

  
 
 <div id="modalblock" className="modal">
          <div className="modal-content">
            <h4>User block</h4>
            <p>Are you sure you want to block this user?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close  btn-flat"
              onClick={()=>dispatch(userBlock(match.params.participantId))}
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close  btn-flat"
            >
              Cancel
            </a>
          </div>
        </div>
        <div
          id="modalsanction"
          className="modal"
          style={{ padding: 0, margin: 0,}}
        >
          <Sanctions useremail={useremail}/>
        </div> 
 {/* <Footer/>     */}
        </>
    )
}

export default Participant_page

