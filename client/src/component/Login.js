import React, { useEffect, useState } from "react";
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/authaction";
import setAuthToken from "../token/authtoken";
import axios from "axios"

function Login({history}) {
  const [userlog, setUserlog] = useState({
    email: "",
    password: "",
    errors: {},
  });

  // const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  useEffect(()=>{
    if(localStorage.token)
   history.push("/dashboard")
  
  })
  
  // useEffect(() => {
  //   setUserlog({ ...userlog, errors: props.errors });
  // }, [props.errors]);

  // useEffect(()=>{
  //   props.history.push("/dashboard")
  // },[props.auth.isAuthenticated])
  // useEffect(() => {
  //   if (props.auth.isAuthenticated) {
  //     props.history.push("/dashboard");
  //   }
  // });

  const onChange = (e) => {
    setUserlog({ ...userlog, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: userlog.email,
      password: userlog.password,
    };
    console.log(userData);
    axios
    .post("/user/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("token", token);
      // Set token to Auth header
      setAuthToken(token);
      history.push("/dashboard")
      
    })
    .catch(err =>{
      setUserlog({...userlog,errors:err.response.data})
          console.log("err",err.response)
        }   
    );
    // setRedirectToReferrer(!redirectToReferrer);
    
  };
  const { errors } = userlog;
// props.login(userData);
  return (
    <div className="container">
      <div className="row" style={{display:"flex",justifyContent:"center", fontSize:30}}>
      <span className="red-text">CoCo</span>{" "}
            <span className=" purple-text">PaRtY</span>
      </div>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect"><i className="material-icons left">keyboard_backspace</i> Back to
              home</Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={userlog.email}
                error={errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span className={(errors.email || errors.OOPS) && "red-text"}>
                {errors.email}
                {errors.OOPS}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={userlog.password}
                error={errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className={(errors.password || errors.ERROR) && "red-text"}>
                {errors.password}
                {errors.ERROR}
              </span>
            </div>
            <div>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });
// const mapDispatchToProps = (dispatch) => ({
//   login: (a) => dispatch(loginUser(a)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
