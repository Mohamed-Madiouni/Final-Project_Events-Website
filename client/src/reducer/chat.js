import { SHOW_CHAT,SHOW_TALK,ADD_TALK,GET_CHAT } from "../actions/types";
const initState = {
  show:false,
  talk:{
      show:false,
      value:{}
  },
  discussion:[]
};
export const chat=(state = initState, action) =>{
  switch (action.type) {
    case SHOW_CHAT:
      return {
       ...state, show:action.payload}
       case SHOW_TALK:
        return {
         ...state,talk:{...state.talk,show:action.payload}}
         case ADD_TALK:
          return {
           ...state,talk:{...state.talk,value:action.payload}}
           case GET_CHAT:
            return {
             ...state,discussion:action.payload}
    default:  return state;
  }
}