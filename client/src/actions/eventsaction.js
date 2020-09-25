import axios from "axios";
import setAuthToken from "../token/authtoken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";


//Add event
export const addevent = (userData) => (dispatch) => {
    axios
      .post("", userData)
      .then((res) => {
        history.push("/login") // re-direct to login on successful register
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