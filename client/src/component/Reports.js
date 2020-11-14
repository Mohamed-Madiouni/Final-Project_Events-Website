import React, { useEffect, useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { useDispatch,useSelector } from 'react-redux';
import {removereportComment, removereportReply, getComment,addComment,editComment, addreply,editReply,deleteComment, deleteReply, likecomment,dislikecomment, removelikecomment, removedislikecomment, likereply, removelikereply,dislikereply, removedislikereply} from "../actions/comntaction"
import {getEvent} from "../actions/evntAction";
import historyevent from "../outils/history"
import { useHistory,Link } from 'react-router-dom';
import "../comments.css";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";
import { getUsers } from '../actions/adminaction';
import { logoutUser } from "../actions/authaction";
import {v4 as uuidv4} from "uuid"
import Pusher from 'pusher-js'
import nbr_comments from "../outils/nbr_comments"
import "../notification.scss";
function Reports({match, history}) {
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
const [removereport,setRemovereport]=useState(true)
const [deletereplyid,setDeletereplyid]=useState("")
const[actvlike,setactvlike]=useState(true)
const[resiz,setresiz]=useState(false)
const [sort,setsort]=useState(false)
const [sorttype,setsorttype]=useState({type:"relevent"})
const  [unfollow,setunfollow]=useState("")
    useEffect(()=>{
        dispatch(getEvent())
        dispatch(getComment())
        dispatch(getUsers())
        setLoad(true)
        M.Modal.init(document.querySelectorAll(".modal"))   
    },[])
var rs=0;

useEffect(()=>{
  window.addEventListener("resize",()=>{
    if(window.innerWidth<992)
    setresiz(true)
    else
    setresiz(false)
  })
})
useEffect(()=>{
 
    if(window.innerWidth<=992)
    setresiz(true)
  
})

   useEffect(()=>{
     setactvlike(true)
   },[auth])

useEffect(()=>{
 setTimeout(() => {
  dispatch(getEvent())
}, 10);
  },[])



useEffect(()=>{
  M.Materialbox.init(document.querySelectorAll('.materialboxed'))
   M.Collapsible.init(document.querySelectorAll('.collapsible'))
},[resiz,allevents])


useEffect(()=>{
   M.updateTextFields()
  //  if(edit&&reply)
  //  M.textareaAutoResize(document.querySelector(".materialize-textarea"));
   if(errors.success)
    setEdit("")
   if(errors.added)
   setComnt("")
   if(errors.reply)
   setReply("")
  })

  useEffect(()=>{
    // Pusher.logToConsole = true;

    var pusher = new Pusher(process.env.REACT_APP_KEY, {
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
    dispatch(editReply(edit,textedit.trim(),replyid))
  }
    return (
      <>
        <div>
          <h4 className="center" style={{ marginTop: "20px" }}>Comment Moderation</h4>
        </div>
        {load&&allevents.length!=0&&users.length!=0&&<>
        <div className="row" style={{marginTop:10,filter:unfollow&&"blur(3px)",margin:0}} onClick={(e)=>{
         emoj&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmoj(!emoj)
         emojedt&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmojedt(!emojedt)
         emojreply&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmojReply(!emojreply)
         sort&&!document.querySelector(".sort").contains(e.target)&&setsort(!sort)
         unfollow&&!document.querySelector(".custom_mod").contains(e.target)&&setunfollow("")
        }}>
            <div className='col l12 s12 '>
     <div className="comment_sec">

    <div>
    </div>


<div style={{position:"relative"}}>
    <p className="comment" >
    {(comments.comments&&comments.comments).map(elc=>{elc.reply.filter(el=>el.reports>0).map(el=>{rs=rs+1})})}
    {comments.comments&& nbr_comments(comments.comments.filter(el=>el.reports>0).length)+ rs +" "}
    Reported comment{comments.comments&&comments.comments.filter(elm=>elm).length==0?"":"s"}
    <i className="fas fa-list" onClick={()=>setsort(!sort)} title="Sort by"></i>
    </p> 
    {sort&&<div className="sort">
      <p style={{ color:sorttype.type=="relevent"&& "white",background:sorttype.type=="relevent"&& "#2e8fa5"}} onClick={()=>{
        setsorttype({type:"relevent"})
        setsort(!sort)
        }}>Most Relevent</p>
      <div className="divider"></div>
      <p style={{ color:sorttype.type=="newest"&& "white",background:sorttype.type=="newest"&& "#2e8fa5"}} onClick={()=>{
        setsorttype({type:"newest"})
        setsort(!sort)
        }}>Newest</p>
    </div>}
    </div>

  {(comments.comments&&comments.comments).filter(el=>el.reports>0).slice(0).sort(function(a, b) {
  return sorttype.type=="relevent"? (a.likes - b.likes):(a.created_at - b.created_at);
}).reverse().slice(0,10+count*10).map(el=>{
return(

<ul className="collection" key={el._id} style={{overflow:"initial"}}>
    <li className="collection-item avatar">
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2,alignItems:"center"}}>
    <div>
<Link to={`/${users.find(e=>e._id==el.postedBy).role}/${users.find(e=>e._id==el.postedBy)._id}`}>
          <img src={users.find(e=>e._id==el.postedBy).avatar} alt="" className="circle"/>
</Link>
       <div style={{display:"flex",alignItems:"center"}}>
         <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
       <Link to={`/${users.find(e=>e._id==el.postedBy).role}/${users.find(e=>e._id==el.postedBy)._id}`}> <p><b>{(users.find(e=>e._id==el.postedBy).fname+" "+users.find(e=>e._id==el.postedBy).lname)}</b></p> 
       </Link>
       </div>
{users.find(e=>e._id==el.postedBy).role!="participant"&&<p style={{marginLeft:10,height:"fit-content",display:"flex",alignItems:"center",color:(users.find(e=>e._id==el.postedBy).role=="organizer"&&"#3183E0"||(users.find(e=>e._id==el.postedBy).role=="administrator"&&"#FF4848")||(users.find(e=>e._id==el.postedBy).role=="moderator"&&"#56A26F"))}}>
  <i className="material-icons" style={{fontSize:19,margin:2}}>{(users.find(e=>e._id==el.postedBy).role=="organizer"&&"content_paste"||(users.find(e=>e._id==el.postedBy).role=="moderator"&&"star"))}</i>
  {users.find(e=>e._id==el.postedBy).role=="administrator"&&<i className="fas fa-crown" style={{margin:6,marginLeft: 0,transform:"translateY(-1px)"}}></i>}
  {users.find(e=>e._id==el.postedBy).role}
  {users.find(e=>e._id==el.postedBy).role=="administrator"&&<i className="fas fa-crown" style={{margin:6,transform:"translateY(-1px)"}}></i>}
  <i className="material-icons" style={{fontSize:19,margin:2}}>{(users.find(e=>e._id==el.postedBy).role=="organizer"&&"content_paste"||(users.find(e=>e._id==el.postedBy).role=="moderator"&&"star"))}</i></p>}
</div>
      </div>
      <span style={{display:"flex",justifyContent:"right"}}>
     {(el.postedBy==auth.user._id||auth.user.role=="administrator"||auth.user.role=="moderator")&&<div id="editdelete">
       {!edit||el._id!=edit?<i className="material-icons" title="Edit" onClick={()=>{
setEdit(el._id)
setTextedit(el.content)
       }}>edit</i>:
       el._id==edit&&<i className="material-icons" title="Cancel" onClick={()=>{
setEdit("")
setTextedit("")
       }}>close</i>}
<i onClick={()=>setDeletecomid(el._id)} className="modal-trigger material-icons" data-target="modaldeletcom" title="Delete">delete</i>
<i onClick={()=>setRemovereport(el._id)} className="modal-trigger count" data-target="modaldeletreportcom" title="Remove Report"><span className="num" style={{top:"5px", left:"9px"}}>{el.reports}</span></i>
     </div>}</span>
      </div>
  
      {el._id!=edit?<p style={{overflowWrap: "break-word"}}>{el.content}</p>:
       
       
       <form>
       <div style={{width:"100%",position:"relative"}}>
       
         <textarea value={textedit} 
        onChange={(e)=>setTextedit(e.target.value)}
         onKeyDown={(e)=> { if (e.key === "Enter") onedit(e)}}
                 className="materialize-textarea"
                  style={{paddingRight:"30px"}}
                  id="textarea_edit"
                  autoFocus
                  > 
                  </textarea> 
                  
       <i className="far fa-smile"  style={{position:"absolute",bottom:20,right:5,cursor:"pointer",color :"gray"}} onClick={()=>setEmojedt(!emojedt)}></i>
       {textedit&&<i className="fab fa-telegram-plane" style={{position:"absolute",top:6,right:5,cursor:"pointer",color:"gray"}} onClick={(e)=>onedit(e)}></i>}
         {emojedt&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-360px",right:0,zIndex:9999999999}} id="emoj_cont">
           
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
         <div style={{marginTop:5,display:"flex",alignItems:"center",justifyContent:"space-between"}} id="editdelete">
         <div style={{display:"flex",alignItems:"center"}}> 
         <i className="far fa-thumbs-up" title="like" style={{cursor:"pointer",color:auth.isAuthenticated&&auth.user.likes.includes(el._id)&&"#2e8fa5"}} onClick={()=>
          {if(actvlike)
            {if(auth.isAuthenticated&&!auth.user.likes.includes(el._id))
              
          {setactvlike(false)
            dispatch(likecomment(el._id,Number(el.likes)+1,auth.user._id))

            auth.user.dislikes.includes(el._id)&& dispatch(removedislikecomment(el._id,Number(el.dislikes)-1,auth.user._id))}
            else
            {setactvlike(false)
            dispatch(removelikecomment(el._id,Number(el.likes)-1,auth.user._id))
            
            }
            if(!auth.isAuthenticated)
            history.push("/login")}
            }}></i>
        <p style={{margin:"0px 5px 0px 5px",lineHeight:"normal",minWidth:6}}>{el.likes==0?"":el.likes}</p>
         <i className="far fa-thumbs-down fa-flip-horizontal" title="dislike" style={{color:auth.isAuthenticated&&auth.user.dislikes.includes(el._id)&&"#2e8fa5"}} onClick={()=>
          {if(actvlike)
            {if(auth.isAuthenticated&&!auth.user.dislikes.includes(el._id))
            {setactvlike(false)
              dispatch(dislikecomment(el._id,Number(el.dislikes)+1,auth.user._id))
            auth.user.likes.includes(el._id)&& dispatch(removelikecomment(el._id,Number(el.likes)-1,auth.user._id))}
            else
           { setactvlike(false)
            dispatch(removedislikecomment(el._id,Number(el.dislikes)-1,auth.user._id))}
            if(!auth.isAuthenticated)
            history.push("/login")}
            }}></i>
           <p style={{margin:"0px 5px 0px 5px",lineHeight:"normal",minWidth:6}}>{el.dislikes==0?"":el.dislikes}</p> 
           </div>
           <p style={{color:"rgb(0, 96, 100)"}} >{historyevent(el.created_at)}</p> 
            </div>
      
      {el.reply.length?<div style={{display:"flex",cursor:"pointer",marginTop:3,color: "rgb(46, 143, 165)",fontWeight: 550}} onClick={()=>{
             if(replycount&&el._id!=replyid)
            { setReplayCount(replycount)
             setReply("")
             setReplyId(el._id)}

else
              {setReplayCount(!replycount)
              setReply("")
              setReplyId(el._id)}
              }}>
          <i
                  className="material-icons"
                >
                 {!(replycount&&el._id==replyid)?'expand_more':'expand_less'}
                </i>
            <p  >{!(replycount&&el._id==replyid)? `Show the ${el.reply.length} replies`:`hide ${el.reply.length} replies`}</p>
          </div>:""}
  {replycount&&el._id==replyid&&
  
  (
    <>
    {el.reply.map((el,i)=>{
    return (
    <ul className="collection" key={i} style={{overflow:"initial",marginLeft:15}}>
    <li className="collection-item avatar">
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2,alignItems:"center"}}>
       <div>



<Link to={`/${users.find(e=>e._id==el.postedBy).role}/${users.find(e=>e._id==el.postedBy)._id}`}>
          <img src={users.find(e=>e._id==el.postedBy).avatar} alt="" className="circle"/>
</Link>
       <div style={{display:"flex",alignItems:"center"}}> 
       <Link to={`/${users.find(e=>e._id==el.postedBy).role}/${users.find(e=>e._id==el.postedBy)._id}`}><p><b>{(users.find(e=>e._id==el.postedBy).fname+" "+users.find(e=>e._id==el.postedBy).lname)}</b></p> 
</Link>
{users.find(e=>e._id==el.postedBy).role!="participant"&&<p style={{marginLeft:10,height:"fit-content",display:"flex",alignItems:"center",color:(users.find(e=>e._id==el.postedBy).role=="organizer"&&"#3183E0"||(users.find(e=>e._id==el.postedBy).role=="administrator"&&"#FF4848")||(users.find(e=>e._id==el.postedBy).role=="moderator"&&"#56A26F"))}}>
  <i className="material-icons" style={{fontSize:19,margin:2}}>{(users.find(e=>e._id==el.postedBy).role=="organizer"&&"content_paste"||(users.find(e=>e._id==el.postedBy).role=="moderator"&&"star"))}</i>
  {users.find(e=>e._id==el.postedBy).role=="administrator"&&<i className="fas fa-crown" style={{margin:6,marginLeft: 0,transform:"translateY(-1px)"}}></i>}
  {users.find(e=>e._id==el.postedBy).role}
  {users.find(e=>e._id==el.postedBy).role=="administrator"&&<i className="fas fa-crown" style={{margin:6,transform:"translateY(-1px)"}}></i>}
  <i className="material-icons" style={{fontSize:19,margin:2}}>{(users.find(e=>e._id==el.postedBy).role=="organizer"&&"content_paste"||(users.find(e=>e._id==el.postedBy).role=="moderator"&&"star"))}</i></p>}

</div>
      </div><span style={{display:"flex",justifyContent:"right"}}>
     {(el.postedBy==auth.user._id||auth.user.role=="administrator"||auth.user.role=="moderator")&&<span id="editdelete">
     {!edit||el.id!=edit?<i className="material-icons" title="Edit" onClick={()=>{
setEdit(el.id)
setTextedit(el.content)
       }}>edit</i>:
       el.id==edit&&<i className="material-icons" title="Cancel" onClick={()=>{
setEdit("")
setTextedit("")
       }}>close</i>}
<i onClick={()=>setDeletereplyid(el.id)} className='modal-trigger material-icons' data-target='modaldeletreply' title="delete">delete</i>
</span>}
</span>
      </div>
      {el.id!=edit?<p style={{overflowWrap: "break-word"}}>{el.content}</p>:
       
       
       <form>
      
         
       <div style={{width:"100%",position:"relative"}}>
       
         <textarea value={textedit} 
        onChange={(e)=>setTextedit(e.target.value)}
         onKeyDown={(e)=> { if (e.key === "Enter") textedit.search(/\w/gi)!== -1&&oneditreply(e)}}
                 className="materialize-textarea"
                  style={{paddingRight:"30px"}}
                  id="textarea_edit"
                  autoFocus
                  > 
                  </textarea> 
                  
       <i className="far fa-smile"  style={{position:"absolute",bottom:20,right:5,cursor:"pointer",color:"gray"}} onClick={()=>setEmojedt(!emojedt)}></i>
       {textedit.search(/\w/gi)!== -1&&<i className="fab fa-telegram-plane" style={{position:"absolute",top:6,right:5,cursor:"pointer",color:"gray"}} onClick={(e)=>oneditreply(e)}></i>}
         {emojedt&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-360px",right:0,zIndex:9999999999}} id="emoj_cont">
           
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
 
         <div style={{marginTop:5,display:"flex",alignItems:"center",justifyContent:"space-between"}} id="editdelete">
         <div style={{display:"flex",alignItems:"center"}}>
         <i className="far fa-thumbs-up" title="like" style={{cursor:"pointer",color:auth.isAuthenticated&&auth.user.likes.includes(el.id)&&"#2e8fa5"}} onClick={()=>
          {if(actvlike)
            {if(auth.isAuthenticated&&!auth.user.likes.includes(el.id))
            {setactvlike(false)
              dispatch(likereply(el.id,Number(el.likes)+1,auth.user._id,replyid))
            auth.user.dislikes.includes(el.id)&&dispatch(removedislikereply(el.id,Number(el.dislikes)-1,auth.user._id,replyid))}
            else
            {setactvlike(false)
            dispatch(removelikereply(el.id,Number(el.likes)-1,auth.user._id,replyid))}
            if(!auth.isAuthenticated)
            history.push("/login")}
            }}></i>
        <p style={{margin:"0px 5px 0px 5px",lineHeight:"normal",minWidth:6}}>{el.likes==0?"":el.likes}</p>
         <i className="far fa-thumbs-down fa-flip-horizontal" title="dislike" style={{color:auth.isAuthenticated&&auth.user.dislikes.includes(el.id)&&"#2e8fa5"}} onClick={()=>
          {if(actvlike)
           { if(auth.isAuthenticated&&!auth.user.dislikes.includes(el.id))
            {setactvlike(false)
              dispatch(dislikereply(el.id,Number(el.dislikes)+1,auth.user._id,replyid))
            auth.user.likes.includes(el.id)&& dispatch(removelikereply(el.id,Number(el.likes)-1,auth.user._id,replyid))}
            else
            {setactvlike(false)
            dispatch(removedislikereply(el.id,Number(el.dislikes)-1,auth.user._id,replyid))}
            if(!auth.isAuthenticated)
            history.push("/login")}
            }}></i>
           <p style={{margin:"0px 5px 0px 5px",lineHeight:"normal",minWidth:6}}>{el.dislikes==0?"":el.dislikes}</p> 
          </div>
          <p style={{color:"rgb(0, 96, 100)"}}>{historyevent(el.created_at)}</p>
          </div>
   </li>

  </ul>
    )
  })}

    </>
    )
  }
    </li>
    
  </ul>
)
  })}


 
 



























  
  {(comments.comments&&comments.comments).slice(0).sort(function(a, b) {
    return sorttype.type=="relevent"? (a.likes - b.likes):(a.created_at - b.created_at);
  }).reverse().map(elc=><div key={elc._id}>{elc.reply.filter(el=>el.reports>0).map(el=>{
return(

<ul className="collection" key={el.id} style={{overflow:"initial"}}>
    <li className="collection-item avatar">
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2,alignItems:"center"}}>
       <div>
       <Link to={`/${users.find(e=>e._id==el.postedBy).role}/${users.find(e=>e._id==el.postedBy)._id}`}>
          <img src={users.find(e=>e._id==el.postedBy).avatar} alt="" className="circle"/>
</Link>
       <div style={{display:"flex",alignItems:"center"}}>
         <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
       <Link to={`/${users.find(e=>e._id==el.postedBy).role}/${users.find(e=>e._id==el.postedBy)._id}`}> <p><b>{(users.find(e=>e._id==el.postedBy).fname+" "+users.find(e=>e._id==el.postedBy).lname)}</b></p> 
       </Link>
       </div>
{users.find(e=>e._id==el.postedBy).role!="participant"&&<p style={{marginLeft:10,height:"fit-content",display:"flex",alignItems:"center",color:(users.find(e=>e._id==el.postedBy).role=="organizer"&&"blue"||(users.find(e=>e._id==el.postedBy).role=="administrator"&&"red")||(users.find(e=>e._id==el.postedBy).role=="moderator"&&"green"))}}>
  <i className="material-icons" style={{fontSize:19,margin:2}}>{(users.find(e=>e._id==el.postedBy).role=="organizer"&&"content_paste"||(users.find(e=>e._id==el.postedBy).role=="moderator"&&"star"))}</i>
  {users.find(e=>e._id==el.postedBy).role=="administrator"&&<i className="fas fa-crown" style={{margin:6,marginLeft: 0,transform:"translateY(-1px)"}}></i>}
  {users.find(e=>e._id==el.postedBy).role}
  {users.find(e=>e._id==el.postedBy).role=="administrator"&&<i className="fas fa-crown" style={{margin:6,transform:"translateY(-1px)"}}></i>}
  <i className="material-icons" style={{fontSize:19,margin:2}}>{(users.find(e=>e._id==el.postedBy).role=="organizer"&&"content_paste"||(users.find(e=>e._id==el.postedBy).role=="moderator"&&"star"))}</i></p>}


</div>
      </div><span style={{display:"flex",justifyContent:"right"}}>
     {(el.postedBy==auth.user._id||auth.user.role=="administrator"||auth.user.role=="moderator")&&<div id="editdelete">
     {!edit||el.id!=edit?<i className="material-icons" title="Edit" onClick={()=>{
setEdit(el.id)
setTextedit(el.content)
       }}>edit</i>:
       el.id==edit&&<i className="material-icons" title="Cancel" onClick={()=>{
setEdit("")
setTextedit("")
       }}>close</i>}
<i onClick={()=>setDeletereplyid(el.id)} className='modal-trigger material-icons' data-target='modaldeletreply' title="delete">delete</i>
<i onClick={()=>setRemovereport(el.id)} className="modal-trigger count" data-target="modaldeletreportreply" title="Remove Report"><span className="num" style={{top:"5px", left:"9px"}}>{el.reports}</span></i>

</div>}
</span>
      </div>
  
      {el.id!=edit?<p style={{overflowWrap: "break-word"}}>{el.content}</p>:
       
       
       <form>
       <div style={{width:"100%",position:"relative"}}>
       
         <textarea value={textedit} 
        onChange={(e)=>setTextedit(e.target.value)}
         onKeyDown={(e)=> { if (e.key === "Enter") textedit.search(/\w/gi)!== -1&&oneditreply(e)}}
                 className="materialize-textarea"
                  style={{paddingRight:"30px"}}
                  id="textarea_edit"
                  autoFocus
                  > 
                  </textarea> 
                  
       <i className="far fa-smile"  style={{position:"absolute",bottom:20,right:5,cursor:"pointer",color :"gray"}} onClick={()=>setEmojedt(!emojedt)}></i>
       {textedit.search(/\w/gi)!== -1&&<i className="fab fa-telegram-plane" style={{position:"absolute",top:6,right:5,cursor:"pointer",color:"gray"}} onClick={(e)=>oneditreply(e)}></i>}
         {emojedt&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-360px",right:0,zIndex:9999999999}} id="emoj_cont">
           
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
         <div style={{marginTop:5,display:"flex",alignItems:"center",justifyContent:"space-between"}} id="editdelete">
         <div style={{display:"flex",alignItems:"center"}}> 
         <i className="far fa-thumbs-up" title="like" style={{cursor:"pointer",color:auth.isAuthenticated&&auth.user.likes.includes(el.id)&&"#2e8fa5"}} onClick={()=>
          {if(actvlike)
            {if(auth.isAuthenticated&&!auth.user.likes.includes(el.id))
            {setactvlike(false)
              dispatch(likereply(el.id,Number(el.likes)+1,auth.user._id,replyid))
            auth.user.dislikes.includes(el.id)&&dispatch(removedislikereply(el.id,Number(el.dislikes)-1,auth.user._id,replyid))}
            else
            {setactvlike(false)
            dispatch(removelikereply(el.id,Number(el.likes)-1,auth.user._id,replyid))}
            if(!auth.isAuthenticated)
            history.push("/login")}
            }}></i>
        <p style={{margin:"0px 5px 0px 5px",lineHeight:"normal",minWidth:6}}>{el.likes==0?"":el.likes}</p>
         <i className="far fa-thumbs-down fa-flip-horizontal" title="dislike" style={{color:auth.isAuthenticated&&auth.user.dislikes.includes(el.id)&&"#2e8fa5"}} onClick={()=>
          {if(actvlike)
           { if(auth.isAuthenticated&&!auth.user.dislikes.includes(el.id))
            {setactvlike(false)
              dispatch(dislikereply(el.id,Number(el.dislikes)+1,auth.user._id,replyid))
            auth.user.likes.includes(el.id)&& dispatch(removelikereply(el.id,Number(el.likes)-1,auth.user._id,replyid))}
            else
            {setactvlike(false)
            dispatch(removedislikereply(el.id,Number(el.dislikes)-1,auth.user._id,replyid))}
            if(!auth.isAuthenticated)
            history.push("/login")}
            }}></i>
           <p style={{margin:"0px 5px 0px 5px",lineHeight:"normal",minWidth:6}}>{el.dislikes==0?"":el.dislikes}</p>             
           </div>
           <p style={{color:"rgb(0, 96, 100)"}} >{historyevent(el.created_at)}</p> 
            </div>
     </li>
 </ul>
)
  })}
</div>)}

          {((count+1)*10)<comments.comments.filter(el=>el.reports>0).length&&
          <div style={{
            marginBottom:"5px",
            cursor: "pointer",
            display: "flex",
            justifyContent:"center",
            alignItems:"center"}}
            id="loadMore" className="thb-gp-load-more"
            data-thb-gp-lm-type="event"
            data-org-text="MORE"
            onClick={() => {
              setCount(count+1)
         }}>SHOW MORE COMMENT</div>
          }
     </div>
    </div>
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
              className="modal-close  btn-flat"
              onClick={()=>dispatch(deleteReply(deletereplyid))}
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




        <div id="modaldeletreportcom" className="modal">
          <div className="modal-content">
            <h4>Remove Report</h4>
            <p>Are you sure you want to remove the report from this comment?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close  btn-flat"
              onClick={()=>dispatch(removereportComment(removereport,0))}
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


        <div id="modaldeletreportreply" className="modal">
          <div className="modal-content">
            <h4>Remove Report</h4>
            <p>Are you sure you want to remove the report from this reply?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close  btn-flat"
              onClick={()=> dispatch(removereportReply(removereport,0))}        
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




        
   </>
    )
}

export default Reports
