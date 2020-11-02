import {SHOW_MAP,ADD_PLACE,ADD_INP} from "../actions/types"

const initState ={
    show:false,
    selected:{},
    inp:{}
}
export const map=(state=initState,action)=>{
    switch(action.type){
         
                        case SHOW_MAP:
                            return{...state,show:action.payload}
                      case ADD_PLACE:
                      return{...state,selected:action.payload}
                      case ADD_INP:
                          return{...state,inp:action.payload}
    default:return state

        }
}