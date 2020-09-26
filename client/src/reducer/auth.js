import {SET_CURRENT_USER,PROFIL_UPDATED,INI_UPDATE} from "../actions/types";
const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    updated : false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload) ? true:false,
          user: action.payload
        };
        case PROFIL_UPDATED:
          return{
            ...state,
          updated:true
          }
          case INI_UPDATE:
            return{
              ...state,
              updated:false
            }
      default:
        return state;
    }
  }