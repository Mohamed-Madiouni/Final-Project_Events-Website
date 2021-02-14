import setAuthToken from "../token/authtoken";
import axios from "axios";
import { GET_ERRORS, GET_CHAT } from "./types";

//chat

//Get
export const getChat = () => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .get("/chat")
    .then((res) => {
      dispatch({
        type: GET_CHAT,
        payload: res.data,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//add
export const sendnewmessage = (content, usersId, sendedby) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .post("/chat/add/new", {
      content: content,
      users: usersId,
      sendby: sendedby,
    })
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: { newmsg: "done" },
      });
      dispatch(getChat());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Talk
export const sendmessage = (dissId, content, sendedby) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .put(`/chat/add/new/${dissId}`, { content: content, sendby: sendedby })
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: { newmsg: "done" },
      });
      dispatch(getChat());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//delete
export const deleteChat = (chatId, dissId) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .put(`/chat/delete/${chatId}`, { diss: dissId })
    .then((res) => {
      dispatch(getChat());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
