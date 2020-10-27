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
export const sendNotifications = (userId,title,content,role,created_at,state,counter) => (dispatch) =>{
  setAuthToken(localStorage.token)
  // console.log(userId, title, content, role)
  axios
    .post("/notifications/add", {userId:userId, title:title, content:content, role:role, created_at:created_at, state:state, counter})
      .then((res) => {
      
      dispatch({  
        type: GET_ERRORS,
        payload: { created: "done" },
      });
     dispatch(getNotifications())
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
