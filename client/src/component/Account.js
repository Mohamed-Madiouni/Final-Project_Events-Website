import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../actions/authaction";
import { GET_ERRORS } from "../actions/types";
import { getCurrentUser} from "../actions/authaction";
import setAuthToken from "../token/authtoken";

function Updateacc({ history }) {
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
 const auth = useSelector(state => state.auth)

  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
    tel: "",
    address: "",
    avatar: "",
    error: {},
  });

  const form = useRef();

  useEffect(() => {
    if (!localStorage.token) history.push("/");
  
    
  });
  useEffect(()=>{
    if (localStorage.token)
    
    dispatch(getCurrentUser())
    
  },[])

  useEffect(() => {
    if (errors) setUser({ ...user, error: errors });
  }, [errors]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      email: user.email,
      password: user.password,
      password2: user.password2,
      tel: user.tel,
      address: user.address,
      avatar: user.avatar,
    };
    console.log(updatedUser);
    dispatch(updateUser(updatedUser, history));
  };

  return (
    <div className="container">
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center", fontSize: 30 }}
      >
        <span className="red-text">CoCo</span>{" "}
        <span className=" purple-text">PaRtY</span>
      </div>
      <div className="row">
        <div className="col s8 offset-s2">
          <Link
            to="/dashboard"
            className="btn-flat waves-effect"
            onClick={() =>
              dispatch({
                type: GET_ERRORS,
                payload: {},
              })
            }
          >
            <i className="material-icons left">keyboard_backspace</i> Back to
            dashboard
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>My account</b>
            </h4>
          </div>
          <form onSubmit={onSubmit} encType="multipart/form-data">

          <div className="input-field col s12">
          <label htmlFor="avatar">New avatar</label><br></br>
          </div>
              <input
                onChange={onChange}
                value={user.avatar}
                id="avatar"
                type="file" 
                name="avatar" 
              />
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.email}
                id="email"
                type="email"
               
              />
              <label htmlFor="email">New Email</label>
              <span className={user.error.email ? "red-text":"green-text" }>
              {user.error.email||auth.user.email&&("Your email is "+auth.user.email)}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">New Password</label>
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
              <label htmlFor="password2">Confirm New Password</label>
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
              <span className={user.error.tel? "red-text":"green-text"}>
                {user.error.tel||auth.user.tel&&("Your Number is "+auth.user.tel)}
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
              <span className={user.error.address ? "red-text":"green-text"}>
              {user.error.address||auth.user.address&&("Your address is "+auth.user.address)}
              </span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large "
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updateacc;
