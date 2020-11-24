import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GET_ERRORS } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import historyuser from "../outils/history";
import { getUsers } from "../actions/adminaction";
import "../notifications.css";
import { sort_notif_bydate } from "../outils/notif_length";
import { getCurrentUser, getSanctions} from "../actions/authaction";
import M from "materialize-css";

function Sanctions() {
  const dispatch = useDispatch();
  const [countsanctions, setCountsanctions] = useState(0);
  const allsanctions = useSelector((state) => state.auth.sanctions);
  let auth = useSelector((state) => state.auth);
  let allusers = useSelector((state) => state.admin.users);
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
    M.Modal.init(document.querySelectorAll(".modal"))
  }, []);
 

  return (
      <> 
      {allsanctions.length!=0?<div id="modalnotifall" style={{ padding: 0, margin:0 }}>
             <div >
              <h4 className="center" style={{ marginTop: "20px" }}>Sanctions Center</h4>
            </div>
            <div className="notification-page__content" style={{ marginBottom: "0px" }}>
              <div className="notification-page__content__title">
                </div>
                <div className="notification-page__content__container">
                  <div className="notification-container">

                          {allsanctions 
                           && sort_notif_bydate(allsanctions)
                          .slice(0)
                      .slice(0, 10 + countsanctions * 10)
                      .map((el) => {
                        return (
                      <div key={el[0]._id}>
                          <div className="notification-per-period">
                          <div className="notification-per-period__title">
                            <div className="x-flex-column-h-center-v-any ">
                            <span> 
                          <div className="notification-per-period__period-card__date">{(el[0].created_at.toString().slice(0,10))}</div>
                         </span>
                         </div>
                       </div>
                       {  el.map((el,i)=>
                       <div key={i} style={{cursor:"pointer"}}className="notification-per-period__period-card modal-close" onClick={() => {
                        if((users.find(e=>e.email==el.email).role)=="partcipant") {history.push("participant/"+users.find(e=>e.email==el.email)._id)}
                        else  {history.push("organizer/"+users.find(e=>e.email==el.email)._id)} 
                       }}>
                            <div className="x-flex-column-h-center-v-any" style={{minWidth: "90px"}}>
                            <img src={users.find(e=>e.email==el.email).avatar} alt="" className="circle"  style={{ marginRight: "8px",width:"40px" ,height:"40px"}}/>
                         </div>
                         <div>
                         <div className="notification-per-period__period-card__type" style={{display:"flex", alignContent: "center"}}>
                                {(el.type==="ban")&&
                                 <img src="/Account_Banned.png" alt="Account_Banned" />}
                                {(el.type=="alert")&&
                                 <img src="/Account_Alerted.png" alt="Account_Alerted" />}
                                  <span style={{height: "min-content", transform: "translateY(2px)"}}>{el.type}</span>
                                      </div>
                                      <div className="notification-per-period__period-card__date">
                                      Duration:  {el.duration==-1 ? "Permanent" : el.duration + " Days"}
                                      </div> 
                                      <div className="notification-per-period__period-card__date">
                                      Done By the Moderator:  {el.author}
                                      </div>
                                      <div className="notification-per-period__period-card__date">
                                      Canceled: {el.canceled ? "Yes" : "No" }
                                      </div>
                                      <div className="notification-per-period__period-card__date">
                                      {el.cancelauthor && "Canceled by: " + el.cancelauthor}
                                      </div>
                                      <div className="notification-per-period__period-card__date">
                                      {el.cancelreason && "Cancel reason: " + el.cancelreason}
                                      </div>
                                      <div className="notification-per-period__period-card__content">
                                        Reason: {el.reason}</div>                                
                                     { allusers.find((elm) => elm.email == el.email)&&<div className="notification-per-period__period-card__date">
                                        User:{" " +(allusers.find((elm) => elm.email == el.email)).fname+" "+(allusers.find((elm) => elm.email == el.email)).lname}
                                        </div>}
                                      <div className="notification-per-period__period-card__date">
                                        {el.created_at.toString().replace('Z', '').replace('T', ' ').replace(/\.\d+/, "")}</div>
                                      </div>
                                      </div>)}
                                      </div></div>
                        )})}
                                      </div>
                                      <p/>
                {(countsanctions + 1) * 10 < sort_notif_bydate(allsanctions).length && (
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
                      setCountsanctions(countsanctions + 1);
                    }}
                  >
                    SHOW MORE
                  </div>
                )}
             </div>
             </div>
             </div>:
                  <div id="modalnotifall" style={{ padding: 0, margin:0 }}>
                  <div >
                   <h4 className="center" style={{ marginTop: "20px" }}>Sanctions Center</h4>
                 </div>
                 <div className="notification-page__content" style={{ marginBottom: "0px" }}>
                       <div className="notification-container">
                            <div className="notification-per-period__period-card" style={{display: "flex", justifyContent:"center", padding: "19px 19px", color:"gray"}}>
                              There's no sanctions yet   
                              <div>
                              </div>
                              </div>
                            </div> </div></div>     

             }
</>
  );
}

export default Sanctions;
