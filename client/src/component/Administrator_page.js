import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  unfollowEvent,
  followEvent,
  getEvent,
  endEvent,
  fullEvent,
  openEvent,
} from "../actions/evntAction";
import { getComment } from "../actions/comntaction";

import get_month from "../outils/get_month";
import "../organizer.css";
import M from "materialize-css";
import {
  GET_ERRORS,
  ADD_FOCUS,
  SHOW_MAP,
  STATE_MAP,
  SHOW_TALK,
  ADD_TALK,
} from "../actions/types";
import { getCurrentUser } from "../actions/authaction";
import historyevent from "../outils/history";
import { getUsers } from "../actions/adminaction";
import Search from "./Search";
import "../participant.css";
import { logoutUser } from "../actions/authaction";
import calcul_rating from "../outils/calucle_rating";
import Footer from "./Footer";
import { formatRelative } from "date-fns";
import MyMap from "./Maps";
import { geteventorg } from "../outils/geteventorg";
import Navbar from "./Navbar";
import { sendNotifications } from "../actions/notificationaction";
import nbr_comments from "../outils/nbr_comments";
function Administrator_page({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const users = useSelector((state) => state.admin.users);
  const comments = useSelector((state) => state.comments);
  const chat = useSelector((state) => state.chat);
  var rs = 0;

  useEffect(() => {
    localStorage.token && dispatch(getCurrentUser());
    M.Modal.init(document.querySelectorAll(".modal"));
    dispatch(getUsers());
    dispatch(getComment());
  }, []);

  useEffect(() => {
    M.Materialbox.init(document.querySelectorAll(".materialboxed"));
    M.Slider.init(document.querySelectorAll(".slider"), {
      height: 60,
      indicators: false,
    });
    M.updateTextFields();
    if (errors.banned) {
      M.toast({
        html: `Your account has been banned from subscribtion to any event !! \n your restriction will end in ${new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 7
        )}  `,
        classes: "red darken-4",
        displayLength: 10000,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    }
  });

  return (
    <>
      <Navbar />

      <div
        className=" row"
        style={{ verticalAlign: "middle", margin: "30px 15px 20px 15px" }}
      >
        <div className=" col s12 organizer_hi ">
          {users.length != 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  style={{ width: 130, height: 130, paddingTop: 10 }}
                  src={
                    users.find((el) => el._id === match.params.administratorId)
                      .avatar
                  }
                  alt="../public/User_icon.png"
                  className="circle"
                />

                {((auth.user.blocked &&
                  auth.user._id != match.params.administratorId &&
                  !auth.user.blocked.includes(match.params.administratorId)) ||
                  users
                    .find((el) => el._id === match.params.administratorId)
                    .blocked.includes(auth.user._id)) && (
                  <i
                    className="fas fa-envelope"
                    style={{
                      color: "#ffbc1c",
                      lineHeight: "unset",
                      position: "absolute",
                      left: -5,
                      top: 1,
                      fontSize: 22,
                      cursor: "pointer",
                    }}
                    title="Let's talk"
                    onClick={() => {
                      if (auth.isAuthenticated) {
                        dispatch({
                          type: SHOW_TALK,
                          payload: !chat.talk.show,
                        });
                        dispatch({
                          type: ADD_TALK,
                          payload: match.params.administratorId,
                        });
                      } else history.push("/login");
                    }}
                  ></i>
                )}

                {users.find((el) => el._id === match.params.administratorId)
                  .online ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      background: "green",
                      right: 4,
                      bottom: 8,
                      borderRadius: "50%",
                      width: 10,
                      height: 10,
                    }}
                  >
                    <span
                      style={{
                        marginLeft: 50,
                        color: "green",
                        fontSize: 11,
                        fontWeight: "bold",
                      }}
                    >
                      Online
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      background: "#616161",
                      right: 4,
                      bottom: 8,
                      borderRadius: "50%",
                      width: 10,
                      height: 10,
                    }}
                  >
                    <span
                      style={{
                        marginLeft: 50,
                        color: "#616161",
                        fontSize: 11,
                        fontWeight: "bold",
                      }}
                    >
                      Offline
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          <p className="h5-tit" style={{ paddingTop: 0 }}>
            {users.length != 0 &&
              users.find((el) => el._id === match.params.administratorId)
                .fname}{" "}
            {users.length != 0 &&
              users.find((el) => el._id === match.params.administratorId).lname}
          </p>
        </div>
      </div>

      <div
        className="row quicksearch"
        style={{
          margin: "30px 15px 20px 15px",
          fontSize: 15,
          height: 200,
          paddingTop: 10,
          position: "relative",
        }}
      >
        <div
          className="col s12 l4"
          style={{ fontSize: 14, fontWeight: "bold" }}
        >
          Inscription date:{" "}
          {users.length != 0 &&
            users
              .find((el) => el._id === match.params.administratorId)
              .created_at.toString()
              .replace("Z", "")
              .replace("T", " ")
              .replace(/\.\d+/, "")}
          <p />
          Comments number:{" "}
          {(comments.comments && comments.comments).map((elc) => {
            elc.reply
              .filter((el) => el.postedBy === match.params.administratorId)
              .map((el) => {
                rs = rs + 1;
              });
          })}
          {comments.comments &&
            nbr_comments(
              comments.comments.filter(
                (el) => el.postedBy === match.params.administratorId
              ).length
            ) + rs}
          <div>
            Personal note:
            {users.length != 0 &&
              users.find((el) => el._id === match.params.administratorId).note}
          </div>
        </div>
      </div>

      {/* <Footer />  */}
    </>
  );
}
export default Administrator_page;
