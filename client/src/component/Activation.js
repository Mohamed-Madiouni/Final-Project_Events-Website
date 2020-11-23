import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeuser } from '../actions/authaction';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
let url = require('url');
let querystring = require('querystring');

function Activation() {
    let params = querystring.parse(url.parse(window.location.href).query);
    const dispatch=useDispatch()
    let auth=useSelector(state=>state.auth)
    let history=useHistory()
    useEffect(()=>{
        params&&dispatch(activeuser(jwt_decode(params.token).email,history))
    },[])

    return (
        <div>
           {auth.loading? "Please wait...":"Redirecting to..."}
        </div>
    )
}

export default Activation
