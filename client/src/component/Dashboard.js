import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authaction";
import jwt_decode from "jwt-decode";
import setAuthToken from "../token/authtoken";

function Dashboard({history}) {
  const [refresh,setRefresh]=useState(false)
 
    
    useEffect(()=>{
      if(!localStorage.token)
    history.push("/")
     
    })
  
    
   
  const onLogoutClick = (e) => {
     e.preventDefault();
    // Remove token from local storage
    localStorage.removeItem("token");
  // Remove auth header for future requests
  setAuthToken(false);
  // history.push("/")
 setRefresh(!refresh)
    
  };



  // props.logout();
  // const { user } = props.auth;
  return (
    <div>
      <div>
        <div>
          <h4>
            <b>Hey there,</b> {localStorage.token && jwt_decode(localStorage.getItem("token")).name}
          </h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
            }}
            onClick={onLogoutClick}
            className="btn btn-large"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });
// const mapDispatchToProps = (dispatch) => ({
//   logout: () => dispatch(logoutUser()),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default Dashboard
