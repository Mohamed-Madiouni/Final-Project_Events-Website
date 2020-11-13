import {SET_CURRENT_USER,PROFIL_UPDATED,INI_UPDATE,GET_SANCTIONS} from "../actions/types";
const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    updated : false,
    sanctions:[]
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
            case GET_SANCTIONS:
              return {
                ...state,
                sanctions: action.payload, isLoading: false}
      default:
        return state;
    }
  }
