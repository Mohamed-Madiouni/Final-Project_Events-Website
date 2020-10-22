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
            .slice(0, 12 + countuser * 12)
            .reverse()
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
                        el.alerted_date &&
                        new Date() < new Date(el.alerted_date) &&
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
                      />
                      {(!el.alerted_date ||
                        new Date() > new Date(el.alerted_date)) && (
                        <i
                          className="fas fa-exclamation-circle btn-flat modal-trigger"
                          style={{
                            color: "gray",
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
                      {el.alerted_date &&
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

                    <div>
                      <span className="black-text">
                        <b>
                          {el.fname + " "}
                          {el.lname}
                        </b>
                      </span>
                    </div>

                    <p className="black-text">{el.email}</p>
                    <span className="black-text">
                      <br />
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
                      disabled={el.role == "administrator" && true}
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

      {(countuser + 1) * 10 < allusers.filter((el) => el._id).length && (
        <div
          style={{
            display: "flex",
            cursor: "pointer",
            color: "rgb(46, 143, 165)",
            fontWeight: 550,
          }}
          onClick={() => {
            setCountuser(countuser + 1);
          }}
        >
          <i className="material-icons">expand_more</i>
          <p>Show more users</p>
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
            onClick={() => dispatch(banUser(banid))}
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
            onClick={() => dispatch(unbanUser(banid))}
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
            onClick={() => dispatch(alertUser(alertid))}
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
            onClick={() => dispatch(unalertUser(alertid))}
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
