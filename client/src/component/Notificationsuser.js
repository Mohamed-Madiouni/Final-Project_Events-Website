import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GET_ERRORS } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import historyuser from "../outils/history";
import notif, { filter_notif, sort_notif_bydate } from "../outils/notif_length";
import { getUsers } from "../actions/adminaction";
import "../notifications.css";
function Notificationsuser() {
  const dispatch = useDispatch();
  const [countnotif, setCountnotif] = useState(0);
  const allnotif = useSelector((state) => state.notification.notifications);
  let auth = useSelector((state) => state.auth);
  var notifsize=notif(allnotif,auth.user._id);
  const history = useHistory()
  const users=useSelector(state=>state.admin.users)
  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }, []);

  useEffect(() => {
    dispatch(getUsers())
  }, []);

  return (
       <>
      {users.length!=0&&<div id="modalnotifuser" style={{ padding: 0, margin:0 }}>
           <div >
              <h4 className="center" style={{ marginTop: "20px" }}>Notifications Center</h4>
            </div>
            <div className="notification-page__content" style={{ marginBottom: "0px" }}>
              <div className="notification-page__content__title">
                <span>Notifications</span>
                </div>
                <div className="notification-page__content__container">
                  <div className="notification-container">
                  {
                  sort_notif_bydate((filter_notif(allnotif,auth.user._id)))
                      .slice(0)
                      .slice(0, 10 + countnotif * 10)
                      .map((el) => {
                        return (

                      <div key={el[0]._id} >
                     <div className="notification-per-period">
                      <div className="notification-per-period__title">
                        <div className="x-flex-column-h-center-v-any ">
                         <span> 
                          <div className="notification-per-period__period-card__date">{(el[0].created_at.toString().slice(0,10))}</div>
                         </span>
                         </div>
                       </div>
                            
                        {
                            el.map((el,i)=>
                            <div key={i} style={{cursor:"pointer"}} className="notification-per-period__period-card" onClick={() => {
                              if (el.notiftype=="Event_Validation") { history.push("/events/"+el.compid)}
                              else if (el.notiftype=="New_Event") { history.push("/events")}
                              else if (el.notiftype=="Event_Edition") {history.push("/events/"+el.compid)}
                              else if (el.notiftype=="Comment_Reply_organizer") { history.push("/events/"+el.compid)}
                              else if (el.notiftype=="Comment_Reply_User") { history.push("/events/"+el.compid)}
                              else if (el.notiftype=="New_Follow") { history.push(`/${el.role}/${el.userId}`)}
                              else if (el.notiftype=="New_Like") { history.push("/events/"+el.compid)}
                              else if (el.notiftype=="New_Dislike") { history.push("/events/"+el.compid)}
                              else if (el.notiftype=="Remove_Follow") { history.push(`/${el.role}/${el.userId}`)}
                              else if (el.notiftype=="Event_Deleted") { history.push("/events")}
                              else if (el.notiftype=="Event_Invalidation") { history.push("/dashboard")}
                              else if (el.notiftype=="New_Participation") { history.push(`/${el.role}/${el.userId}`)}
                              else if (el.notiftype=="Cancel_Participation") { history.push(`/${el.role}/${el.userId}`)}
                              else if (el.notiftype=="Event_Closed") { history.push("/events")}
                              else if (el.notiftype=="Event_Opened") { history.push("/events/"+el.compid)}
                              else if (el.notiftype=="Account_Banned") {history.push("/dashboard")}
                              else if (el.notiftype=="Account_Unbanned") { history.push("/dashboard")}
                              else if (el.notiftype=="Account_Alerted") { history.push("/dashboard")}
                              else if (el.notiftype=="Alert_Removed") { history.push("/dashboard")}
                              else if (el.notiftype=="New_Comment") { history.push("/events/"+el.compid)}
                              else if (el.notiftype=="Comment_Edition") { history.push("/events/"+el.compid)}
                              else {  history.push("/")}
                              }}>
                          <div className="x-flex-column-h-center-v-any" style={{minWidth: "90px"}}>

                        <img src={users.find(e=>e._id==el.userId).avatar} alt="" className="circle"  style={{ marginRight: "8px",width:"40px" ,height:"40px"}}/>

                              </div>
                              <div>

                                <div className="notification-per-period__period-card__type" style={{display:"flex", alignContent: "center"}}>
                                {(el.notiftype=="Event_Validation")&&
                                 <img src="/Event_Validation.png" alt="Event_Validation"  width="20px" height="20px"/>}
                                {(el.notiftype=="New_Event")&&
                                 <img src="/New_Event.png" alt="New_Event"  width="20px" height="20px"/>}
                                {(el.notiftype=="Event_Edition")&&
                                 <img src="/Event_Edition.png" alt="Event_Edition"  width="37px" height="37px"/>}
                                {(el.notiftype=="Comment_Reply_organizer")&&
                                 <img src="/Comment_Reply_organizer.png" alt="Comment_Reply_organizer"  width="37px" height="37px"/>}
                                {(el.notiftype=="Comment_Reply_User")&&
                                 <img src="/Comment_Reply_User.png" alt="Comment_Reply_User"  width="37px" height="37px"/>}
                                {(el.notiftype=="New_Follow")&&
                                 <img src="/New_Follow.png" alt="New_Follow"  width="37px" height="37px"/>}
                                {(el.notiftype=="New_Like")&&
                                 <img src="/New_Like.png" alt="New_Like"  width="37px" height="37px"/>}
                                {(el.notiftype=="New_Dislike")&&
                                 <img src="/New_Dislike.png" alt="New_Dislike"  width="37px" height="37px"/>}
                                {(el.notiftype=="Remove_Follow")&&
                                 <img src="/Remove_Follow.png" alt="Remove_Follow"  width="37px" height="37px"/>}
                                {(el.notiftype=="Event_Deleted")&&
                                 <img src="/Event_Deleted.png" alt="Event_Deleted"  width="37px" height="37px"/>}
                                {(el.notiftype=="Event_Invalidation")&&
                                 <img src="/Event_Invalidation.png" alt="Event_Invalidation"  width="37px" height="37px"/>}
                                {(el.notiftype=="New_Participation")&&
                                 <img src="/New_Participation.png" alt="New_Participation"  width="37px" height="37px"/>}
                                {(el.notiftype=="Cancel_Participation")&&
                                 <img src="/Cancel_Participation.png" alt="Cancel_Participation"  width="37px" height="37px"/>}
                                {(el.notiftype=="Event_Closed")&&
                                 <img src="/Event_Closed.png" alt="Event_Closed"  width="37px" height="37px"/>}
                                {(el.notiftype=="Event_Opened")&&
                                 <img src="/Event_Opened.png" alt="Event_Opened"  width="37px" height="37px"/>}
                                {(el.notiftype=="Account_Banned")&&
                                 <img src="/Account_Banned.png" alt="Account_Banned"  width="37px" height="37px"/>}
                                {(el.notiftype=="Account_Unbanned")&&
                                 <img src="/Account_Unbanned.png" alt="Account_Unbanned"  width="37px" height="37px"/>}
                                {(el.notiftype=="Account_Alerted")&&
                                 <img src="/Account_Alerted.png" alt="Account_Alerted"  width="37px" height="37px"/>}
                                {(el.notiftype=="Alert_Removed")&&
                                 <img src="/Alert_Removed.png" alt="Alert_Removed"  width="37px" height="37px"/>}
                                {(el.notiftype=="New_Comment")&&
                                 <img src="/New_Comment.png" alt="New_Comment"  width="37px" height="37px"/>}
                                {(el.notiftype=="Comment_Edition")&&
                                 <img src="/Comment_Edition.png" alt="Comment_Edition"  width="37px" height="37px"/>}  
                                  <span style={{height: "min-content",
                                 transform: "translateY(2px)"}}>{el.title}</span>
                                  </div>
                                  <div className="notification-per-period__period-card__content">
                                    {el.content}</div>
                                  
                                  <div className="notification-per-period__period-card__date">
                                    
                                    
                                    
                                    
                                    
                                    
                                    {el.created_at.toString().replace('Z', '').replace('T', ' ').replace(/\.\d+/, "")}</div>
                                  </div></div>)}
                                  </div></div>
                    )})
                    }
                                  </div>
                                  <p/>
            {(countnotif + 1) * 10 < sort_notif_bydate((filter_notif(allnotif,auth.user._id))).length && (
              <div
                style={{
                  position: "abosolute",
                  background: "cadetblue",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black"
                }}
                id="loadMore"
                className="thb-gp-load-more"
                data-thb-gp-lm-type="event"
                data-org-text="MORE"
                onClick={() => {
                  setCountnotif(countnotif + 1);
                }}
              >
                SHOW MORE
              </div>
            )}
         
         
         </div>
         </div>
    </div>} 

        </>

 
    
  );
}

export default Notificationsuser;
