import {GET_LOADING} from "../actions/types"

const initState ={
    loading:true
}
export const loading=(state=initState,action)=>{
    switch(action.type){
         
                        case GET_LOADING:
                            return{loading:action.payload}
                      
    default:return state

        }
}