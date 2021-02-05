import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  getUsers,
  banUser,
  unbanUser,
  alertUser,
  unalertUser,
} from "../actions/adminaction";
import { getCurrentUser, getSanctions} from "../actions/authaction";
import { useHistory,Link } from "react-router-dom";
import historyuser from "../outils/history";
import "../events.css";
import M from "materialize-css";
import "../userlist.css";
import UserList from "./UserList";
import {sendNotifications} from "../actions/notificationaction";
import eventClosing from "../outils/eventClosing";
import { GET_ERRORS } from "../actions/types";
import Sanctions from "./User_Sanctions";
const UserListcard = ({ users }) => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.admin.users);
  let auth = useSelector((state) => state.auth);
  const history = useHistory();
  let errors=useSelector(state=>state.errors)
  const [deleteid, setDeleteid] = useState("");
  const [banid, setBanid] = useState("");
  const [email, setEmail] = useState("");
  const [alertid, setAlertid] = useState("");
  const [modal, setModal] = useState(false);
  const [countuser, setCountuser] = useState(0);
  const sanctions = useSelector((state) => state.auth.sanctions);
  const toggle = () => {
    setModal(!modal);
  };
  const [quickSearch, setQuickSearch] = useState({
    fname: "",
    lname: "",
    role: "",
    email: "",
    address: "",
    tel: "",
  });

  const [sanctionData, setSanctionData] = useState({
    duration: "7",
    reason: "",
  });

