import React, { useEffect, useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
// import data from 'emoji-mart/data/google.json'
// import { NimblePicker } from 'emoji-mart'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import { getCurrentUser } from '../actions/authaction';
import {makeComment, fullEvent, openEvent, } from "../actions/evntAction";
import {getComment,addComment,editComment, addreply,editReply,deleteComment, deleteReply} from "../actions/comntaction"
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

import {v4 as uuidv4} from "uuid"
import Pusher from 'pusher-js'


function Comments({match, history}) {
    const allevents=useSelector(state=>state.events.allEvents)
    const users=useSelector(state=>state.admin.users)
    const comments=useSelector(state=>state.comments)
    const auth =useSelector(state=>state.auth)
    const errors=useSelector(state=>state.errors)
    const dispatch=useDispatch()
    const[load,setLoad]=useState(false)
    const [comnt, setComnt] = useState("");
    const [emoj,setEmoj]=useState(false)
    const [edit,setEdit]=useState("")
    const [textedit,setTextedit]=useState("")
    const [emojedt,setEmojedt]=useState(false)
const [count,setCount] = useState(0)
const [replycount,setReplayCount]=useState(false)
const [reply,setReply]=useState("")
const [emojreply,setEmojReply]=useState(false)
const[replyid,setReplyId]=useState("")
const [deletecomid,setDeletecomid]=useState("")
const [deletereplyid,setDeletereplyid]=useState("")
    useEffect(()=>{
        dispatch(getEvent())
        dispatch(getUsers())
        dispatch(getComment())
        setLoad(true)
        M.Materialbox.init(document.querySelectorAll('.materialboxed'))
        // M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'),{closeOnClick:false})
        M.Modal.init(document.querySelectorAll(".modal"))
        
    },[])
useEffect(()=>{
   M.updateTextFields()
   if(edit&&reply)
   M.textareaAutoResize(document.querySelector('#textarea_edit'));
   if(errors.success)
   setEdit("")
   if(errors.added)
   setComnt("")
   if(errors.reply)
   setReply("")
  
  })

  useEffect(()=>{
    Pusher.logToConsole = true;

    var pusher = new Pusher('16ca3006a08827062073', {
      cluster: 'eu'
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
     dispatch(getComment())
    });
  },[])

  

  
   useEffect(() => {
      if (auth.user.banned===true) {
          dispatch(logoutUser());
          history.push("/banned")
         }
    });
    const onEmojiClick = ( emoji) => {
    
        setComnt(comnt.concat(emoji.native));
        
      };

     const onsubmit=(e)=>{
          e.preventDefault()
          dispatch(addComment(comnt,match.params.event_id,auth.user._id))
          
      }

      const onedit=(e)=>{
        e.preventDefault()
        dispatch(editComment(edit,textedit))
        
    }
    const onreply=(e)=>{
      e.preventDefault()
      dispatch(addreply(reply,replyid,auth.user._id,uuidv4()))
      
  }

  const oneditreply=(e)=>{
    e.preventDefault()
    dispatch(editReply(edit,textedit,replyid))
  }


    return (
      <>
        {load&&<>
        <Navbar/>
        <div className="row" style={{marginTop:20}} onClick={(e)=>{
         emoj&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmoj(!emoj)
         emojedt&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmojedt(!emojedt)
         emojreply&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmojReply(!emojreply)
        }}>
            <div className='col l8 s12 '>
     <div className="comment_sec">
         <div className="com_picture" style={{borderBottom:"1px solid gray"}}>
           <img className="materialboxed" src={allevents.length!=0?allevents.find(el=>el._id==match.params.event_id).image:""} width="100%" height="430px" />
           <span className="title"><b>{allevents.length!=0&&allevents.find(el=>el._id==match.params.event_id).title}</b></span>
           <p>rating</p>
    <p>{historyevent(allevents.length!=0&&allevents.find(el=>el._id==match.params.event_id).created_at)}</p> 
           </div> 
    <div style={{borderBottom:"1px solid gray"}}>
    <ul className="collection">
    <li className="collection-item avatar">
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <div><img src={users.length!=0?users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).avatar:""} alt="" className="circle"/>
       <p><b>{users.length!=0&&(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).fname+" "+users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).lname)}</b></p> 
      </div> 
      <button>S'abonner</button>
      </div>
     
      <p>{allevents.length!=0&&allevents.find(el=>el._id==match.params.event_id).description}</p>
  
    </li>
    
  </ul>
    </div>
    <p>{comments.comments&&comments.comments.filter(elm=>elm.event==match.params.event_id).length+" "}
    comment{comments.comments&&comments.comments.filter(elm=>elm.event==match.params.event_id).length==0?"":"s"}</p> 
    {auth.isAuthenticated&&<form>
        <div style={{position:"relative",display:"flex"}}>
          <img src={auth.user.avatar} alt="profil" className="circle" width="45px" height="45px"/>
        <div style={{width:"100%"}}>
          <textarea value={comnt} 
         onChange={(e)=>setComnt(e.target.value)}
          onKeyDown={(e)=> { if (e.key === "Enter") onsubmit(e)}}
                  className="materialize-textarea"
                   style={{paddingRight:"30px"}}> 
                   </textarea> 
        <i className="far fa-smile"  style={{position:"absolute",bottom:20,right:5,cursor:"pointer"}} onClick={()=>setEmoj(!emoj)}></i>
         {emoj&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-360px",right:5,zIndex: 1000}} id="emoj_cont">
            
            <Picker
         set='apple'
        color="#2e8fa5"
          onSelect={onEmojiClick} 
         
          i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }}
          
          emojiSize={30}
          showSkinTones={false}
          showPreview={false}
          perLine={8}
   
          />
      </div>}
      </div>
      </div>
            {/* {add&&<div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
              <button onClick={()=>{setAdd(false);setComnt("")}}>Cancel</button>
              <button type="submit" disabled={!comnt}>Add public comment</button>
            </div>} */}
             
         
          </form>}
          {comments.comments&&comments.comments.filter(elm=>elm.event==match.params.event_id).reverse().slice(0,10+count*10).map(el=>{
return(

<ul className="collection" key={el._id} style={{overflow:"initial"}}>
    <li className="collection-item avatar">
      <div style={{display:"flex",justifyContent:"space-between"}}>
       <div>
          <img src={users.find(e=>e._id==el.postedBy).avatar} alt="" className="circle"/>
       <div style={{display:"flex"}}>
       <p><b>{(users.find(e=>e._id==el.postedBy).fname+" "+users.find(e=>e._id==el.postedBy).lname)}</b></p> 
<p>{historyevent(el.created_at)}</p>
</div>
      </div>
     {el.postedBy==auth.user._id&&<div>
       <button onClick={()=>{
setEdit(el._id)
setTextedit(el.content)
       }}>edit</button>
<button onClick={()=>setDeletecomid(el._id)} className="modal-trigger" data-target="modaldeletcom">delete</button>
     </div>}
      </div>
     
      {el._id!=edit?<p style={{overflowWrap: "break-word"}}>{el.content}</p>:
       
       
       <form>
      
         
       <div style={{width:"100%"}}>
       
         <textarea value={textedit} 
        onChange={(e)=>setTextedit(e.target.value)}
         onKeyDown={(e)=> { if (e.key === "Enter") onedit(e)}}
                 className="materialize-textarea"
                  style={{paddingRight:"30px"}}
                  id="textarea_edit"
                  autoFocus
                  > 
                  </textarea> 
                  
       <i className="far fa-smile"  style={{position:"absolute",bottom:30,right:25,cursor:"pointer"}} onClick={()=>setEmojedt(!emojedt)}></i>
         {emojedt&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-352px",right:5,zIndex: 1000}} id="emoj_cont">
           
           <Picker
        set='apple'
       color="#2e8fa5"
         onSelect={(emoji)=>setTextedit(textedit.concat(emoji.native))} 
        
         i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }}
         
         emojiSize={30}
         showSkinTones={false}
         showPreview={false}
         perLine={8}
  
         />
     </div>}
     </div>
     
            
        
         </form>}
        
      {(el.postedBy!=auth.user._id)&&auth.isAuthenticated&&<button style={{display:"block"}} onClick={()=>{ if(!replycount) setReplayCount(!replycount); setReply(""); setReplyId(el._id)}}>reply</button>}
      {el.reply.length?<div style={{display:"flex",cursor:"pointer",color:"blue"}} onClick={()=>{
             
              setReplayCount(!replycount)
              setReply("")
              setReplyId(el._id)
              }}>
          <i
                  className="material-icons"
                >
                 {!(replycount&&el._id==replyid)?'expand_more':'expand_less'}
                </i>
            <p  >{!(replycount&&el._id==replyid)? `Show ${el.reply.length} reaction`:`hide ${el.reply.length} reaction`}</p>
          </div>:""}
  {replycount&&el._id==replyid&&
  
  (
    <>
    {el.reply.slice(0).reverse().map((el,i)=>{
    return (
    <ul className="collection" key={i} style={{overflow:"initial",marginLeft:20}}>
    <li className="collection-item avatar">
      <div style={{display:"flex",justifyContent:"space-between"}}>
       <div>
          <img src={users.find(e=>e._id==el.postedBy).avatar} alt="" className="circle"/>
       <div style={{display:"flex"}}>
       <p><b>{(users.find(e=>e._id==el.postedBy).fname+" "+users.find(e=>e._id==el.postedBy).lname)}</b></p> 
<p>{historyevent(el.created_at)}</p>
</div>
      </div>
     {el.postedBy==auth.user._id&&<div>
       <button onClick={()=>{
setEdit(el.id)
setTextedit(el.content)
       }}>edit</button>
<button onClick={()=>setDeletereplyid(el.id)} className='modal-trigger' data-target='modaldeletreply'>delete</button>
     </div>}
      </div>
     
      {el.id!=edit?<p style={{overflowWrap: "break-word"}}>{el.content}</p>:
       
       
       <form>
      
         
       <div style={{width:"100%"}}>
       
         <textarea value={textedit} 
        onChange={(e)=>setTextedit(e.target.value)}
         onKeyDown={(e)=> { if (e.key === "Enter") oneditreply(e)}}
                 className="materialize-textarea"
                  style={{paddingRight:"30px"}}
                  id="textarea_edit"
                  autoFocus
                  > 
                  </textarea> 
                  
       <i className="far fa-smile"  style={{position:"absolute",bottom:30,right:25,cursor:"pointer"}} onClick={()=>setEmojedt(!emojedt)}></i>
         {emojedt&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-352px",right:5,zIndex: 1000}} id="emoj_cont">
           
           <Picker
        set='apple'
       color="#2e8fa5"
         onSelect={(emoji)=>setTextedit(textedit.concat(emoji.native))} 
        
         i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }}
         
         emojiSize={30}
         showSkinTones={false}
         showPreview={false}
         perLine={8}
  
         />
     </div>}
     </div>
     
            
        
         </form>}
        
      {(el.postedBy!=auth.user._id)&&auth.isAuthenticated&&<button onClick={()=>
        setReply(users.find(e=>e._id==el.postedBy).fname+" "+users.find(e=>e._id==el.postedBy).lname+" ")
        }>reply</button>}
    
    </li>
   
    
  </ul>





    )
  })}
 { auth.isAuthenticated&&<form>
  <div style={{position:"relative",display:"flex",marginLeft:20}}>
    {auth.isAuthenticated&&<img src={auth.user.avatar} alt="profil" className="circle" width="45px" height="45px"/>}
  <div style={{width:"100%"}}>
    <textarea value={reply} 
   onChange={(e)=>setReply(e.target.value)}
    onKeyDown={(e)=> { if (e.key === "Enter") reply&&onreply(e)}}
            className="materialize-textarea inpReply"
             style={{paddingRight:"30px"}}
             autoFocus
             > 
             
             </textarea> 
  <i className="far fa-smile"  style={{position:"absolute",bottom:20,right:5,cursor:"pointer"}} onClick={()=>setEmojReply(!emojreply)}></i>
   {emojreply&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-360px",right:5,zIndex: 1000}} id="emoj_cont">
      
      <Picker
   set='apple'
  color="#2e8fa5"
    onSelect={(emoji)=>setReply(reply.concat(emoji.native))} 
   
    i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }}
    
    emojiSize={30}
    showSkinTones={false}
    showPreview={false}
    perLine={8}

    />
</div>}
</div>
</div>
      {/* {add&&<div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
        <button onClick={()=>{setAdd(false);setComnt("")}}>Cancel</button>
        <button type="submit" disabled={!comnt}>Add public comment</button>
      </div>} */}
       
   
    </form>}
    </>
    )
  }
    </li>
    
  </ul>


)

          })}
          {((count+1)*10)<comments.comments.filter(elm=>elm.event==match.params.event_id).length&&<div style={{display:"flex",cursor:"pointer",color:"blue"}} onClick={()=>{
              setCount(count+1)
              dispatch(getComment())
              }}>
          <i
                  className="material-icons"
                >
                 expand_more
                </i>
            <p  >Show more comments</p>
          </div>}

     </div>
   
     
    </div>
    <div className="col l4 S12">hello</div>
        </div> 
       
       
        
    
      
   </>}
   <div id="modaldeletcom" className="modal">
          <div className="modal-content">
            <h4>Comment delete</h4>
            <p>Are you sure you want to delete the comment?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=>dispatch(deleteComment(deletecomid))}
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
        <div id="modaldeletreply" className="modal">
          <div className="modal-content">
            <h4>Reaction delete</h4>
            <p>Are you sure you want to delete the reaction?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={()=>dispatch(deleteReply(replyid,deletereplyid))}
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
   </>
    )
}

export default Comments
