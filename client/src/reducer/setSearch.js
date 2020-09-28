import { SET_SEARCH,INI_SEARCH } from "../actions/types";
const initialState = {
    search : false,
    etat:false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return {
          ...state,
          search : action.payload
      }
      case INI_SEARCH:
      return {
        ...state,
        etat : action.payload
      }
    default:
      return state;
  }
}