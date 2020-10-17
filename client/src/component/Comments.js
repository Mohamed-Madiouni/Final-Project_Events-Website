import React, { useEffect, useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
// import data from 'emoji-mart/data/google.json'
// import { NimblePicker } from 'emoji-mart'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import { getCurrentUser } from '../actions/authaction';
import {makeComment,deleteComment,editComment, fullEvent, openEvent, } from "../actions/evntAction";
import {getComment,addComment} from "../actions/comntaction"
import {followEvent, getEvent, unfollowEvent,endEvent, closeEvent} from "../actions/evntAction";

import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import Navbar from './Navbar';
import "../comments.css";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";
import eventClosing from "../outils/eventClosing";
import { getUsers } from '../actions/adminaction';
import { logoutUser } from "../actions/authaction";

function Comments({match, history}) {
    const allevents=useSelector(state=>state.events.allEvents)
    const users=useSelector(state=>state.admin.users)
    const comments=useSelector(state=>state.comments)
    const auth =useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const [comnt, setComnt] = useState("");
    const [add,setAdd]=useState(false)
    const [emoj,setEmoj]=useState(false)

    useEffect(()=>{
        dispatch(getEvent())
        dispatch(getUsers())
        dispatch(getComment())
        M.Materialbox.init(document.querySelectorAll('.materialboxed'))
        // M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'),{closeOnClick:false})
    },[])

    useEffect(() => {
      if (auth.user.banned===true) {
          dispatch(logoutUser());
          history.push("/banned")
         }
    });

    const onEmojiClick = ( emoji) => {
      console.log(emoji)
        setComnt(comnt.concat(emoji.native));
        
      };

     const onsubmit=(e)=>{
          e.preventDefault()
          dispatch(addComment(comnt,match.params.event_id,auth.user._id))
      }
    return (
        < >
        <Navbar/>
        <div className="row" style={{marginTop:20}} onClick={(e)=>{
         return emoj&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmoj(!emoj)&&console.log(e.target)
        }}>
            <div className='col l8 s12 '>
     <div className="comment_sec">
         <img className="materialboxed" src={allevents.length!=0?allevents.find(el=>el._id==match.params.event_id).image:""} width="100%" height="410px" /> 
    <div style={{borderBottom:"1px solid gray"}}>
    <ul className="collection">
    <li className="collection-item avatar">
      <img src={users.length!=0?users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).avatar:""} alt="" class="circle"/>
      <span className="title"><b>{allevents.length!=0&&allevents.find(el=>el._id==match.params.event_id).title}</b></span>
      <div style={{display:"flex",alignItems:"center"}}>
          <p>{users.length!=0&&(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).fname+" "+users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).lname)}</p> 
        <p>rating</p>
    <p>{historyevent(allevents.length!=0&&allevents.find(el=>el._id==match.params.event_id).created_at)}</p> 
      </div>
      
      
    </li>
    
  </ul>
    </div>
    <p>0 Comments</p> 
    <form>
        <div style={{position:"relative"}}>
        <textarea value={comnt} 
         onChange={(e)=>setComnt(e.target.value)}
          onKeyDown={(e)=> { if (e.key === "Enter") onsubmit(e)}}
                  className="materialize-textarea"
                   style={{paddingRight:"30px"}}> 
                   </textarea> 
        <i className="far fa-smile"  style={{position:"absolute",bottom:20,right:5}} onClick={()=>setEmoj(!emoj)}></i>
         {emoj&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-360px",right:5}} id="emoj_cont">
            
            <Picker
         set='google'
        
          onSelect={onEmojiClick} 
         
          i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }}
          
          emojiSize={30}
          showSkinTones={false}
          showPreview={false}
          perLine={8}
   
          />
      </div>}
      </div>
            {/* {add&&<div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
              <button onClick={()=>{setAdd(false);setComnt("")}}>Cancel</button>
              <button type="submit" disabled={!comnt}>Add public comment</button>
            </div>} */}
             
         
          </form>
          
     </div>
   
      
    </div>
    <div className="col l4 S12">hello</div>
        </div> 
       
       
        
    
      
   </>
    )
}

export default Comments
