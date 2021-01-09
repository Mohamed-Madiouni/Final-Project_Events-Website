import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeuser, reactiveuser } from '../actions/authaction';
import jwt_decode from "jwt-decode";
import { Link, useHistory } from 'react-router-dom';
import { GET_ERRORS } from '../actions/types';
import M from "materialize-css";
let url = require('url');
let querystring = require('querystring');

function Activation() {
    const errors=useSelector(state=>state.errors)
    let params = querystring.parse(url.parse(window.location.href).query);
    const dispatch=useDispatch()
    let auth=useSelector(state=>state.auth)
    let history=useHistory()
    useEffect(()=>{
        if( new Date((jwt_decode(params.token).exp)*1000)>new Date())
        {
            params&&dispatch(activeuser(jwt_decode(params.token).email,history))}
    },[])
    const [btn,setBtn] = useState(false)
useEffect(()=>{
    if(errors.reactive)
    {
        M.toast({ html: "A new validation link has been send to you", classes: "green",displayLength:5000 })
        dispatch({
            type: GET_ERRORS,
            payload: {},
          });
          setTimeout(()=>{
history.push("/login")
          },3000)
    }
})
    return (
        <div>
            
           {( new Date((jwt_decode(params.token).exp)*1000)>new Date())&&(auth.loading? "Please wait...":"Redirecting to...")}
    <h3>{new Date((jwt_decode(params.token).exp)*1000)<=new Date()&&"Your activation link has been expired"}</h3>
    {new Date((jwt_decode(params.token).exp)*1000)<=new Date()&&<button onClick={()=>{dispatch(reactiveuser(jwt_decode(params.token)));setBtn(true)}} style={{background:"transparent",outline:"none",border:"none",cursor:"pointer"}} disabled={btn}>{">>"}Click to get a new activation link{"<<"}</button>}
        </div>
    )
}

export default Activation