useEffect(()=>{
  if(errors.alerted)
  {
    setSanctionData({duration:"7",reason:""})
  dispatch({
    type:GET_ERRORS,
    payload:{}
  })
  
  }
})

  useEffect(() => {
    dispatch(getUsers());
    localStorage.token && dispatch(getCurrentUser());
    localStorage.token && dispatch(getSanctions());
    M.Modal.init(document.querySelectorAll(".modal"));
  }, []);
  useEffect(() => {
    M.Slider.init(document.querySelectorAll(".slider"), {
      height: 40,
      indicators: false,
    });
    M.updateTextFields();
    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
  });



  // let users = allusers.filter((el) => {
  //   return (
  //     el.fname.toLowerCase().includes(quickSearch.fname.toLowerCase()) &&
  //     el.role.toLowerCase().includes(quickSearch.role.toLowerCase()) &&
  //     el.lname.toLowerCase().includes(quickSearch.lname.toLowerCase()) &&
  //     el.email.toLowerCase().includes(quickSearch.email.toLowerCase()) &&
  //     el.address.toLowerCase().includes(quickSearch.address.toLowerCase()) &&
  //     el.tel.toLowerCase().includes(quickSearch.tel.toLowerCase())
  //   );
  // });

  const onChange = (e) => {
    setQuickSearch({ ...quickSearch, [e.target.id]: e.target.value });
    setSanctionData({ ...sanctionData, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <div className="row">
        {users &&
          users
            .slice(0)
            .reverse()
            .slice(0, 12 + countuser * 12)
            .map((el) => {
              return (
                <div
                  className="col s12 m6 l4 xl3"
                  key={el._id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                  }}
                >
                  <div
                    className="card small sticky-action"
                    style={{
                      overflow: "hidden",
                      width: 330,
                      height: 440,
                      filter:
                      (sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                      ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))) == false
                          ? "initial"
                          : (sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                          ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))) == true && "grayscale(150%)",
                    }}
                  >
                               
                    <div
                      style={{
                        height: "55%",
                        width: "100%",
                        display:"flex",
                        justifyContent:"center",
                        overflow: "hidden"
                      }}
                    >{el.online&&<div style={{
                              position:"relative",
                              background:"green",
                              right:-215,
                              bottom:-212,
                              borderRadius:"50%",
                              width:10,
                              height:10
                            }}><span style={{ position:"relative",right:-11,
                            bottom:5, color:"green", fontSize:11}}>Online</span></div>
                            }
                      <Link to={`/${el.role}/${el._id}`}><img
                        className="circle"
                        src={el.avatar}
                        height="100%"
                        width="250px"
                        objectfit= "cover"
                        overflow= "hidden"
                        alt=""
                      /> </Link>
                      {
                         sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop()?(!((sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop()).canceled)
                        &&(new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop().created_at,sanctions.filter(elm => elm.email==el.email
                        &&elm.type=="alert").pop().duration))>new Date()))
                        &&                      
                      (<i
                            className="fas fa-exclamation-circle btn-flat modal-trigger"
                            style={{
                              color: "red",
                              position: "absolute",
                              right: "1%",
                              top: "5%",
                              fontSize: 30,
                              visibility: (sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                              ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))) && "hidden"
                            }}
                            type="button"
                            data-target="modal5"
                            onClick={() => {
                              setEmail(el.email)
                              setAlertid(el._id)}}
                              disabled={(el.role == "administrator" || el.role == "moderator")}
                          ></i>)  :
                      (
                      sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop())&&(!((sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)
                      &&((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email
                      &&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))
                      &&
                       (<i
                            className="fas fa-exclamation-circle btn-flat modal-trigger"
                            style={{
                              color: "red",
                              position: "absolute",
                              right: "1%",
                              top: "5%",
                              fontSize: 30,
                              visibility: (sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                              ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))) && "hidden"
                            }}
                            type="button"
                            data-target="modal5"
                            onClick={() => {
                              setEmail(el.email)
                              setAlertid(el._id)}}
                              disabled={(el.role == "administrator" || el.role == "moderator")}
                          ></i> )
                       }
                        {sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop()?(((sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop()).canceled)||
                       (new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&
                        elm.type=="alert").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop().duration))<new Date()))&&
           
                     (<i
                      className="fas fa-exclamation-circle btn-flat modal-trigger"
                      style={{ // ban cancelled
                        color: sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&
                        ((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                        ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&
                          elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))?"white":"gray",
                        position: "absolute",
                        right: "1%",
                        top: "5%",
                        fontSize: 30,
                        visibility: (sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                              ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))) && "hidden"
                      }}
                      type="button"
                      data-target="modal4"
                      onClick={() => {
                        setEmail(el.email)
                        setAlertid(el._id)
                        }}
                        disabled={(el.role == "administrator" || el.role == "moderator")}
                    ></i>)                   
                     :
                     sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()? //there's a ban
                      (((sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)|| // if the ban is cancelled or expired
                      ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&& elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))&& 

                       (<i
                        className="fas fa-exclamation-circle btn-flat modal-trigger"
                        style={{
                          color: sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&
                          ((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                          ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&
                          elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))?"white":"gray",
                          position: "absolute",
                          right: "1%",
                          top: "5%",
                          fontSize: 30,
                          visibility: (sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                              ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))) && "hidden"
                        }}
                        type="button"
                        data-target="modal4"
                        onClick={() => {
                          setEmail(el.email)
                          setAlertid(el._id)
                          }}
                          disabled={(el.role == "administrator" || el.role == "moderator")}
                      ></i>) 
                       :(<i
                          className="fas fa-exclamation-circle btn-flat modal-trigger"
                          style={{
                            color: (sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&
                            ((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                            ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1))))?"white":"gray",
                            position: "absolute",
                            right: "1%",
                            top: "5%",
                            fontSize: 30,
                            visibility: (sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                              ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1)))) && "hidden"
                          }}
                          type="button"
                          data-target="modal4"
                          onClick={() => {
                            setEmail(el.email)
                            setAlertid(el._id)
                            }}
                            disabled={(el.role == "administrator" || el.role == "moderator")}
                        ></i>)
                      }
                    </div>
                    <div style={{marginBottom:"5px"}}>
                      <span className="black-text">
                        <b>
                          {el.fname + " "}
                          {el.lname}
                        </b>
                      </span>
                    </div>
                    <p className="black-text" style={{marginBottom:"8px"}}>{el.email}</p>
                    <span className="black-text">
                      {el.role}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 13,
                        width: "100%",
                        justifyContent: "space-around",
                      }}
                    >
                      <span
                        style={{
                          margin: 10,
                          marginLeft: 0,
                          marginRight: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className=" tiny material-icons"
                          style={{ margin: 5 }}
                        >
                          history
                        </i>

                        {historyuser(el.created_at)}
                      </span>
                    </div>
                    <button
                      style={{
                        width: "125px",
                        height: "40px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        margin: "1rem",
                      }}
                      type="button"
                      className="btn btn-medium modal-trigger"
                      //data-target="modal1"
                      // onClick={() => setDeleteid(el._id)}
                      onClick={() =>{setEmail(el.email)}}
                      data-target="modalsanction"
                      disabled={(el.role == "administrator" || el.role == "moderator")}
                    >
                      Sanctions
                    </button>

                    {!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()&&((!(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop()).canceled)||
                    ((new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration))<new Date())&&(sanctions.filter(elm => elm.email==el.email&&elm.type=="ban").pop().duration!=-1))))?(
                      <button
                        style={{
                          width: "100px",
                          height: "40px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          margin: "1rem",
                        }}
                        type="button"
                        className="btn btn-medium modal-trigger"
                        data-target="modal2"
                        onClick={() =>{
                          setEmail(el.email)
                          setBanid(el._id)}} 
                        disabled={el.role == "administrator" ||!(sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop())||
                        ((sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop().canceled)||
                        (new Date(eventClosing(sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop().created_at,sanctions.filter(elm => elm.email==el.email&&elm.type=="alert").pop().duration))<new Date()))}
                      >
                        Ban
                      </button>
                    ) : (
                      <button
                        style={{
                          width: "100px",
                          height: "40px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          margin: "1rem",
                          backgroundColor: "gray",
                          color: "white",
                        }}
                        type="button"
                        className="btn btn-medium modal-trigger"
                        data-target="modal3"
                        onClick={() => {
                          setEmail(el.email)
                          setBanid(el._id)}}
                        disabled={el.role == "administrator" && true}
                      >
                        Unban
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
      <p/>
          {(countuser + 1) * 10 < users.length && (
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
           setCountuser(countuser + 1);
           }}>SHOW MORE</div>)}
      
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>User delete</h4>
          <p/>Are you sure you want to delete this User?
        </div>
        <div className="modal-footer" style={{alignItems:"center", display: "flex", justifyContent: "center"}}>
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() => dispatch(deleteUser(deleteid))}
          >
            Agree
          </a>
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
        </div>
      </div>


