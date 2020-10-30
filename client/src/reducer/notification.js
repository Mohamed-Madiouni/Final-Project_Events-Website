import { GET_NOTIFICATIONS } from "../actions/types";
const initState = {
  notifications: [],
};
export const notifications=(state = initState, action) =>{
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        notifications:action.payload}
    default:  return state;
  }
}