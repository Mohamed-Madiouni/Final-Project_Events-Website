import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddModo, DeleteModo, getUsers } from "../actions/adminaction";
import { getCurrentUser } from "../actions/authaction";
import { useHistory, Link } from "react-router-dom";
import historyuser from "../outils/history";
import "../events.css";
import M from "materialize-css";
import "../userlist.css";
const Moderators_card = ({ users }) => {
  const dispatch = useDispatch();
  const [modoid, SetUserId] = useState("");
  const [modal, setModal] = useState(false);
  const [countuser, setCountuser] = useState(0);
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

  return (
    <div id="modalmodo" style={{ padding: 0, margin: 0 }}>
      <div
        className="notification-page__content"
        style={{ marginBottom: "0px", padding: "0" }}
      >
        <div className="notification-page__content__title"></div>
        <div>
          <div className="notification-container">
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {users &&
                users
                  .slice(0)
                  .reverse()
                  .slice(0, 12 + countuser * 12)
                  .map((el) => {
                    return (
                      <div
                        className="mod-card"
                        key={el._id}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                          margin: "0px 5px",
                        }}
                      >
                        <div
                          className="card small sticky-action"
                          style={{
                            overflow: "hidden",
                            width: 315,
                            height: 440,
                          }}
                        >
                          <div
                            style={{
                              height: "55%",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              overflow: "hidden",
                            }}
                          >
                            <Link to={`/${el.role}/${el._id}`}>
                              <img
                                className="circle"
                                src={el.avatar}
                                height="100%"
                                width="250px"
                                objectfit="cover"
                                overflow="hidden"
                                alt=""
                              />{" "}
                            </Link>
                            {el.online && (
                              <div
                                style={{
                                  position: "absolute",
                                  background: "green",
                                  right: 290,
                                  bottom: 417,
                                  borderRadius: "50%",
                                  width: 10,
                                  height: 10,
                                }}
                              >
                                <span
                                  style={{
                                    position: "relative",
                                    right: -11,
                                    bottom: 6,
                                    color: "green",
                                    fontSize: 11,
                                  }}
                                >
                                  Online
                                </span>
                              </div>
                            )}
                          </div>
                          <div style={{ marginBottom: "5px" }}>
                            <span className="black-text">
                              <b>
                                {el.fname + " "}
                                {el.lname}
                              </b>
                            </span>
                          </div>
                          <p
                            className="black-text"
                            style={{ marginBottom: "8px" }}
                          >
                            {el.email}
                          </p>
                          <span className="black-text">{el.role}</span>
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
                              onClick={() => SetUserId(el._id)}
                              data-target="addmodo"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
            </div>
            <p />
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
export default Moderators_card;