<div id="modal2" className="modal">
        <div className="modal-content">
          <h4>User Ban</h4>
          <p>Are you sure you want to Ban this User?</p>
  <label htmlFor="sel1">Duration</label><p />
  <select id="sel1" id="duration"
        onChange={onChange}
        style={{
          display: "initial",
          marginTop: 4,
          borderRadius: 5,
          outline: "none",
          background:"transparent",
          border:"1px solid #9e9e9e",
          width:100
        }}>
     
      <option value="7">7 Days</option>
 <option value="8">8 Days</option>
+      <option value="9">9 Days</option>
+      <option value="10">10 Days</option>
+      <option value="11">11 Days</option>
+      <option value="12">12 Days</option>
+      <option value="13">13 Days</option>
+      <option value="14">14 Days</option>
      <option value="-1">Permanent</option>
  </select>

          <div><label>Reason</label><p />
          <textarea id="reason" name="reason" onChange={onChange} value={sanctionData.reason} rows="4" cols="50" placeholder="Ban Reason" required style={{resize: "none"}} /></div>
        </div>

        <div className="modal-footer" style={{alignItems:"center", display: "flex", justifyContent: "center"}}>
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() =>{
              let title="Account Banned";
              let content= "Your account is Banned";
              let notiftype="Account_Banned";
              let compid=banid
              var state=[]
              state=[...state,{users:banid,consulted:false}]
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              dispatch(banUser(email, "ban", sanctionData.duration, sanctionData.reason, auth.user.fname + " " + auth.user.lname))}}

          >
            Agree
          </a>
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
        </div>
      </div>

      <div id="modal3" className="modal">
        <div className="modal-content">
          <h4>User Unban</h4>
          <p>Are you sure you want to Unban this User?</p>
          <div><label>Reason</label><p />
          <textarea id="reason" name="reason" onChange={onChange} value={sanctionData.reason} rows="4" cols="50" placeholder="Unban Reason" required style={{resize: "none"}}/></div>
        </div>
        <div className="modal-footer" style={{alignItems:"center", display: "flex", justifyContent: "center"}}>
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() => {
              let title="Account Unbanned";
              let content= "Your account was Unbanned";
              let notiftype="Account_Unbanned";
              let compid=banid
              var state=[]
              state=[...state,{users:banid,consulted:false}]
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              dispatch(unbanUser(email,sanctionData.reason, auth.user.fname + " " + auth.user.lname))
              dispatch(unalertUser(email,"User banned", auth.user.fname + " " + auth.user.lname))
            }
            
            }
          >
            Agree
          </a>
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
        </div>
      </div>

      <div id="modal4" className="modal">
        <div className="modal-content">
          <h4>User Alert</h4>
          <p>Are you sure you want to alert this User?</p>


  <label htmlFor="sel1">Duration</label><p />
  <select id="sel1" id="duration"
        onChange={onChange}
        style={{
          display: "initial",
          marginTop: 4,
          borderRadius: 5,
          outline: "none",
          background:"transparent",
          border:"1px solid #9e9e9e",
          width:100
        }}>
    
      <option value="7">7 Days</option>
 <option value="8">8 Days</option>
