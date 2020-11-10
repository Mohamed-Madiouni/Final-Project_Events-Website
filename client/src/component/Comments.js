import React, { useEffect, useRef, useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
// import data from 'emoji-mart/data/google.json'
// import { NimblePicker } from 'emoji-mart'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import { addfollow, getCurrentUser, removefollow } from '../actions/authaction';
import {makeComment, fullEvent, openEvent, addrating, } from "../actions/evntAction";
import {reportComment,reportReply,getComment,addComment,editComment, addreply,editReply,deleteComment, deleteReply, likecomment,dislikecomment, removelikecomment, removedislikecomment, likereply, removelikereply,dislikereply, removedislikereply} from "../actions/comntaction"
import {followEvent, getEvent, unfollowEvent,endEvent, closeEvent} from "../actions/evntAction";
import {sendNotifications} from "../actions/notificationaction";
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import Navbar from './Navbar';
import "../comments.css";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";
import { getUsers } from '../actions/adminaction';

import { logoutUser } from "../actions/authaction";

import {v4 as uuidv4} from "uuid"
import Pusher from 'pusher-js'
import date_youtube from '../outils/dateyoutube';
import StarRatingComponent from 'react-star-rating-component';
import nbr_comments from "../outils/nbr_comments"
import calcul_rating from '../outils/calucle_rating';


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

const[actvlike,setactvlike]=useState(true)
const[actvreport,setactvreport]=useState(true)
const [countevent,setCountevent] = useState(0)
const[resiz,setresiz]=useState(false)
const [rating,setRating]=useState(0)
const [star,setstar]=useState(false)
const [msg,setmsg]=useState(false)
const [done,setdone]=useState(true)
const [sort,setsort]=useState(false)
const [sorttype,setsorttype]=useState({type:"relevent"})
const [follow,setfollow]=useState(false)
const  [unfollow,setunfollow]=useState("")
    useEffect(()=>{
        dispatch(getEvent())
        dispatch(getComment())
        dispatch(getUsers())
       
       
        setLoad(true)
     
        // M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'),{closeOnClick:false})
        M.Modal.init(document.querySelectorAll(".modal"))
       
        
    },[])


useEffect(()=>{
localStorage.token&&dispatch( getCurrentUser())
},[])

useEffect(()=>{
  if(errors.follow)
 { M.toast({ html: "subscription added", classes: "green" });
dispatch({
  type:GET_ERRORS,
  payload:{}
})

}

if(errors.unfollow)
 { M.toast({ html: "subscription removed", classes: "red" });
dispatch({
  type:GET_ERRORS,
  payload:{}
})

}
})

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
  
if(allevents.length!=0&&auth.isAuthenticated&& document.querySelector(".fa-star"))
  {
  if(allevents.find(el=>el._id==match.params.event_id).rating.filter(el=>el.userId==auth.user._id).length!=0)
{
    setdone(false)
    setstar(true)
    document.querySelector(".fa-star").style.color="#2e8fa5" 
    setRating(allevents.find(el=>el._id==match.params.event_id).rating.find(el=>el.userId==auth.user._id).rate)
}
else{
  setdone(true)
  setstar(false)
  setRating(0)
  document.querySelector(".fa-star").style.color="black"
}
 }
},[allevents,match.params.event_id])
useEffect(()=>{
if(!auth.isAuthenticated&&document.querySelector(".fa-star")&&allevents.length!=0)
{
  setdone(true)
  setstar(false)
  setRating(0)
  document.querySelector(".fa-star").style.color="black"

}
},[auth.isAuthenticated])

