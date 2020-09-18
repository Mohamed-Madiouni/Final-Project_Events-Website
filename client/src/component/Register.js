import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authaction";
import axios from "axios"


function Register({history}) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tel:"",
    address:"",
    errors: {}
  });

  useEffect(()=>{
    if(localStorage.token)
    history.push("/dashboard")
  })

 
  // useEffect(() => {
  //   setUser({ ...user, errors: props.errors });
  // }, [props.errors]);
  // useEffect(() => {
  //   if (props.auth.isAuthenticated) {
  //     props.history.push("/dashboard");
  //   }
  // }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      password2: user.password2,
      tel:user.tel,
      address:user.address
    };
    console.log(newUser);
    axios
    .post("user/register", newUser)
    .then(res => {
      setUser({...user,...res.data})
      console.log(user)
      history.push("/login") // re-direct to login on successful register
    }) 
    .catch(err =>{
        setUser({...user,errors:err.response.data})
          console.log("err",err.response)
        })
      
     
    // props.register(newUser, props.history);
  };
 
  return (
    <div className="container">
      <div className="row" style={{display:"flex",justifyContent:"center", fontSize:30}}>
      <span className="red-text">CoCo</span>{" "}
            <span className=" purple-text">PaRtY</span>
      </div>
    <div className="row">
      <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Back to
              home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.name}
                error={user.errors.name}
                id="name"
                type="text"
              />
              <label htmlFor="name">Name</label>
              <span className={user.errors.name && "red-text"}>{user.errors.name}</span>
            </div>
            <div  className="input-field col s12">
              <input
                onChange={onChange}
                value={user.email}
                error={user.errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
              <span className={user.errors.email && "red-text"}>{user.errors.email}</span>
            </div>
            <div  className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password}
                error={user.errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
              <span className={user.errors.password && "red-text"}>
                {user.errors.password}
              </span>
            </div>
            <div  className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password2}
                error={user.errors.password2}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
              <span className={user.errors.password2 && "red-text"}>
                {user.errors.password2}
              </span>
            </div>
            <div  className="input-field col s12">
              <input
                onChange={onChange}
                value={user.tel}
                error={user.errors.tel}
                id="tel"
                type="number"
              />
              <label htmlFor="tel">Enter yout phone number</label>
              <span className={user.errors.tel && "red-text"}>
                {user.errors.tel}
              </span>
            </div>
            <div  className="input-field col s12">
              <input
                onChange={onChange}
                value={user.address}
                error={user.errors.address}
                id="address"
                type="text"
              />
              <label htmlFor="address">Enter your address</label>
              <span className={user.errors.address && "red-text"}>
                {user.errors.address}
              </span>
            </div>
            <div  className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large "
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
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });
// const mapDispatchToProps = (dispatch) => ({
//   register: (a, b) => dispatch(registerUser(a, b)),
// });
export default Register
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(Register));
