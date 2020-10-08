import {GET_ALL_MY_EVENTS} from "../actions/types"

const initState ={
    myevents:[],
   
}
export const myevents=(state=initState,action)=>{
    switch(action.type){
        case GET_ALL_MY_EVENTS:
            return{...state,myevents:action.payload}
    default:return state
        }
}