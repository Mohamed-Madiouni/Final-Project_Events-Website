import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

  
const PrivateRouteOrganizer = ({ component: Component,...rest }) => {

  return(
  <Route
    {...rest}
    render={props =>
      jwt_decode(localStorage.token).role === "organizer" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
  
  )};
export default PrivateRouteOrganizer