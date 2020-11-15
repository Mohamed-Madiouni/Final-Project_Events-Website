import React, { useEffect, useRef, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
// import data from 'emoji-mart/data/google.json'
// import { NimblePicker } from 'emoji-mart'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { addfollow, getCurrentUser, removefollow } from "../actions/authaction";
import {
  makeComment,
  fullEvent,
  openEvent,
  addrating,
} from "../actions/evntAction";
import {
  reportComment,
  reportReply,
  getComment,
  addComment,
  editComment,
  addreply,
  editReply,
  deleteComment,
  deleteReply,
  likecomment,
  dislikecomment,
  removelikecomment,
  removedislikecomment,
  likereply,
  removelikereply,
  dislikereply,
  removedislikereply,
} from "../actions/comntaction";
import {
  followEvent,
  getEvent,
  unfollowEvent,
  endEvent,
  closeEvent,
} from "../actions/evntAction";
import { sendNotifications } from "../actions/notificationaction";
import get_month from "../outils/get_month";
import historyevent from "../outils/history";
import Navbar from "./Navbar";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";
import { getUsers } from "../actions/adminaction";

import { logoutUser } from "../actions/authaction";

import { v4 as uuidv4 } from "uuid";
import Pusher from "pusher-js";
import date_youtube from "../outils/dateyoutube";
import StarRatingComponent from "react-star-rating-component";
import nbr_comments from "../outils/nbr_comments";
import calcul_rating from "../outils/calucle_rating";
import "../chat.css";
import { deleteChat, getChat, sendmessage, sendnewmessage } from "../actions/chat";
import ischat from "../outils/chatfunction";

function Chat() {
  const allevents = useSelector((state) => state.events.allEvents);
  const users = useSelector((state) => state.admin.users);
  const comments = useSelector((state) => state.comments);
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [emoj, setEmoj] = useState(false);
  const [object, setobject] = useState("");
  const [msg, setmsg] = useState("");
  const [delid,setdelid] = useState("")

useEffect(()=>{
  if(errors.newmsg)
  {
    setmsg("")
    dispatch({
      type:GET_ERRORS,
      payload:{}
    })
  }
})

useEffect(()=>{
localStorage.token&&dispatch(getChat())
M.Modal.init(document.querySelectorAll(".modal"))
},[])


const onsubmit = ()=>{
 
  dispatch(sendnewmessage([{user:auth.user._id,text:msg.trim(),created_at:new Date(),id:uuidv4(),delete:false}],[auth.user._id,chat.talk.value],auth.user._id))

}
const onsend =()=>{
  dispatch(sendmessage(chat.discussion.find(el=>el.users.includes(chat.talk.value))._id,{text:msg.trim(),user:auth.user._id,created_at:new Date(),id:uuidv4(),delete:false},auth.user._id))
}

  return (
    <>
    <div
      className="container row chat "
      style={{ marginLeft: "auto", marginRight: "auto",width:"90%", position :"relative" }}
    >
      {!ischat(chat.discussion,chat.talk.value,auth.user._id)?<div>
        <div className="col s12" style={{margin:5}}>
            <div className="col s12">
 <div className="col s12">
            <p style={{fontSize:28,fontWeight:"bold", display: "flex",
              alignItems: "center",
              margin:5,
              width: "100%",
              height: "100%"}}>
                New message
            </p>
        </div>
            </div>
        </div>
       
        <div className="col s12">

        
      <div className="col s12" style={{display:"flex",alignItems:"center",margin:5}}>
        <div className="col s4 l3">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%"
              ,fontWeight:"bold"
            }}
          >
            RECEIVER
          </div>
        </div>
        <div className="col s8 l9">
          <input
            disabled
            value={
              users.find((el) => el._id == chat.talk.value).fname +
              " " +
              users.find((el) => el._id == chat.talk.value).lname
            }
            id="name"
            type="text"
          />
        </div>
      </div>
      {/* <div className="col s12" style={{display:"flex",alignItems:"center"}}>
        <div className="col s4 l3">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%"
              ,fontWeight:"bold"
            }}
          >
            OBJECT
          </div>
        </div>
        <div className="col s8 l9">
          <input
            value={object}
            id="object"
            type="text"
            onChange={(e) => setobject(e.target.value)}
          />
        </div>
      </div> */}
      <div className="col s12" style={{display:"flex",alignItems:"center",margin:5}}>
        <div className="col s4 l3">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
              height: "100%"
              ,fontWeight:"bold"
              
            }}
          >
            MESSAGE
          </div>
        </div>
        <div className="col s8 l9">
          
            
            
              <div className="input_add" style={{ position: "relative", display: "flex",background:"transparent" }}>
                <img
                  src={auth.user.avatar}
                  alt="profil"
                  className="circle"
                  style={{ marginTop: 6 }}
                  width="45px"
                  height="45px"
                />
                <div style={{ width: "100%", marginTop: 6, marginLeft: 5 }}>
                  <textarea
                  autoFocus
                    value={msg}
                    onChange={(e) => {
                      setmsg(e.target.value);
                    }}
                    style={{paddingRight:"30px"}}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") msg.search(/\w/gi)!== -1&&!(auth.user.blocked.includes(chat.talk.value)||users.find(el=>el._id==chat.talk.value).blocked.includes(auth.user._id))?onsubmit():M.toast({ html: "Action denied !! you can't send message to this person", classes: "red" })
                    }}
                    className="materialize-textarea"
                    placeholder="Talk"
                  ></textarea>
                </div>
                { msg.search(/\w/gi)!== -1&&<i className="fab fa-telegram-plane" style={{position:"absolute",top:21.5,right:10,cursor:"pointer",color:'gray'}} onClick={!(auth.user.blocked.includes(chat.talk.value)||users.find(el=>el._id==chat.talk.value).blocked.includes(auth.user._id))?onsubmit:M.toast({ html: "Action denied !! you can't send message to this person", classes: "red" })}></i>}
              </div>
            
        
        </div>
        </div>
      </div>
      </div>:<div className="container">
        
      <div>
            <Link to={`/${users.find(e=>e._id==chat.talk.value).role}/${users.find(e=>e._id==chat.talk.value)._id}`}> <p style={{fontSize:28,fontWeight:"bold", display: "flex",
              alignItems: "center",
              margin:10,
              width: "100%",
              height: "100%"}}>
                
                {users.find(e=>e._id==chat.talk.value).fname+" "+users.find(e=>e._id==chat.talk.value).lname }
            </p></Link>
        </div>
{chat&&chat.discussion.find(el=>el.users.includes(chat.talk.value)&&el.users.includes(auth.user._id)).discussion.map(el=>{
return (
<ul className="collection" key={el.id} style={{overflow:"initial"}}>
    <li className="collection-item avatar" style={{background:el.user==auth.user._id?"#595958":"#55a6f2",color:"white"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:2,alignItems:"center"}}>
       <div>
<Link to={`/${users.find(e=>e._id==el.user).role}/${users.find(e=>e._id==el.user)._id}`}>
          <img src={users.find(e=>e._id==el.user).avatar} alt="" className="circle"/>
</Link>
       <div style={{display:"flex",alignItems:"center"}}>
         <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
       <Link to={`/${users.find(e=>e._id==el.user).role}/${users.find(e=>e._id==el.user)._id}`}> <p style={{color:"white"}}><b>{(users.find(e=>e._id==el.user).fname+" "+users.find(e=>e._id==el.user).lname)}</b></p> 
       </Link>
       </div>
</div>
      </div>
      {/* <span style={{display:"flex",justifyContent:"right"}}> */}
     {(el.user==auth.user._id||auth.user.role=="administrator"||auth.user.role=="moderator")&&<div id="editdelete">
{!el.delete&&<i onClick={()=>{setdelid(el.id)}} className="modal-trigger material-icons" data-target="modaldeletchat" title="Delete" style={{color:"white"}}>delete</i>}
     </div>}
     {/* {(users.find(e=>e._id==el.user).role!="moderator" && users.find(e=>e._id==el.user).role!="administrator" && el.user!=auth.user._id && auth.user.role!="administrator" && auth.user.role!="moderator" && auth.isAuthenticated &&!auth.user.reports.includes(el._id)) && <span id="editdelete"><i onClick={()=>setactvreport(el._id)} className='modal-trigger material-icons' data-target='modalreportcom' title="report">report</i></span>}</span> */}
      </div>
     
      <p style={{overflowWrap: "break-word",textDecorationLine:el.delete&&"line-through"}}>{el.text}</p>

      <p style={{color:"white",marginTop:1,display:"flex",alignItems:"center",justifyContent:"flex-end"}}>{historyevent(el.created_at)}</p>
      </li>
      </ul>
)
})
        } 
          <div className="input_add" style={{ position: "relative", display: "flex",background:"transparent",marginLeft:15 }}>
            <img
              src={auth.user.avatar}
              alt="profil"
              className="circle"
              style={{ marginTop: 6 }}
              width="45px"
              height="45px"
            />
            <div style={{ width: "100%", marginTop: 6, marginLeft: 5 }}>
              <textarea
              autoFocus
                value={msg}
                onChange={(e) => {
                  setmsg(e.target.value);
                }}
                style={{paddingRight:"30px"}}
                onKeyDown={(e) => {
                    if (e.key === "Enter") msg.search(/\w/gi)!== -1&&!(auth.user.blocked.includes(chat.talk.value)||users.find(el=>el._id==chat.talk.value).blocked.includes(auth.user._id))?onsend():M.toast({ html: "Action denied !! you can't send message to this person", classes: "red" })
                }}
                className="materialize-textarea"
                placeholder="Aa"
              ></textarea>
            </div>
            { msg.search(/\w/gi)!== -1&&<i className="fab fa-telegram-plane" style={{position:"absolute",top:21.5,right:10,cursor:"pointer",color:'gray'}} onClick={()=>{!(auth.user.blocked.includes(chat.talk.value)||users.find(el=>el._id==chat.talk.value).blocked.includes(auth.user._id))?onsend():M.toast({ html: "Action denied !! you can't send message to this person", classes: "red" })}}></i>}
          </div>
        
        </div>}
        <div id="modaldeletchat" className="modal" style={{width:"95%",position:"absolute"}}>
          <div className="modal-content">
            <h4>Message delete</h4>
            <p>Are you sure you want to delete the message?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close  btn-flat"
              onClick={()=>dispatch(deleteChat(chat.discussion.find(el=>el.users.includes(chat.talk.value))._id,delid))}
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
    </div>

   
</>
  );
}

export default Chat;