useEffect(()=>{
  M.Materialbox.init(document.querySelectorAll('.materialboxed'))
   M.Collapsible.init(document.querySelectorAll('.collapsible'))
},[match.params.event_id,resiz,allevents])


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
   if(errors.reportcom)
   { M.toast({ html: "Report sended", classes: "green" });
   dispatch({
     type:GET_ERRORS,
     payload:{}
   })
   
   }
   if(errors.reportreply)
   { M.toast({ html: "Report sended", classes: "green" });
   dispatch({
     type:GET_ERRORS,
     payload:{}
   })
   
   }
    
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

  useEffect(()=>{
    if(allevents.length!=0)
   if(allevents.find(el=>el._id==match.params.event_id)==undefined || allevents.find(el=>el._id==match.params.event_id).state=="Invalid")
    history.push("/404")
  })

  
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
          let title= "New Comment";
          let content= auth.user.fname +" "+ auth.user.lname + " commented on your event " + (allevents.find(el=>el._id==match.params.event_id).title);
          let notiftype="New_Comment";
          let compid=match.params.event_id
          var state=[]
          state=[...state,{users:(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id),consulted:false}]
          dispatch(addComment(comnt,match.params.event_id,auth.user._id))
          state[0].users!=auth.user._id &&
          dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
          }

      const onedit=(e)=>{
        e.preventDefault()
        let title= "Comment Edition";
        let content= auth.user.fname +" "+ auth.user.lname + " edit a comment on your event " + (allevents.find(el=>el._id==match.params.event_id).title);
        let notiftype="Comment_Edition";
        let compid=match.params.event_id
        var state=[]
        state=[...state,{users:(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id),consulted:false}]
        dispatch(editComment(edit,textedit))
        state[0].users!=auth.user._id &&
        dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
    }
    const onreply=(e)=>{
      e.preventDefault()
      let title= "Comment Reply";
      let content= auth.user.fname +" "+ auth.user.lname + " replied to a comment on your event " + (allevents.find(el=>el._id==match.params.event_id).title);
      let notiftype="Comment_Reply_organizer";
      let compid=match.params.event_id
      let state=[]
      state=[...state,{users:(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id),consulted:false}]
      dispatch(addreply(reply,replyid,auth.user._id,uuidv4()))
      state[0].users!=auth.user._id &&
      dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
      

      let title2= "Comment Reply";
      let content2= auth.user.fname +" "+ auth.user.lname + " replied to your comment on the event " + (allevents.find(el=>el._id==match.params.event_id).title);
      let notiftype2="Comment_Reply_User";
      let compid2=match.params.event_id
      let state2=[]
      state2=[...state2,{users:(comments.comments.find(el=>el._id==replyid)).postedBy,consulted:false}]
      state[0].users!=state2[0].users &&
      dispatch(sendNotifications(auth.user._id,title2,content2,auth.user.role, notiftype2,state2,compid2))
      
  }

  const oneditreply=(e)=>{
    e.preventDefault()
    dispatch(editReply(edit,textedit,replyid))
  }

  function onStarHover(nextValue, prevValue, name) {
    setRating(nextValue);
  }
 

    return (
      <>
        {load&&allevents.length!=0&&users.length!=0&&<>
        <Navbar/>
        <div className="row" style={{marginTop:10,filter:unfollow&&"blur(3px)"}} onClick={(e)=>{
         emoj&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmoj(!emoj)
         emojedt&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmojedt(!emojedt)
         emojreply&&!document.querySelector(".emoji-mart").contains(e.target)&&setEmojReply(!emojreply)
         sort&&!document.querySelector(".sort").contains(e.target)&&setsort(!sort)
         unfollow&&!document.querySelector(".custom_mod").contains(e.target)&&setunfollow("")
        }}>
            <div className='col l8 s12 '>
     <div className="comment_sec">
         <div className="com_picture" >
           
           <img className="materialboxed" src={allevents.find(el=>el._id==match.params.event_id).image} width="100%" height="440px" alt=""/>
           <div className="date_com right">
                      <div className="day_com">{allevents.find(el=>el._id==match.params.event_id).start.split("T")[0].split("-")[2]}</div>
                      <div className="month_com">
                        {get_month(Number(allevents.find(el=>el._id==match.params.event_id).start.split('T')[0].split("-")[1]))}
                      </div>
                    </div>
           <span className="title"><b>{allevents.find(el=>el._id==match.params.event_id).title}</b></span>
           <div style={{display:"flex",alignItems:"center",marginTop:0,justifyContent:"space-between"}}>
             <p style={{ marginRigth: 7}}>{date_youtube(allevents.find(el=>el._id==match.params.event_id).created_at)}</p>
             
             <div style={{display:"flex",alignItems:"center"}}>
             <div style={{ display:auth.isAuthenticated &&auth.user.events.includes(allevents.find(el=>el._id==match.params.event_id)._id)&&allevents.find(el=>el._id==match.params.event_id).state=="Ended"?"flex":"none",alignItems:"center"}} className='rate' onClick={()=>{
            if(done)
             document.querySelector(".rating").style.display="initial"
               
               }} 
            //    onMouseOver={()=>
            // { 
            //   if(!done)
            //   document.querySelector(".fa-star").style.color="white"
            //    }}
               >
             <i className={star?"fas fa-star":"fas fa-star"} style={{fontSize:25}}></i>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><p>{rating? <span style={{fontSize:18}}><b>{rating}</b></span>   :'Rate'} </p><p> {rating?'You':'This'}</p></div> 
             </div>
             <div className="rating" onMouseLeave={()=>{
               if(!msg)
               {setRating(0);
                 setstar(false)
               document.querySelector(".fa-star").style.color="black"
               document.querySelector(".rating").style.display="none"}
               }}>
                 
             {msg?<p style={{color:"#2e8fa5",fontSize:16}}>Thanks for your vote...</p>:
             <StarRatingComponent 
          name="event_rating" 
          starCount={10}
          value={rating}
          onStarHover={(nextValue, prevValue, name)=>{
            onStarHover(nextValue, prevValue, name)
             setstar(true)
               document.querySelector(".fa-star").style.color="#2e8fa5"
          
          }}
          onStarClick={()=>{
            if(auth.isAuthenticated)
{dispatch(addrating(match.params.event_id,rating,auth.user._id))
setmsg(true)
setdone(false)
setTimeout(function(){
  document.querySelector(".rating").style.display="none"
},2900)
setTimeout(function(){setmsg(false)},3000)}
else
history.push("/login")
          }}
          emptyStarColor="gray"
          starColor="#2e8fa5"
        />}
             </div>
             <div style={{display:"flex",alignItems:"center",fontSize:15,position:"relative"}}>
     <i className="material-icons" style={{color:"rgb(255, 180, 0)",fontSize:35}}>star</i>
     <div style={{display:"flex",flexDirection:"column",}}>
     <p><span style={{fontWeight:"bold",fontSize:20}}>{calcul_rating(allevents.find(el=>el._id==match.params.event_id).rating)}</span>/10</p>
      <p> <span style={{fontWeight:"bold",fontSize:18}}>{nbr_comments(allevents.find(el=>el._id==match.params.event_id).rating.length)}</span><i className=" tiny material-icons" style={{fontSize:"19px", position:"absolute", top:"33px"}}>person</i></p>
       
    </div> 
    </div>
    </div>

    </div>
           </div> 
    <div>
    <ul className="collection org">
    <li className="collection-item avatar">
      <div style={{display:"flex",justifyContent:"space-between"}}>

      
        <div>
          <a href={`/organizer/${allevents.find(el=>el._id==match.params.event_id).id_organizer}`}>
          <img src={users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).avatar} alt="" className="circle" style={{width:43,height:43}}/>
          </a>
       <p><b>{users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).fname+" "+users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).lname}</b></p> 

      </div> 
      <button className='follow'  onClick={()=>{
        if(auth.isAuthenticated)
        {
          if (auth.user.follow&&auth.user.follow.includes(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id)){
       setunfollow(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer))
        }
       else
       {
       dispatch(addfollow(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id))
      //  console.log("hello");
       let title= "New Follow";
       let content= auth.user.fname +" "+ auth.user.lname + " is now following you";
       let notiftype="New_Follow";
       let compid=auth.user._id
       let state=[]
       state=[...state,{users:(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id),consulted:false}]
       dispatch(sendNotifications(auth.user._id,title,content,auth.user.role,notiftype,state,compid))
       }
      }
        else
        history.push("/login")
      }}
      style={{display:auth.isAuthenticated&&auth.user._id==users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id&&"none",position:"relative",cursor:"pointer",background:auth.user.follow&&auth.user.follow.includes(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id)&&"rgb(73, 82, 92)"}}
