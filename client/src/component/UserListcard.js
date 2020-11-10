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
import UserList from "./UserList";
import {sendNotifications} from "../actions/notificationaction";
const UserListcard = ({ users }) => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.admin.users);
  let auth = useSelector((state) => state.auth);
  const history = useHistory();
  const [deleteid, setDeleteid] = useState("");
  const [banid, setBanid] = useState("");
  const [alertid, setAlertid] = useState("");
  const [modal, setModal] = useState(false);
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
                  }}
                >
                  <div
                    className="card small sticky-action"
                    style={{
                      width: 330,
                      height: 440,
                      filter:
                       
                        el.banned == false
                          ? "initial"
                          : el.banned == true && "grayscale(150%)",
                      // boxShadow:
                      //   el.alerted_date &&
                      //   new Date() < new Date(el.alerted_date) &&
                      //   el.banned == false
                      //     ? "inset 0px 0px 131px 14px #fff300"
                      //     : el.banned == true &&
                      //       "inset 0px 0px 131px 14px #ed1717",
                    }}
                    // key={el._id}
                  >
                    <div
                      className="card-image "
                      style={{
                        height: "55%",
                        width: "100%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <img
                        className="materialboxed"
                        src={el.avatar}
                        height="100%"
                        width="100%"
                        alt=""
                      />
                      {!el.banned&&(!el.alerted_date ||
                        new Date() > new Date(el.alerted_date)) && (
                        <i
                          className="fas fa-exclamation-circle btn-flat modal-trigger"
                          style={{
                            color: el.banned?"white":"gray",
                            position: "absolute",
                            right: "1%",
                            top: "5%",
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
                              position: "absolute",
                              right: "1%",
                              top: "5%",
                              fontSize: 30,
                            }}
                            type="button"
                            data-target="modal5"
                            onClick={() => setAlertid(el._id)}
                            disabled={el.role == "administrator" && true}
                          ></i>
                        )}
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
                      disabled={el.role == "administrator" && true||auth.user.role!="administrator"}
                    >
                      Delete
                    </button>

                    {el.banned === false ? (
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
                          letterSpacing: "1.5px",
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
        <div className="modal-footer">
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
        </div>
        <div className="modal-footer">
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
              dispatch(banUser(banid))}}
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
        </div>
        <div className="modal-footer">
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
              dispatch(unbanUser(banid))}}
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
        </div>
        <div className="modal-footer">
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
              dispatch(alertUser(alertid))}}
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
        </div>
        <div className="modal-footer">
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
              dispatch(unalertUser(alertid))}}
          >
            Agree
          </a>
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};
export default UserListcard;
