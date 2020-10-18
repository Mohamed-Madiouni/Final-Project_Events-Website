import setAuthToken from "../token/authtoken";
import axios from "axios";
import {GET_ERRORS,GET_COMMENT} from "./types";




//comments

//create
export const addComment =(content,eventId,userId)=> (dispatch)=>{
    setAuthToken(localStorage.token)
    axios
    .post('/comment/add',{content:content,event:eventId,postedBy:userId})
    .then((res) => {
      
      dispatch({
       type: GET_ERRORS,
       payload: {added:"done"},
     })
      dispatch(getComment())
   })
   .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
    
  };
  // get comment
  export const getComment = () => (dispatch) => {
    // setAuthToken(localStorage.token)
  
    axios
      .get("/comment")
      .then((res) => {
        dispatch({ 
          type: GET_COMMENT, 
          payload: res.data 
      })
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    }
      )
      .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
    }
  
  
  
  
  // edit comment
  export const editComment = (idComment, updatedComment) => (dispatch) => {
    setAuthToken(localStorage.token)
    axios
      .put(`/comment/edit/${idComment}`, {newContent:updatedComment})
      .then((res) => {
        dispatch({
         type: GET_ERRORS,
         payload: {success:"done"},
       })
         dispatch(getComment())
     })
      .catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }));
  };
  //delete comment
  export const deleteComment = (idComment) => (dispatch) => {
    setAuthToken(localStorage.token)
    axios
      .delete(`/comment/delete/${idComment}`)
      .then((res) => {
        dispatch(getComment())
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
  
  //reply

  //post reply
  export const addreply =(content,coment_id,userId,idreply)=> (dispatch)=>{
    setAuthToken(localStorage.token)
    axios
    .put(`/comment/add/reply/${coment_id}`,{content:content,postedBy:userId,created_at:new Date(),id:idreply})
    .then((res) => {
      
      dispatch({
       type: GET_ERRORS,
       payload: {reply:"done"},
     })
      dispatch(getComment())
   })
   .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
    
  };

  // // get reply
  // export const getReply = () => (dispatch) => {
  //   // setAuthToken(localStorage.token)
  
  //   axios
  //     .get("/comment/reply")
  //     .then((res) => {
  //       dispatch({ 
  //         type: GET_COMMENT, 
  //         payload: res.data 
  //     })
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: {},
  //     })
  //   }
  //     )
  //     .catch((err) => dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data,
  //   }));
  //   }
  
  
  //edit reply
  export const editReply = (idReply, updatedComment,idComment) => (dispatch) => {
    setAuthToken(localStorage.token)
    axios
      .put(`/comment/edit/reply/${idComment}`, {newContent:updatedComment,id_reply:idReply})
      .then((res) => {
        dispatch({
         type: GET_ERRORS,
         payload: {success:"done"},
       })
         dispatch(getComment())
     })
      .catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }));
  };

  //delete reply
  export const deleteReply = (idComment,idreply) => (dispatch) => {
    setAuthToken(localStorage.token)
    axios
      .put(`/comment/delete/reply/${idComment}`,{reply_id:idreply})
      .then((res) => {
        dispatch(getComment())
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