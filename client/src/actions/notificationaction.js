import { GET_ERRORS, GET_NOTIFICATIONS } from "./types";
import axios from "axios";
import setAuthToken from "../token/authtoken";

// Get Notifications
export const getNotifications = () => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .get("/notifications")
    .then((res) =>
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Send Notifications
export const sendNotifications = (
  userId,
  title,
  content,
  role,
  notiftype,
  state
) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .post("/notifications/add", {
      userId: userId,
      title: title,
      content: content,
      role: role,
      notiftype: notiftype,
      state: state,
    })
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: { created: "done" },
      });
      dispatch(getNotifications());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//close notifications
export const closeNotif = (idNotif) => (dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .put(`/notifications/close/`,idNotif)
    .then((res) => {
      dispatch({
       type: GET_ERRORS,
       payload: {},
     })
      
   })
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
};
