import { SHOW_CHAT,SHOW_TALK } from "../actions/types";
const initState = {
  show:false,
  talk:{
      show:false
  }
};
export const chat=(state = initState, action) =>{
  switch (action.type) {
    case SHOW_CHAT:
      return {
       ...state, show:action.payload}
       case SHOW_TALK:
        return {
         ...state,talk:{...state.talk,show:action.payload}}
    default:  return state;
  }
}