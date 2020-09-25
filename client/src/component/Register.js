import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/authaction";
import { GET_ERRORS } from "../actions/types";

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

  const form = useRef();

  useEffect(() => {
    if (localStorage.token) history.push("/dashboard");
  });

  useEffect(() => {
    if (errors) setUser({ ...user, error: errors });
  }, [errors]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password,
      password2: user.password2,
      tel: user.tel,
      address: user.address,
      role: form.current.elements.user.value,
    };
    console.log(newUser);
    dispatch(registerUser(newUser, history));
  };
  return (
    <div className="container">
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center", fontSize: 30 }}
      >
        <img src="coco2.png" alt="COCO PARTY" width="250px" />
        {/* <span className="red-text">CoCo</span>{" "}
        <span className=" purple-text">PaRtY</span> */}
      </div>
      <div className="row">
        <div className="col s4 m3 l2"
          style={{
           paddingLeft:0,
            position: "relative",
            top: "170px",
          }}
        >
          <form ref={form}>
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
          className="col s8 m9 l10"
          style={{
            borderLeft: "1px solid grey",
            paddingLeft:0
          }}
        >
          <Link
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
          </Link>
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
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className={user.error.password && "red-text"}>
                {user.error.password}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password2}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className={user.error.password2 && "red-text"}>
                {user.error.password2}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.tel}
                id="tel"
                type="number"
              />
              <label htmlFor="tel">Enter yout phone number</label>
              <span className={user.error.tel && "red-text"}>
                {user.error.tel}
              </span>
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
                className="btn waves-effect waves-light hoverable "
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
