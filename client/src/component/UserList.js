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
  const [countuser,setCountuser] = useState(0)
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
    M.Modal.init(document.querySelectorAll(".modal"))
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

      <div
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
      </div>
      {resiz && (
        <div className="col l2 s12">
          <div>
            <div class="switch">
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

      {modal ? (
        <table>
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
                .slice(0,10+countuser*10)
                .reverse()
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
                      el.alerted_date &&
                      new Date() < new Date(el.alerted_date) &&
                      el.banned == false
                        ? "initial"
                        : el.banned == true &&
                        "grayscale(150%)"
                    }}
                      // key={el._id}
                    >
                      <td className="center-align" style={{padding:0}}>
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
                      <td className="center-align" style={{padding:0}}>
                        <span className="center-align">
                          {el.fname + " "}
                          {el.lname}
                        </span>
                      </td>
                      <td className="center-align" style={{padding:0}}>
                        <span>{el.email}</span>
                      </td>
                      <td className="center-align" style={{padding:0}}>
                        <span>{el.role}</span>
                      </td>
                      <td className="center-align" style={{padding:0}}>
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

                      <td className="center-align" style={{padding:0}}>
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
                            (el.role == "administrator" && true) ||
                            (auth.user.role == "moderator" && true)
                          }
                        >
                          Delete
                        </button>
                      </td>
                      <td className="center-align" style={{padding:0}}>
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
                            disabled={el.role == "administrator" && true}
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
                              color:"white"
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

                      <td className="center-align" style={{padding:0}}>
                        {(!el.alerted_date ||
                          new Date() > new Date(el.alerted_date)) && (
                          <i
                            className="fas fa-exclamation-circle btn-flat modal-trigger"
                            style={{
                              color: "gray",

                              right: "2%",
                              fontSize: 30,
                            }}
                            type="button"
                            data-target="modal4"
                            onClick={() => setAlertid(el._id)}
                            disabled={el.role == "administrator" && true}
                          ></i>
                        )}
                        {el.alerted_date &&
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
{((countuser+1)*10)<allusers.filter(el=>el._id).length&&<div style={{display:"flex",cursor:"pointer",color: "rgb(46, 143, 165)",fontWeight: 550}} onClick={()=>{
              setCountuser(countuser+1)
              
              }}>
          <i
                  className="material-icons"
                >
                 expand_more
                </i>
            <p  >Show more users</p>
          </div>}        

        </table>
        
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
          <a
            href="#!"
            className="modal-close  btn-flat"
          >
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
            onClick={() => dispatch(banUser(banid))}
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

      <div id="modal3" className="modal">
        <div className="modal-content">
          <h4>User Unban</h4>
          <p>Are you sure you want to Unban this User?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() => dispatch(unbanUser(banid))}
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

      <div id="modal4" className="modal">
        <div className="modal-content">
          <h4>User Alert</h4>
          <p>Are you sure you want to alert this User?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() => dispatch(alertUser(alertid))}
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

      <div id="modal5" className="modal">
        <div className="modal-content">
          <h4>User Alert</h4>
          <p>Are you sure you want to remove the alert from this User?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close  btn-flat"
            onClick={() => dispatch(unalertUser(alertid))}
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
    </div>
  );
};
export default UserList;
