import { GET_USERS_ADMIN, GET_EVENTS_ADMIN } from "../actions/types";
const initialState = {
  events: [],
  users: [],
  isLoading: true
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_ADMIN:
      return {
        ...state,
        users: action.payload, isLoading: false}

    case GET_EVENTS_ADMIN:
      return {
        ...state,
        events: action.payload, isLoading: false}
      
    default:
      return state;
  }
}
