import { SHOW_CHAT } from "../actions/types";
const initState = {
  show:false
};
export const chat=(state = initState, action) =>{
  switch (action.type) {
    case SHOW_CHAT:
      return {
       ...state, show:action.payload}
    default:  return state;
  }
}