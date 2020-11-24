import {SET_CURRENT_USER,PROFIL_UPDATED,INI_UPDATE,GET_SANCTIONS, GET_ALERT, GET_BAN,LOADING,REGISTER} from "../actions/types";
const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    updated : false,
    sanctions:[],
    loading:true,
    register:false
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
              sanctions: action.payload}
              case LOADING:
                return {
                  ...state,
                  loading: action.payload}
                  case REGISTER:
                return {
                  ...state,
                  register: action.payload}
      default:
        return state;
    }
  }
