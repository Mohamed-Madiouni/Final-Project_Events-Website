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
import { sendnewmessage } from "../actions/chat";

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

const onsubmit = ()=>{
 
  dispatch(sendnewmessage([{user:auth.user._id,text:msg}],[auth.user._id,chat.talk.value]))

}

  return (
    <div
      className="container row chat "
      style={{ marginLeft: "auto", marginRight: "auto",width:"90%" }}
    >
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
                    value={msg}
                    onChange={(e) => {
                      setmsg(e.target.value);
                    }}
                    style={{paddingRight:"30px"}}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") msg.search(/\w/gi)!== -1&&onsubmit()
                    }}
                    className="materialize-textarea"
                    placeholder="Talk"
                  ></textarea>
                </div>
                {msg&&<i className="fab fa-telegram-plane" style={{position:"absolute",top:21.5,right:10,cursor:"pointer",color:'gray'}} onClick={(e)=>{}}></i>}
              </div>
            
        
        </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
