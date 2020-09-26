import axios from "axios";
import setAuthToken from "../token/authtoken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("user/register", userData)
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

// Update User
export const updateUser = (userData, history) => (dispatch) => {
  axios
    .put("user/update", userData)
    .then((res) => {
      history.push("/Dashboard") // re-direct to Dashboard on successful update
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

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/user/login", userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("token", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
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


// get logged in user
export const getCurrentUser = () =>(dispatch) => {
  setAuthToken(localStorage.token)
  axios
    .get("user")
    .then((res) => {
      dispatch(setCurrentUser(res.data)) 
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );

 
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
