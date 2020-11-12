import React, { useEffect, useRef, useState } from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/authaction";
import { GET_ERRORS } from "../actions/types";
import Navbar from "./Navbar";
import { logoutUser } from "../actions/authaction";

function Login({ history }) {
  const errors = useSelector((state) => state.errors);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userlog, setUserlog] = useState({
    email: "",
    password: "",
    error: {},
  });
  const [passtype,setpasstype]=useState("password")

  useEffect(() => {
    if (localStorage.token) history.push("/dashboard");
    if(errors.banned_banned)
    history.push("/banned")
  });

useEffect(()=>{
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
},[])

  useEffect(() => {
    if (errors) setUserlog({ ...userlog, error: errors });
  }, [errors]);

    useEffect(() => {
      if (auth.user.banned===true) {
          dispatch(logoutUser());
          history.push("/banned")
         }
    });

  const onChange = (e) => {
    setUserlog({ ...userlog, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    const userData = {
      email: userlog.email.toLowerCase(),
      password: userlog.password,
    };
    dispatch(loginUser(userData));
  };

  return (
    
    <>
    <Navbar/>
    <div className="container">
      
      <div style={{ marginTop: "4rem" }} className="row">
        <div
          className="col s8 offset-s2"
          style={{
            padding: "0px 30px",
          }}
        >
          {/* <Link
            to="/"
            className="btn-flat waves-effect"
            onClick={() =>
              dispatch({
                type: GET_ERRORS,
                payload: {},
              })
            }
          >
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link> */}
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account?{" "}
              <Link
                to="/register"
                onClick={() =>
                  dispatch({
                    type: GET_ERRORS,
                    payload: {},
                  })
                }
              >
                Register
              </Link>
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={userlog.email}
                id="email"
                type="email"
                autoFocus
              />
              <label htmlFor="email">Email</label>
              <span className={userlog.error.email && "red-text"}>
                {userlog.error.email}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={userlog.password}
                id="password"
                type={passtype}
               style={{paddingRight: 25,
                boxSizing: "border-box"}}
              />

              <label htmlFor="password">Password</label>
              <span className={userlog.error.password && "red-text"}>
                {userlog.error.password}
              </span>
              <span onClick={()=>{
                if(passtype=="password")
                setpasstype("text")
                else
               setpasstype("password")
              }}
              style={{position:"absolute",right:14,top:20,color: "gray"}}
              title={passtype=="password"?"Show password":"Hide password"}
              > 
              {passtype=="password"?<i className="far fa-eye"></i>
              :<i className="fas fa-eye-slash"></i>}</span>
             
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  height: "45px",
                }}
                type="submit"
                className="btn  hoverable"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
export default Login;
