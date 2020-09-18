import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
  
const PrivateRoute = ({ component: Component,...rest }) => (
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
  
);

// const mapStateToProps = state => ({
//   auth: state.auth
// });
export default PrivateRoute
// export default connect(mapStateToProps)(PrivateRoute);