onMouseOver={()=>{setfollow(!follow)}}
onMouseLeave={()=>{setfollow(!follow)}}
   
     
     >
        {auth.user.follow&&auth.user.follow.includes(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id)?"UNFOLLOW":"FOLLOW"}
        </button>
      
      </div>
    {follow&&auth.user.follow&&!auth.user.follow.includes(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id)&&  <p style={{width:300,background:"white",position:"absolute",right: 17,
    top: 41,
    border: "1px solid black",
    borderRadius: 4,
    padding: 10,
    zIndex: 10,
outline: "none"}}>Follow {<b>{users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).fname+" "+users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer).lname+" "}</b>} 
       to recieve a notification when he add a new event.
      
      </p>}
      <p style={{overflowWrap:"anywhere"}}>{allevents.find(el=>el._id==match.params.event_id).description}</p>
  
    </li>
    
  </ul>
    </div>
{resiz&&<ul className="collapsible colapse">
    <li >
    <div className="collapsible-header" style={{fontWeight:600}}> Show events<i className="material-icons right chevron">expand_more </i></div>
    <div className="collapsible-body" >
      <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around"}}>
    {allevents.filter(el=>el._id!=match.params.event_id).slice(0).sort(function(a, b) {
  return new Date(a.start) - new Date(b.start);
}).reverse().filter(el=>el.state!="Invalid").slice(0,6+countevent*6).map((el,i)=>{
return(
<div key={i} style={{position:"relative"}}>
<img  src={el.image} width="250px" height="250px" alt="event image" style={{cursor:"pointer"}} onClick={()=>{
  history.push(`/events/${el._id}`)
  setCountevent(0)
  document.querySelector(".rating").style.display="none"
}}/>
 <div className="date_com right">
 <div className="day_com">{el.start.split("T")[0].split("-")[2]}</div>
 <div className="month_com">
   {get_month(Number(el.start.split("T")[0].split("-")[1]))}
 </div>
</div>
</div>

)


      })}</div>
       {((countevent+1)*6)<allevents.filter(el=>el._id!=match.params.event_id).filter(el=>el.state!="Invalid").length&&
      //  <div style={{display:"flex",cursor:"pointer",color: "rgb(46, 143, 165)",fontWeight: 550}} onClick={()=>{
      //         setCountevent(countevent+1)
              
      //         }}>
      //     <i
      //             className="material-icons"
      //           >
      //            expand_more
      //           </i>
      //       <p  >Show more events</p>
      //     </div>
          
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
          setCountevent(countevent+1)
     }}>SHOW MORE EVENTS</div>
          }
          
          </div>
    </li>
    </ul>


}

