import {GET_EVENTS,GET_ALL_EVENTS, UPDATE } from "../actions/types"

const initState ={
    events:[],
    allEvents:[],
    participation:[],
    isLoading: true
}
export const reducer=(state=initState,action)=>{
    switch(action.type){
        case GET_EVENTS:
            return{...state,events:action.payload, isLoading: false}
            
                case GET_ALL_EVENTS:
                    return{...state,allEvents:action.payload, isLoading: false}
                    case UPDATE:
                        return{...state,participation:action.payload, isLoading: false}
                        case GET_COMMENT:
                            return{...state,comment:action.payload, isLoading: false}
                        default:return state
        }
}