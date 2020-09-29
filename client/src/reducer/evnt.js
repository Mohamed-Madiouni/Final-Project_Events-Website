import {GET_EVENTS} from "../actions/types"

const initState ={
    events:[],
    isLoading: true
}
export const reducer=(state=initState,action)=>{
    switch(action.type){
        case GET_EVENTS:
            return{...state,events:action.payload, isLoading: false}
    default:return state
        }
}