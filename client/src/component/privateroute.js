import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";
  
const PrivateRoute = ({ component: Component,...rest }) => {
// const isAuthenticate = useSelector(state=>state.auth.isAuthenticated)
  return(
  <Route
    {...rest}
    render={props =>
       localStorage.token!= undefined ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
  
  )};
export default PrivateRoute