+      <option value="9">9 Days</option>
+      <option value="10">10 Days</option>
+      <option value="11">11 Days</option>
+      <option value="12">12 Days</option>
+      <option value="13">13 Days</option>
+      <option value="14">14 Days</option>
  </select>

          <div><label>Reason</label><p />
          <textarea id="reason" name="reason" onChange={onChange} value={sanctionData.reason} rows="4" cols="50" placeholder="Alert Reason" required style={{resize: "none"}}/></div>
        </div>
        <div className="modal-footer" style={{alignItems:"center", display: "flex", justifyContent: "center"}}>
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() =>{ 
              let title="Account Alerted";
              let content= "Your Account was Alerted";
              let notiftype="Account_Alerted";
              let compid=alertid
              var state=[]
              state=[...state,{users:alertid,consulted:false}]
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              dispatch(alertUser(email, "alert", sanctionData.duration, sanctionData.reason, auth.user.fname + " " + auth.user.lname))}}
              
          >
            Agree
          </a>
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
        </div>
      </div>

      <div id="modal5" className="modal">
        <div className="modal-content">
          <h4>User Alert</h4>
          <p>Are you sure you want to remove the alert from this User?</p>
          <div><label>Reason</label><p />
          <textarea id="reason" name="reason" onChange={onChange} value={sanctionData.reason} rows="4" cols="50" placeholder="Unalert Reason" required style={{resize: "none"}} /></div>
        </div>
        <div className="modal-footer" style={{alignItems:"center", display: "flex", justifyContent: "center"}}>
          <a
            href="#!"
            className="modal-close btn-flat"
            onClick={() => { 
              let title="Alert Removed";
              let content= "An alert was removed from your account";
              let notiftype="Alert_Removed";
              let compid=alertid
              var state=[]
              state=[...state,{users:alertid,consulted:false}]
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              dispatch(unalertUser(email,sanctionData.reason, auth.user.fname + " " + auth.user.lname))}}
          >
            Agree
          </a>
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
        </div>
      </div>

      <div
          id="modalsanction"
          className="modal"
          style={{ padding: 0, margin: 0,}}
        >
          <Sanctions useremail={email}/>
        </div> 

    </div>
  );
};
export default UserListcard;
