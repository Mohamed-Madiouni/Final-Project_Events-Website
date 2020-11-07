import setAuthToken from "../token/authtoken";
import axios from "axios";
import {GET_ERRORS,GET_COMMENT} from "./types";
import { getUsers } from '../actions/adminaction';
import { getCurrentUser } from '../actions/authaction';


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

  //like
  export const likecomment =(coment_id,nb_likes,userid)=> (dispatch)=>{
    setAuthToken(localStorage.token)
    axios
    .put(`/comment/add/like/${coment_id}`,{likes:nb_likes,user:userid})
    .then((res) => {
      dispatch(getComment())
      dispatch(getCurrentUser())
   })
   .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
    
  };
  //remove like
  export const removelikecomment =(coment_id,nb_likes,userid)=> (dispatch)=>{
    setAuthToken(localStorage.token)
    axios
    .put(`/comment/add/like/remove/${coment_id}`,{likes:nb_likes,user:userid})
    .then((res) => {
      dispatch(getComment())
      dispatch(getCurrentUser())
   })
   .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
    
  };
  //dislike
  export const dislikecomment =(coment_id,nb_likes,userid)=> (dispatch)=>{
    setAuthToken(localStorage.token)
    axios
    .put(`/comment/add/dislike/${coment_id}`,{dislikes:nb_likes,user:userid})
    .then((res) => {
      dispatch(getComment())
      dispatch(getCurrentUser())
   })
   .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
    
  };

  //remove dislike
  export const removedislikecomment =(coment_id,nb_likes,userid)=> (dispatch)=>{
    setAuthToken(localStorage.token)
    axios
    .put(`/comment/add/dislike/remove/${coment_id}`,{dislikes:nb_likes,user:userid})
    .then((res) => {
      dispatch(getComment())
      dispatch(getCurrentUser())
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
    .put(`/comment/add/reply/${coment_id}`,{content:content,postedBy:userId,created_at:new Date(),id:idreply,likes:0,dislikes:0,reports:0})
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
  
  //likereply
  export const likereply =(reply_id,nb_likes,userid,comment_id)=> (dispatch)=>{
    setAuthToken(localStorage.token)
    axios
    .put(`/comment/add/like/reply/${reply_id}`,{likes:nb_likes,user:userid,comment:comment_id})
    .then((res) => {
      dispatch(getComment())
      dispatch(getCurrentUser())
   })
   .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
    
  };
//remove likereply
export const removelikereply =(reply_id,nb_likes,userid,comment_id)=> (dispatch)=>{
  setAuthToken(localStorage.token)
  axios
  .put(`/comment/add/like/reply/remove/${reply_id}`,{likes:nb_likes,user:userid,comment:comment_id})
  .then((res) => {
    dispatch(getComment())
    dispatch(getCurrentUser())
 })
 .catch((err) => dispatch({
  type: GET_ERRORS,
  payload: err.response.data,
}));
  
};

//dislikereply
export const dislikereply =(reply_id,nb_likes,userid,comment_id)=> (dispatch)=>{
  setAuthToken(localStorage.token)
  axios
  .put(`/comment/add/dislike/reply/${reply_id}`,{dislikes:nb_likes,user:userid,comment:comment_id})
  .then((res) => {
    dispatch(getComment())
    dispatch(getCurrentUser())
 })
 .catch((err) => dispatch({
  type: GET_ERRORS,
  payload: err.response.data,
}));
  
};

//remove dislikereply
export const removedislikereply =(reply_id,nb_likes,userid,comment_id)=> (dispatch)=>{
  setAuthToken(localStorage.token)
  axios
  .put(`/comment/add/dislike/reply/remove/${reply_id}`,{dislikes:nb_likes,user:userid,comment:comment_id})
  .then((res) => {
    dispatch(getComment())
    dispatch(getCurrentUser())
 })
 .catch((err) => dispatch({
  type: GET_ERRORS,
  payload: err.response.data,
}));
  
};

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

    //report comment
    export const reportComment =(coment_id,nb_reports,userid)=> (dispatch)=>{
      setAuthToken(localStorage.token)
      axios
      .put(`/comment/add/report/${coment_id}`,{reports:nb_reports,user:userid})
      .then((res) => {
        dispatch(getComment())
        dispatch(getCurrentUser())
        dispatch({
          type: GET_ERRORS,
          payload: {reportcom:"done"},
        })
     })
     .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
      
    };

    //report reply
    export const reportReply =(reply_id,nb_reports,userid,comment_id)=> (dispatch)=>{
      setAuthToken(localStorage.token)
      axios
      .put(`/comment/add/reply/report/${reply_id}`,{reports:nb_reports,user:userid,comment:comment_id})
      .then((res) => {
        dispatch(getComment())
        dispatch(getCurrentUser())
        dispatch({
          type: GET_ERRORS,
          payload: {reportreply:"done"},
        })
     })
     .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));
      
    };