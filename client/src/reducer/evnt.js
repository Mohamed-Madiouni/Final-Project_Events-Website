import {
  GET_EVENTS,
  GET_ALL_EVENTS,
  UPDATE,
  GET_COMMENT,
} from "../actions/types";

const initState = {
  events: [],
  allEvents: [],
  // participation:[],
  isLoading: true,
};
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: action.payload, isLoading: false };

    case GET_ALL_EVENTS:
      return { ...state, allEvents: action.payload, isLoading: false };

    default:
      return state;
  }
};
