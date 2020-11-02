import {SHOW_MAP} from "../actions/types"

const initState ={
    show:false
}
export const map=(state=initState,action)=>{
    switch(action.type){
         
                        case SHOW_MAP:
                            return{...state,show:action.payload}
                      
    default:return state

        }
}