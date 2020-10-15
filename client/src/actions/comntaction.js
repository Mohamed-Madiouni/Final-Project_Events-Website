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
      dispatch(getComment())
      dispatch({
       type: GET_ERRORS,
       payload: {},
     })
      
   })
    
  };
  // get comment
  export const getComment = () => (dispatch) => {
    // setAuthToken(localStorage.token)
  
    axios
      .get("/comment")
      .then((res) => dispatch({ 
          type: GET_COMMENT, 
          payload: res.data 
      })
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
      .put(`/event/edit/${idComment}`, updatedComment)
      .then((res) => {
        dispatch(getComment ())
        dispatch({
         type: GET_ERRORS,
         payload: {success:"done"},
       })
        
     })
      .catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }));
  };
  //delete comment
  export const deleteComment = (idComment) => (dispatch) => {
    axios
      .delete(`/event/delete/${idComment}`)
      .then((res) => {
        dispatch(getComment ())
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
  
  