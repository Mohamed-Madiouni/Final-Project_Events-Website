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
export const sendNotifications = (userId, title, content, role, state, counter) => (
  dispatch
) => {
  setAuthToken(localStorage.token);
  axios
    .post("/notification/add", {
      content: content,
      title: title,
      createdBy: userId,
      role: role,
      state: state,
      counter: counter
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
