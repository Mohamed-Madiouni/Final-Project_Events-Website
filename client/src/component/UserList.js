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
import { getCurrentUser } from "../actions/authaction";
import { useHistory } from "react-router-dom";
import historyuser from "../outils/history";
import "../events.css";
import M from "materialize-css";
import "../userlist.css";
import UserListcard from "./UserListcard";
import { SET_RESIZE } from "../actions/types";
import {sendNotifications} from "../actions/notificationaction";
const UserList = () => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.admin.users);
  let auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [deleteid, setDeleteid] = useState("");
  const [banid, setBanid] = useState("");
  const [alertid, setAlertid] = useState("");
  const [modal, setModal] = useState(false);
  const [resiz, setresiz] = useState(true);
  const [countuser, setCountuser] = useState(0);
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

  useEffect(() => {
    dispatch(getUsers());
    localStorage.token && dispatch(getCurrentUser());
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
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1002) {
        setModal(false);
        setresiz(false);
      } else setresiz(true);
    });
  });

  useEffect(() => {
    if (window.innerWidth <= 1002) setresiz(false);
  }, []);
  let users = allusers.filter((el) => {
    return (
      el.fname.toLowerCase().includes(quickSearch.fname.toLowerCase()) &&
      el.role.toLowerCase().includes(quickSearch.role.toLowerCase()) &&
      el.lname.toLowerCase().includes(quickSearch.lname.toLowerCase()) &&
      el.email.toLowerCase().includes(quickSearch.email.toLowerCase()) &&
      el.address.toLowerCase().includes(quickSearch.address.toLowerCase()) &&
      el.tel.toLowerCase().includes(quickSearch.tel.toLowerCase())
    );
  });

  const onChange = (e) => {
    setQuickSearch({ ...quickSearch, [e.target.id]: e.target.value });
  };
  return (
    <div>
      {/* <div className="row"> */}

      <div className="row quicksearch" style={{margin:"30px 15px 20px 15px",fontSize:15,height:255,paddingTop:40,position:"relative"}} >
     <h5 style={{position:"absolute",fontSize:35,left:5,top:-30}}><b>Looking for a user?</b></h5>
       <div className="col s12">
       <div className="col s12 l4" style={{fontStyle: "",fontSize:17,marginBottom:10}}>
   <p>Select a user name or choose an address or email to find the one looking for.</p>
   </div>
   <div className="col s12 l8" style={{fontWeight:800,marginBottom:10}}>
   <form>
          <div className="input-field col s4">
            <input
              placeholder="First name search"
              id="fname"
              type="text"
              value={quickSearch.fname}
              onChange={onChange}
            />
            <label forhtml="fname">First name</label>
          </div>
          <div className="input-field col s4">
            <select
              id="role"
              value={quickSearch.role}
              onChange={onChange}
              style={{
                display: "initial",
                marginTop: 4,
                borderRadius: 5,
                outline: "none",
                background:"transparent",
                border:"1px solid #9e9e9e"
              }}
            >
              <option value="">All</option>
              <option value="Participant" className="gray-text">
                Participant
              </option>
              <option value="Organizer" className="gray-text">
                Organizer
              </option>
              <option value="Admin" className="gray-text">
                Admin
              </option>
              <option value="Moderator" className="gray-text">
                Moderator
              </option>
            </select>
            <label className="active">Role</label>
          </div>
          <div className="input-field col s4">
            <input
              placeholder="Last name search"
              id="lname"
              type="text"
              value={quickSearch.lname}
              onChange={onChange}
            />
            <label forhtml="title">Last name</label>
          </div>

          <div className="input-field col s4">
            <input
              placeholder="Email search"
              id="email"
              type="text"
              value={quickSearch.email}
              onChange={onChange}
            />
            <label forhtml="title">Email</label>
          </div>
          <div className="input-field col s4">
            <input
              placeholder="Address search"
              id="address"
              type="text"
              value={quickSearch.address}
              onChange={onChange}
            />
            <label forhtml="title">Address</label>
          </div>
          <div className="input-field col s4">
            <input
              placeholder="Telephone search"
              id="tel"
              type="text"
              value={quickSearch.tel}
              onChange={onChange}
            />
            <label forhtml="title">Telephone</label>
          </div>
        </form>
   </div>
   </div>
   {resiz && (
        <div className="col s12" style={{ display: "flex",
        alignItems: "center",
        justifyContent:"center"}}>
          <div>
            <div className="switch">
              <label>
                Card
                <input type="checkbox" onClick={toggle} />
                <span className="lever"></span>
                List
              </label>
            </div>
          </div>
        </div>
      )}
 </div>


      {/* <div
        className="col l9 offset-l1 s12"
        style={{ marginTop: "20px", fontSize: 15, fontWeight: 800 }}
      >
        <form>
          <div className="input-field col s4 m5">
            <input
              placeholder="First name search"
              id="fname"
              type="text"
              value={quickSearch.fname}
              onChange={onChange}
            />
            <label forhtml="fname">First name</label>
          </div>
          <div className="input-field col s4 m3">
            <select
              id="role"
              value={quickSearch.role}
              onChange={onChange}
              style={{
                display: "initial",
                marginTop: 4,
                borderRadius: 5,
                outline: "none",
              }}
            >
              <option value="">All</option>
              <option value="Participant" className="gray-text">
                Participant
              </option>
              <option value="Organizer" className="gray-text">
                Organizer
              </option>
              <option value="Admin" className="gray-text">
                Admin
              </option>
              <option value="Moderator" className="gray-text">
                Moderator
              </option>
            </select>
            <label className="active">Role</label>
          </div>
          <div className="input-field col s4 m4">
            <input
              placeholder="Last name search"
              id="lname"
              type="text"
              value={quickSearch.lname}
              onChange={onChange}
            />
            <label forhtml="title">Last name</label>
          </div>

          <div className="input-field col s4 m4">
            <input
              placeholder="Email search"
              id="email"
              type="text"
              value={quickSearch.email}
              onChange={onChange}
            />
            <label forhtml="title">Email</label>
          </div>
          <div className="input-field col s4 m4">
            <input
              placeholder="Address search"
              id="address"
              type="text"
              value={quickSearch.address}
              onChange={onChange}
            />
            <label forhtml="title">Address</label>
          </div>
          <div className="input-field col s4 m4">
            <input
              placeholder="Telephone search"
              id="tel"
              type="text"
              value={quickSearch.tel}
              onChange={onChange}
            />
            <label forhtml="title">Telephone</label>
          </div>
        </form>
      </div> */}
      {/* {resiz && (
        <div className="col l2 s12">
          <div>
            <div className="switch">
              <label>
                Card
                <input type="checkbox" onClick={toggle} />
                <span className="lever"></span>
                List
              </label>
            </div>
          </div>
        </div>
      )} */}

{(quickSearch.fname!="" || quickSearch.lname!="" || quickSearch.role!="" || quickSearch.address!="" || quickSearch.tel!="" || quickSearch.email!="")&&
            
            <div className="row" style={{marginLeft:"10px"}} > 
              <div className=" row vc_row wpb_row vc_row-fluid section-header featured">
              <div className="wpb_column vc_column_container col 12">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    <div className="wpb_text_column wpb_content_element ">
                      <div className=" wpb_wrapper"> 
                      <h2>{users.length}</h2>
                        <p className="pra-2"> result(s) found </p>
                        </div></div></div></div></div></div> 
           

            </div>}


      {modal ? (
        <span>
          <table style={{marginBottom:10}}>
            <thead>
              <tr>
                <th className="center-align">Avatar</th>
                <th className="center-align">Name</th>
                <th className="center-align">Mail</th>
                <th className="center-align">Role</th>
                <th className="center-align">Created</th>
                <th className="center-align">Delete</th>
                <th className="center-align">Ban</th>
                <th className="center-align">Alert</th>
              </tr>
            </thead>

            <tbody>
              {users &&
                users
                  .slice(0)
                  .reverse()
                  .slice(0, 10 + countuser * 10)
                  .map((el) => {
                    return (
                      <tr
                        key={el._id}
                        className="center-align"
                        style={{
                          //   boxShadow:
                          //     el.alerted_date &&
                          //     new Date() < new Date(el.alerted_date) &&
                          //     el.banned == false
                          //       ? "inset 0px 0px 13px 10px #fff300"
                          //       : el.banned == true &&
                          //         "inset 0px 0px 13px 10px #ed1717",
                          filter:
                           
                            el.banned == false
                              ? "initial"
                              : el.banned == true && "grayscale(150%)",
                        }}
                        // key={el._id}
                      >
                        <td className="center-align" style={{ padding: 0,lineHeight: "normal" }}>
                          <span
                            className="card-image center-align"
                            style={{
                              height: "100%",
                              width: "5%",
                              placeItems: "center",
                            }}
                          >
                            <img
                              height="50px"
                              className="circle center-align"
                              src={el.avatar}
                              style={{ borderRadius: "50%", width: "50px" }}
                            />
                          </span>
                        </td>
                        <td className="center-align" style={{ padding: 0 }}>
                          <span className="center-align">
                            {el.fname + " "}
                            {el.lname}
                          </span>
                        </td>
                        <td className="center-align" style={{ padding: 0 }}>
                          <span>{el.email}</span>
                        </td>
                        <td className="center-align" style={{ padding: 0 }}>
                          <span>{el.role}</span>
                        </td>
                        <td className="center-align" style={{ padding: 0 }}>
                          <span>
                            <i
                              className=" tiny material-icons"
                              style={{
                                transform: "translateY(2px)",
                                marginRight: 5,
                              }}
                            >
                              history
                            </i>

                            {historyuser(el.created_at)}
                          </span>
                        </td>

                        <td className="center-align" style={{ padding: 0 }}>
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
                            data-target="modal1"
                            onClick={() => setDeleteid(el._id)}
                            disabled={
                              (el.role == "administrator" && true||auth.user.role!="administrator")
                              
                            }
                          >
                            Delete
                          </button>
                        </td>
                        <td className="center-align" style={{ padding: 0 }}>
                          {el.banned === false ? (
                            <button
                              style={{
                                width: "100px",
                                height: "40px",
                                borderRadius: "3px",
                                letterSpacing: "1px",
                                margin: "1rem",
                              }}
                              type="button"
                              className="btn btn-medium modal-trigger"
                              data-target="modal2"
                              onClick={() => setBanid(el._id)}
                              disabled={el.role == "administrator" ||!el.alerted_date}
                            >
                              Ban
                            </button>
                          ) : (
                            <button
                              style={{
                                width: "100px",
                                height: "40px",
                                borderRadius: "3px",
                                letterSpacing: "1px",
                                margin: "1rem",
                                backgroundColor: "gray",
                                color: "white",
                              }}
                              type="button"
                              className="btn btn-medium modal-trigger"
                              data-target="modal3"
                              onClick={() => setBanid(el._id)}
                              disabled={el.role == "administrator" && true}
                            >
                              Unban
                            </button>
                          )}
                        </td>

                        <td className="center-align" style={{ padding: 0 }}>
                          {!el.banned&&(!el.alerted_date ||
                            new Date() > new Date(el.alerted_date)) && (
                            <i
                              className="fas fa-exclamation-circle btn-flat modal-trigger"
                              style={{
                                color: el.banned?"white":"gray",
                                right: "2%",
                                fontSize: 30,
                              }}
                              type="button"
                              data-target="modal4"
                              onClick={() => setAlertid(el._id)}
                              disabled={el.role == "administrator" && true}
                            ></i>
                          )}
                          {!el.banned&&el.alerted_date &&
                            new Date() < new Date(el.alerted_date) && (
                              <i
                                className="fas fa-exclamation-circle btn-flat modal-trigger"
                                style={{
                                  color: "red",
                                  right: "2%",
                                  fontSize: 30,
                                  // height: 70,
                                  // paddingTop: 20,
                                }}
                                type="button"
                                data-target="modal5"
                                onClick={() => setAlertid(el._id)}
                                disabled={el.role == "administrator" && true}
                              ></i>
                            )}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          <p>
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
          </p>
        </span>
      ) : (
        <div>
          <div className="row">
            <div
              className="col s12"
              style={{
                textAlign: "center",
              }}
            >
              <UserListcard users={users} />
            </div>
          </div>
        </div>
      )}

      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>User delete</h4>
          <p>Are you sure you want to delete this User?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() => dispatch(deleteUser(deleteid))}
          >
            Agree
          </a>
          <a href="#!" className="modal-close  btn-flat">
            Cancel
          </a>
        </div>
      </div>

      <div id="modal2" className="modal">
        <div className="modal-content">
          <h4>User Ban</h4>
          <p>Are you sure you want to Ban this User?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() =>{
              let title="Account Banned";
              let content= "Your account is Banned";
              let notiftype="Account_Banned";
              let compid=banid
              var state=[]
              state=[...state,{users:banid,consulted:false}]
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              dispatch(banUser(banid))}}
          >
            Agree
          </a>
          <a href="#!" className="modal-close  btn-flat">
            Cancel
          </a>
        </div>
      </div>

      <div id="modal3" className="modal">
        <div className="modal-content">
          <h4>User Unban</h4>
          <p>Are you sure you want to Unban this User?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() =>{
              let title="Account Unbanned";
              let content= "Your account was Unbanned";
              let notiftype="Account_Unbanned";
              let compid=banid
              var state=[]
              state=[...state,{users:banid,consulted:false}]
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              dispatch(unbanUser(banid))}}
          >
            Agree
          </a>
          <a href="#!" className="modal-close  btn-flat">
            Cancel
          </a>
        </div>
      </div>

      <div id="modal4" className="modal">
        <div className="modal-content">
          <h4>User Alert</h4>
          <p>Are you sure you want to alert this User?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() =>{ 
              let title="Account Alerted";
              let content= "Your Account was Alerted";
              let notiftype="Account_Alerted";
              let compid=alertid
              var state=[]
              state=[...state,{users:alertid,consulted:false}]
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              dispatch(alertUser(alertid))}}
          >
            Agree
          </a>
          <a href="#!" className="modal-close  btn-flat">
            Cancel
          </a>
        </div>
      </div>

      <div id="modal5" className="modal">
        <div className="modal-content">
          <h4>User Alert</h4>
          <p>Are you sure you want to remove the alert from this User?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() =>{ 
              let title="Alert Removed";
              let content= "An alert was removed from your account";
              let compid=alertid
              let notiftype="Alert_Removed";
              var state=[]
              state=[...state,{users:alertid,consulted:false}]
              dispatch(sendNotifications(auth.user._id,title,content,auth.user.role, notiftype,state,compid))
              dispatch(unalertUser(alertid))}}
          >
            Agree
          </a>
          <a href="#!" className="modal-close  btn-flat">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};
export default UserList;
