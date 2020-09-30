import {GET_USERS, GET_EVENTS} from "../actions/types";
  const initialState = {
    users: {},
    events: {}
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_USERS:
        return {
         users:action.payload
        };
      case GET_EVENTS:
        return {
          events:action.payload
        };
      default:
        return state;
    }
  }