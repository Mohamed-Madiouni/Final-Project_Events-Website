import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddModo, DeleteModo, getUsers } from "../actions/adminaction";
import { getCurrentUser } from "../actions/authaction";
import { useHistory, Link } from "react-router-dom";
import historyuser from "../outils/history";
import "../events.css";
import M from "materialize-css";
import "../userlist.css";
import Moderators_card from "./Moderators_card";
import Pusher from "pusher-js";
const Moderators = () => {
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.admin.users);
  const [modoid, SetUserId] = useState("");
  const [modal, setModal] = useState(false);
  const [countuser, setCountuser] = useState(0);
  const [resiz, setresiz] = useState(true);
  const toggle = () => {
    setModal(!modal);
  };
  const [quickSearch, setQuickSearch] = useState({
    fname: "",
    lname: "",
    role: "Moderator",
    email: "",
    address: "",
    tel: "",
  });

  useEffect(() => {
    var pusher = new Pusher("16ca3006a08827062073", {
      cluster: "eu",
    });
    var channel = pusher.subscribe("channel2");
    channel.bind("log", function (data) {
      dispatch(getUsers());
    });
  }, []);

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
    <div id="modalmodo" style={{ padding: 0, margin: 0 }}>
      <div>
        <h4 className="center" style={{ marginTop: "20px" }}>
          Moderators Center
        </h4>
      </div>
      <div className="notification-page__content" style={{ marginBottom: 0 }}>
        <div className="notification-page__content__title"></div>
        <div>
          <div className="notification-container">
            <div
              className="row quicksearch"
              style={{
                margin: "10px 15px 20px 15px",
                fontSize: 15,
                paddingTop: 40,
                position: "relative",
              }}
            >
              <div className="col s12">
                <div
                  className="col s12 l4"
                  style={{ fontStyle: "", fontSize: 17, marginBottom: 10 }}
                >
                  <p>
                    Select a user name or choose an address or email to find the
                    one looking for.
                  </p>
                </div>
                <div
                  className="col s12 l8"
                  style={{ fontWeight: 800, marginBottom: 10 }}
                >
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
                        defaultValue={quickSearch.role}
                        onChange={onChange}
                        style={{
                          display: "initial",
                          marginTop: 4,
                          borderRadius: 5,
                          outline: "none",
                          background: "transparent",
                          border: "1px solid #9e9e9e",
                        }}
                      >
                        <option value="">All</option>
                        <option value="Participant" className="gray-text">
                          Participant
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
                <div
                  className="col s12"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
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

            {(quickSearch.fname !== "" ||
              quickSearch.lname !== "" ||
              quickSearch.role !== "" ||
              quickSearch.address !== "" ||
              quickSearch.tel !== "" ||
              quickSearch.email !== "") && (
              <div
                className="row"
                style={{ marginLeft: "10px", marginBottom: "0px" }}
              >
                <div
                  className=" row vc_row wpb_row vc_row-fluid section-header featured"
                  style={{ marginBottom: "0px" }}
                >
                  <div className="wpb_column vc_column_container col 12">
                    <div className="vc_column-inner">
                      <div className="wpb_wrapper">
                        <div className="wpb_text_column wpb_content_element ">
                          <div className=" wpb_wrapper">
                            <h2>{users.length}</h2>
                            <p className="pra-2"> result(s) found </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            )}
            {modal ? (
              <span>
                <table style={{ marginBottom: 10 }}>
                  <thead>
                    <tr>
                      <th className="center-align">Avatar</th>
                      <th className="center-align">Name</th>
                      <th className="center-align">Mail</th>
                      <th className="center-align">Role</th>
                      <th className="center-align">Created</th>
                      <th className="center-align">Remove</th>
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
                            <tr key={el._id} className="center-align">
                              <td
                                className="center-align"
                                style={{ padding: 0, lineHeight: "normal" }}
                              >
                                <div
                                  className="card-image center-align"
                                  style={{
                                    height: "100%",
                                    placeItems: "center",
                                    display: "grid",
                                    position: "relative",
                                  }}
                                >
                                  <span
                                    style={{
                                      position: "relative",
                                    }}
                                  >
                                    <Link to={`/${el.role}/${el._id}`}>
                                      {" "}
                                      <img
                                        height="50px"
                                        className="circle center-align"
                                        src={el.avatar}
                                        style={{
                                          borderRadius: "50%",
                                          width: "50px",
                                        }}
                                        alt=""
                                      />
                                    </Link>
                                    {el.online && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          background: "green",
                                          right: -5,
                                          bottom: 42,
                                          borderRadius: "50%",
                                          width: 10,
                                          height: 10,
                                        }}
                                      ></div>
                                    )}
                                  </span>
                                </div>
                              </td>
                              <td
                                className="center-align"
                                style={{ padding: 0 }}
                              >
                                <span className="center-align">
                                  {el.fname + " "}
                                  {el.lname}
                                </span>
                              </td>
                              <td
                                className="center-align"
                                style={{ padding: 0 }}
                              >
                                <span>{el.email}</span>
                              </td>
                              <td
                                className="center-align"
                                style={{ padding: 0 }}
                              >
                                <span>{el.role}</span>
                              </td>
                              <td
                                className="center-align"
                                style={{ padding: 0 }}
                              >
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
                              <td
                                className="center-align"
                                style={{ padding: 0 }}
                              >
                                {el.role === "moderator" ? (
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
                                    onClick={() => SetUserId(el._id)}
                                    data-target="removemodo"
                                  >
                                    Remove
                                  </button>
                                ) : (
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
                                    onClick={() => SetUserId(el.id)}
                                    data-target="addmodo"
                                  >
                                    Add
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>

                <div>
                  {(countuser + 1) * 10 < users.length && (
                    <div
                      style={{
                        marginBottom: "5px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      id="loadMore"
                      className="thb-gp-load-more"
                      data-thb-gp-lm-type="event"
                      data-org-text="MORE"
                      onClick={() => {
                        setCountuser(countuser + 1);
                      }}
                    >
                      SHOW MORE
                    </div>
                  )}
                </div>
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
                    <Moderators_card users={users} />
                  </div>
                </div>
              </div>
            )}

            <div id="removemodo" className="modal">
              <div className="modal-content">
                <h4>Remove Moderator</h4>
                <p />
                Are you sure you want to remove this moderator?
              </div>
              <div
                className="modal-footer"
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <a
                  href="#!"
                  className="modal-close btn-flat"
                  onClick={() => dispatch(DeleteModo(modoid))}
                >
                  Agree
                </a>
                <a href="#!" className="modal-close btn-flat">
                  Cancel
                </a>
              </div>
            </div>

            <div id="addmodo" className="modal">
              <div className="modal-content">
                <h4>Add Moderator</h4>
                <p />
                Are you sure you want to add this user as moderator?
              </div>
              <div
                className="modal-footer"
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <a
                  href="#!"
                  className="modal-close btn-flat"
                  onClick={() => dispatch(AddModo(modoid))}
                >
                  Agree
                </a>
                <a href="#!" className="modal-close btn-flat">
                  Cancel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Moderators;
