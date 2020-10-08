import {GET_ALL_PARTICIPANT} from "../actions/types"

const initState ={
    participant:[],
   
}
export const part=(state=initState,action)=>{
    switch(action.type){
        case GET_ALL_PARTICIPANT:
            return{...state,participant:action.payload}
    default:return state
        }
}