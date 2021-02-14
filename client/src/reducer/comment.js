import { GET_COMMENT } from "../actions/types";

const initState = {
  comments: [],
};
export const comment = (state = initState, action) => {
  switch (action.type) {
    case GET_COMMENT:
      return { comments: action.payload };

    default:
      return state;
  }
};
