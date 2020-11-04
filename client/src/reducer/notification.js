import { GET_NOTIFICATIONS,SHOW_NOTIF } from "../actions/types";
const initState = {
  notifications: [],
  show:false
};
export const notifications=(state = initState, action) =>{
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
       ...state, notifications:action.payload}
        case SHOW_NOTIF:
          return{...state,show:action.payload}
    default:  return state;
  }
}