<div style={{position:"relative"}}>
    <p className="comment" >
      {comments.comments&& nbr_comments(comments.comments.filter(elm=>elm.event==match.params.event_id).length)+" "}
    comment{comments.comments&&comments.comments.filter(elm=>elm.event==match.params.event_id).length==0?"":"s"}
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
    {auth.isAuthenticated&&<form className="input_add" >
        <div style={{position:"relative",display:"flex"}}>
          <img src={auth.user.avatar} alt="profil" className="circle" style={{marginTop:5}} width="45px" height="45px"/>
        <div style={{width:"100%",marginTop:6,marginLeft:5}}>
          <textarea value={comnt} 
         onChange={(e)=>setComnt(e.target.value)}
          onKeyDown={(e)=> { if (e.key === "Enter") onsubmit(e)}}
                  className="materialize-textarea"
                   style={{paddingRight:"30px"}}
                   placeholder="Add a public comment"
                   > 
                   </textarea> 
        <i className="far fa-smile"  style={{position:"absolute",bottom:12,right:10,cursor:"pointer"}} onClick={()=>setEmoj(!emoj)}></i>
         {emoj&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-368px",right:5,zIndex:9999999999}} id="emoj_cont">
            
            <Picker
         set='apple'
        color="#2e8fa5"
          onSelect={onEmojiClick} 
         
          i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }}
          
          emojiSize={30}
          showSkinTones={false}
          showPreview={false}
          perLine={8}
          // style={{zIndex:2000}}
   
          />
      </div>}
      </div>
      </div>
            {/* {add&&<div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
              <button onClick={()=>{setAdd(false);setComnt("")}}>Cancel</button>
              <button type="submit" disabled={!comnt}>Add public comment</button>
            </div>} */}
             
         
          </form>}
          {comments.comments&&comments.comments.filter(elm=>elm.event==match.params.event_id).slice(0).sort(function(a, b) {
  return sorttype.type=="relevent"? (a.likes - b.likes):(a.created_at - b.created_at);
}).reverse().slice(0,10+count*10).map(el=>{
return(

<ul className="collection" key={el._id} style={{overflow:"initial"}}>
    <li className="collection-item avatar">
      <div style={{display:"flex",justifyContent:"space-between"}}>
       <div>
          <img src={users.find(e=>e._id==el.postedBy).avatar} alt="" className="circle"/>
       <div style={{display:"flex"}}>
       <p><b><a href={'/'+users.find(e=>e._id==el.postedBy).role+'/'+users.find(e=>e._id==el.postedBy)._id}>{(users.find(e=>e._id==el.postedBy).fname+" "+users.find(e=>e._id==el.postedBy).lname)}</a></b></p> 
<p style={{marginLeft:10}}>{historyevent(el.created_at)}</p>
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
     </div>}{(users.find(e=>e._id==el.postedBy).role!="moderator" && users.find(e=>e._id==el.postedBy).role!="administrator" && el.postedBy!=auth.user._id && auth.user.role!="administrator" && auth.user.role!="moderator" && auth.isAuthenticated &&!auth.user.reports.includes(el._id)) && <span id="editdelete"><i onClick={()=>setactvreport(el._id)} className='modal-trigger material-icons' data-target='modalreportcom' title="report">report</i></span>}</span>
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
         <div style={{marginTop:5,display:"flex",alignItems:"center"}} id="editdelete">
         <i className="far fa-thumbs-up" title="like" style={{cursor:"pointer",color:auth.isAuthenticated&&auth.user.likes.includes(el._id)&&"#2e8fa5"}} onClick={()=>
          {if(actvlike)
            {if(auth.isAuthenticated&&!auth.user.likes.includes(el._id))
              
          {setactvlike(false)
            dispatch(likecomment(el._id,Number(el.likes)+1,auth.user._id))
            let title= "Like";
            let content= auth.user.fname +" "+ auth.user.lname + " like your comment";
            let notiftype="New_Like";
            let compid=match.params.event_id
            let state=[]
            state=[...state,{users:(el.postedBy),consulted:false}]
            state[0].users!=auth.user._id &&
            dispatch(sendNotifications(auth.user._id,title,content,auth.user.role,notiftype,state,compid))
    
            auth.user.dislikes.includes(el._id)&& dispatch(removedislikecomment(el._id,Number(el.dislikes)-1,auth.user._id))}
            else
            {setactvlike(false)
            dispatch(removelikecomment(el._id,Number(el.likes)-1,auth.user._id))
            let title= "Dislike";
            let content= auth.user.fname +" "+ auth.user.lname + " dislike your comment";
            let notiftype="New_Dislike";
            let compid=match.params.event_id
            let state=[]
            state=[...state,{users:(el.postedBy),consulted:false}]
            state[0].users!=auth.user._id &&
            dispatch(sendNotifications(auth.user._id,title,content,auth.user.role,notiftype,state,compid))
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
           {(el.postedBy!=auth.user._id)&&auth.isAuthenticated&&<i title="reply" className="material-icons" onClick={()=>{ if(!replycount) setReplayCount(!replycount); setReply(""); setReplyId(el._id)}}>reply</i>}
            
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
      <div style={{display:"flex",justifyContent:"space-between"}}>
       <div>
          <img src={users.find(e=>e._id==el.postedBy).avatar} alt="" className="circle"/>
       <div style={{display:"flex"}}>
       <p><b><a href={'/'+users.find(e=>e._id==el.postedBy).role+'/'+users.find(e=>e._id==el.postedBy)._id}>{(users.find(e=>e._id==el.postedBy).fname+" "+users.find(e=>e._id==el.postedBy).lname)}</a></b></p> 
<p style={{marginLeft:10}}>{historyevent(el.created_at)}</p>
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
</div>}
{(users.find(e=>e._id==el.postedBy).role!="moderator" && users.find(e=>e._id==el.postedBy).role!="administrator" && el.postedBy!=auth.user._id && auth.user.role!="administrator" && auth.user.role!="moderator" && auth.isAuthenticated &&!auth.user.reports.includes(el.id)) && <span id="editdelete">
<i onClick={()=>setactvreport(el.id)} className='modal-trigger material-icons' data-target='modalreportreply' title="report">report</i></span>}</span>
      </div>
     
      {el.id!=edit?<p style={{overflowWrap: "break-word"}}>{el.content}</p>:
       
       
       <form>
      
         
       <div style={{width:"100%",position:"relative"}}>
       
         <textarea value={textedit} 
        onChange={(e)=>setTextedit(e.target.value)}
         onKeyDown={(e)=> { if (e.key === "Enter") oneditreply(e)}}
                 className="materialize-textarea"
                  style={{paddingRight:"30px"}}
                  id="textarea_edit"
                  autoFocus
                  > 
                  </textarea> 
                  
       <i className="far fa-smile"  style={{position:"absolute",bottom:20,right:5,cursor:"pointer"}} onClick={()=>setEmojedt(!emojedt)}></i>
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
         <div style={{marginTop:5,display:"flex",alignItems:"center"}} id="editdelete">
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
           {(el.postedBy!=auth.user._id)&&auth.isAuthenticated&&<i title="reply" className="material-icons" onClick={()=>{ 
             setReply("@"+users.find(e=>e._id==el.postedBy).fname+"-"+users.find(e=>e._id==el.postedBy).lname+" ")
             document.getElementById('replyinp').focus()
             }}>reply</i>}
            
            </div>
   </li>
  </ul>
    )
  })}
 { auth.isAuthenticated&&<form className="input_add" style={{marginLeft:20}}>
  <div style={{position:"relative",display:"flex"}}>
    {auth.isAuthenticated&&<img src={auth.user.avatar} alt="profil" className="circle" width="45px" height="45px"/>}
  <div style={{width:"100%",marginLeft:55}}>
    <textarea value={reply} 
   onChange={(e)=>setReply(e.target.value)}
    onKeyDown={(e)=> { if (e.key === "Enter") reply&&onreply(e)}}
            className="materialize-textarea inpReply"
             style={{paddingRight:"30px"}}
             autoFocus
             placeholder="Add a public comment"
             id="replyinp"
             > 
             
             </textarea> 
  <i className="far fa-smile"  style={{position:"absolute",bottom:12,right:10,cursor:"pointer"}} onClick={()=>setEmojReply(!emojreply)}></i>
   {emojreply&&<div style={{width:"fit-content",height:"fit-content",position:"absolute", bottom:"-368px",right:5,zIndex:9999999999}} id="emoj_cont">
      
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
          {((count+1)*10)<comments.comments.filter(elm=>elm.event==match.params.event_id).length&&
          
          // <div style={{display:"flex",cursor:"pointer",color: "rgb(46, 143, 165)",fontWeight: 550}} onClick={()=>{
          //     setCount(count+1)
              
          //     }}>
          // <i
          //         className="material-icons"
          //       >
          //        expand_more
          //       </i>
          //   <p  >Show more comments</p>
          // </div>
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
   {!resiz&& <div className="col l4  scroll_event">

      {allevents.filter(el=>el._id!=match.params.event_id).slice(0).sort(function(a, b) {
  return new Date(a.start) - new Date(b.start);
}).reverse().filter(el=>el.state!="Invalid").slice(0,10+countevent*10).map((el,i)=>{
return(
<div key={i} style={{position:"relative"}}>
<img  src={el.image} width="100%" height="220px" alt="event image" style={{cursor:"pointer"}} onClick={()=>{
  history.push(`/events/${el._id}`)
  setCountevent(0)
  document.querySelector(".rating").style.display="none"
}}/>
 <div className="date_com right">
 <div className="day_com">{el.start.split("T")[0].split("-")[2]}</div>
 <div className="month_com">
   {get_month(Number(el.start.split("T")[0].split("-")[1]))}
 </div>
</div>
</div>

)


      })}
       {((countevent+1)*10)<allevents.filter(el=>el._id!=match.params.event_id).filter(el=>el.state!="Invalid").length&&
       
      //  <div style={{display:"flex",cursor:"pointer",color: "rgb(46, 143, 165)",fontWeight: 550}} onClick={()=>{
      //         setCountevent(countevent+1)
              
      //         }}>
      //     <i
      //             className="material-icons"
      //           >
      //            expand_more
      //           </i>
      //       <p  >Show more events</p>
      //     </div>
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
            setCountevent(countevent + 1);
         }}>SHOW MORE EVENTS</div>
          
          
          
          }
    </div>
    
    
    
    }
   
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
              onClick={()=>dispatch(deleteReply(replyid,deletereplyid))}
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


  
           
        <div id="modalreportcom" className="modal">
          <div className="modal-content">
            <h4>Report Comment</h4>
            <p>Are you sure you want to report the comment?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close  btn-flat"
              onClick={()=>{
                let title="New Report";
                let content= "A new comment was reported";
                let notiftype="New_Report";
                let compid=match.params.event_id;
                var state=[]
                    users.filter(el=>el.role=="administrator"||el.role=="moderator").map(el=>{
                    state=[...state,{users:el._id,consulted:false}]})
               dispatch(reportComment(actvreport,Number(comments.comments.find(el=>el._id==actvreport).reports)+1,auth.user._id))
               dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))

}
                 }
                  // }}
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
    
    
        <div id="modalreportreply" className="modal">
          <div className="modal-content">
            <h4>Report reply</h4>
            <p>Are you sure you want to report the reply?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close btn-flat"
              onClick={()=>{
                let title="New Report";
                let content= "A new reply was reported";
                let notiftype="New_Report";
                let compid=match.params.event_id;
                var state=[]
                    users.filter(el=>el.role=="administrator"||el.role=="moderator").map(el=>{
                    state=[...state,{users:el._id,consulted:false}]})
               dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
               dispatch(reportReply(actvreport,Number(comments.comments.find(el=>el._id==replyid).reply.find(el=>el.id==actvreport).reports)+1,auth.user._id,replyid))
               } }
                  
            >
              Agree
            </a>
            <a
              href="#!"
              className="modal-close btn-flat"
            >
              Cancel
            </a>
          </div>
        </div> 
   


        
        <div  className="custom_mod" style={{display:unfollow?"initial":"none",padding:"10px",background:"white",zIndex:10,border:"2px solid #2e8fa5",width:"70%"}}>
          <div className="modal-content">
            {/* <h4>Account Update</h4>
            <p>Are you sure you want to update your profile?</p> */}
            <h5>Unfollow {unfollow.fname+" "+unfollow.lname} ?</h5>
           
              <div className="divider">
              </div>
              
          </div>
          <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:10}}>
            <a
              href="#!"
              className=" btn #2e8fa5-text"
              onClick={()=>{
                dispatch(removefollow(unfollow._id))
                setunfollow("")
                // console.log("hello")
                let title= "Following removed";
                let content= auth.user.fname +" "+ auth.user.lname + " is no longer following you";
                let notiftype="Remove_Follow";
                let compid=auth.user._id
                let state=[]
                state=[...state,{users:(users.find(el=>el._id==allevents.find(el=>el._id==match.params.event_id).id_organizer)._id),consulted:false}]
                dispatch(sendNotifications(auth.user._id,title,content,auth.user.role,notiftype,state,compid))
              }
            }
            >
              UNFOLLOW
            </a>
            <a
              href="#!"
              className="  btn"
              onClick={()=>{
                setunfollow("")
             
              }}
            >
              Cancel
            </a>
          </div>
        </div>
   </>
    )
}

export default Comments
