import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/authaction";
import { GET_ERRORS } from "../actions/types";
import Navbar from "./Navbar";
import "../../node_modules/intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from 'intl-tel-input';
import "../tel.scss"
import M from "materialize-css";

function Register({ history }) {
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    password2: "",
    tel: "",
    address: "",
    role: "",
    error: {},
  });
  const [passtype,setpasstype]=useState("password")
  const [passvertype,setpassvertype]=useState("password")
  const form = useRef();

  useEffect(()=>{
    let input = document.querySelector("#tel");
  intlTelInput(input, {
         initialCountry: "tn",
         preferredCountries:["fr","us"],
         separateDialCode:true,
         utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
     });
   
 },[]) 

  useEffect(() => {
    if (localStorage.token) history.push("/dashboard");
    M.updateTextFields()
  });
  useEffect(()=>{
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  },[])
  useEffect(() => {
    if (errors) setUser({ ...user, error: errors });
  }, [errors]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let input = document.querySelector("#tel");
    let iti=intlTelInput(input, {
        initialCountry: "tn",
        preferredCountries:["fr","us"],
        separateDialCode:true,
        utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    const newUser = {
      fname: user.fname,
      lname: user.lname,
      email: user.email.toLowerCase(),
      password: user.password,
      password2: user.password2,
      tel: iti.getNumber(),
      address: user.address,
      role: form.current.elements.user.value,
    };
    //  console.log(newUser);
    dispatch(registerUser(newUser, history));
  };
  return (
<>
<Navbar/>
    <div className="container">
      
      <div className="row">
        <div className="col s4 m3 l2"
          style={{
           paddingLeft:0,
            position: "relative",
            top: "170px",
          }}
        >
          <form ref={form} value={user.role}>
            <p>
              <label>
                <input
                  name="user"
                  type="radio"
                  value="participant"
                  id="role"
                  defaultChecked
                />
                <span>Participant</span>
              </label>
            </p>
            <p>
              <label>
                <input name="user" type="radio" value="organizer" id="role" />
                <span>Organizer</span>
              </label>
            </p>
          </form>
        </div>
        <div
          className="col s8"
          style={{
            borderLeft: "1px solid grey",
            paddingLeft:0
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
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account?{" "}
              <Link
                to="/login"
                onClick={() =>
                  dispatch({
                    type: GET_ERRORS,
                    payload: {},
                  })
                }
              >
                Log in
              </Link>
            </p>
          </div>
          <form className="col s12" onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.fname}
                id="fname"
                type="text"
              />
              <label htmlFor="fname">First name</label>
              <span className={user.error.fname && "red-text"}>
                {user.error.fname}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.lname}
                id="lname"
                type="text"
              />
              <label htmlFor="lname">Last name</label>
              <span className={user.error.lname && "red-text"}>
                {user.error.lname}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span className={user.error.email && "red-text"}>
                {user.error.email}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password}
                id="password"
                type={passtype}
                style={{paddingRight: 25,
                 boxSizing: "border-box"}}
              />
              <label htmlFor="password">Password</label>
              <span className={user.error.password && "red-text"}>
                {user.error.password}
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
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password2}
                id="password2"
                type={passvertype}
               style={{paddingRight: 25,
                boxSizing: "border-box"}}
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className={user.error.password2 && "red-text"}>
                {user.error.password2}
              </span>
              <span onClick={()=>{
                if(passvertype=="password")
                setpassvertype("text")
                else
               setpassvertype("password")
              }}
              style={{position:"absolute",right:14,top:20,color: "gray"}}
              title={passvertype=="password"?"Show password":"Hide password"}
              > 
              {passvertype=="password"?<i className="far fa-eye"></i>
              :<i className="fas fa-eye-slash"></i>}</span>
             
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.tel}
                id="tel"
                type="tel"
              />
              <label htmlFor="tel" className="active">Enter your phone number</label>
              <div style={{marginTop: 8}}>
                <span className={user.error.tel && "red-text"}>
                {user.error.tel}
              </span>
              </div>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.address}
                id="address"
                type="text"
              />
              <label htmlFor="address">Enter your address</label>
              <span className={user.error.address && "red-text"}>
                {user.error.address}
              </span>
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
                className="btn  hoverable "
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;
