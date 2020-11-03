import {SHOW_MAP,ADD_PLACE,ADD_INP,STATE_MAP,ADD_FOCUS} from "../actions/types"

const initState ={
    show:false,
    selected:{},
    inp:{},
    type:"",
    focus:{}
}
export const map=(state=initState,action)=>{
    switch(action.type){
         
                        case SHOW_MAP:
                            return{...state,show:action.payload}
                      case ADD_PLACE:
                      return{...state,selected:action.payload}
                      case ADD_INP:
                          return{...state,inp:action.payload}
                          case STATE_MAP:
                              return {...state,type:action.payload}
                              case ADD_FOCUS:
                                return{...state,focus:action.payload}
    default:return state

        }
}