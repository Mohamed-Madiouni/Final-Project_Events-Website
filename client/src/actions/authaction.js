import axios from "axios";
import setAuthToken from "../token/authtoken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  PROFIL_UPDATED,
  GET_ALL_MY_EVENTS,
  GET_SANCTIONS,
  LOADING,
  REGISTER,
} from "./types";
import { getUsers } from "./adminaction";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/user/register", userData)
    .then((res) => {
      history.push("/login"); // re-direct to login on successful register
      dispatch({
        type: REGISTER,
        payload: true,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// confirm password
export const confirmPassword = (pass) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .post("/user/confirmation", pass)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//active user
export const activeuser = (email, history) => (dispatch) => {
  axios
    .put("/user/activation", { email: email })
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      setTimeout(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
      }, 500);

      setTimeout(() => {
        history.push("/login");
      }, 3000);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//reactive
export const reactiveuser = (user) => (dispatch) => {
  axios
    .post("/user/reactivation", user)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Update User
export const updateUser = (userData, history) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .put("/user/update", userData)
    .then((res) => {
      history.push("/Dashboard"); // re-direct to Dashboard on successful update
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      dispatch({
        type: PROFIL_UPDATED,
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
      // dispatch(setCurrentUser(decoded));
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
export const getCurrentUser = () => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .get("/user")
    .then((res) => {
      dispatch(setCurrentUser(res.data));
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
  setAuthToken(localStorage.token);
  axios.put("/user/logout", { online: false }).then((res) => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  });
};

//show my event participation
export const getMyEvents = () => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .get("/user/all/events")
    .then((res) => {
      dispatch({
        type: GET_ALL_MY_EVENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// contact validation
export const contactUs = (data) => (dispatch) => {
  axios
    .post("/contact/contactus", data)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: { contact: "ok" },
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//add follower
export const addfollow = (idorganizer) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .put(`/user/add/follow/`, { follow: idorganizer })
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      });
      dispatch(getCurrentUser());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//unfollow
export const removefollow = (idorganizer) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .put(`/user/remove/follow/`, { follow: idorganizer })
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      });
      dispatch(getCurrentUser());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//get sanctions
export const getSanctions = () => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .get("/admin/sanctions")
    .then((res) =>
      dispatch({
        type: GET_SANCTIONS,
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

//block user
export const userBlock = (userId) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .put(`/user/add/block/`, { blocked: userId })
    .then((res) => {
      dispatch(getCurrentUser());
      dispatch(getUsers());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// unblock user
export const userunBlock = (userId) => (dispatch) => {
  setAuthToken(localStorage.token);
  axios
    .put(`/user/remove/block/`, { blocked: userId })
    .then((res) => {
      dispatch(getCurrentUser());
      dispatch(getUsers());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
