import setAuthToken from "../token/authtoken";
import axios from "axios";
import {GET_ERRORS,GET_COMMENT} from "./types";
import { getUsers } from '../actions/adminaction';
import { getCurrentUser } from '../actions/authaction';


//chat

//add
export const sendnewmessage =(content,usersId)=> (dispatch)=>{
    setAuthToken(localStorage.token)
    console.log(content,usersId)
    axios
    .post('/chat/add/new',{content:content,users:usersId})
    .then((res) => {
      
      dispatch({
       type: GET_ERRORS,
       payload: {newmsg:"done"},
     })
    //   dispatch(getComment())
   })
   .catch((err) => dispatch({
    type: GET_ERRORS,
    payload: err.response.data,
  }));
    
  };