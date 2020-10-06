import { SET_RESIZE,INI_RESIZE, } from "../actions/types";
const initialState = {
    state: false,
   
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RESIZE:
      return {
         state:true
      }
      case INI_RESIZE:
      return {
        state:false
      }
    default:
      return state;
  }
}