import React, { useEffect } from "react";
import { GET_ERRORS } from "../actions/types";
import { useDispatch } from "react-redux";
function Bannned_home() {
    const dispatch = useDispatch();
   
    useEffect(()=>{
        dispatch({
          type: GET_ERRORS,
          payload: {},
        });
      },[])

    return (
        <div>
            <h1>helooooo</h1>
        </div>
    )
}

export default Bannned_home
