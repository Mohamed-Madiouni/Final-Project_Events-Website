import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { confirmPassword, updateUser } from "../actions/authaction";
import { GET_ERRORS } from "../actions/types";
import { getCurrentUser } from "../actions/authaction";
import M from "materialize-css";
import Navbar from "./Navbar";
import "../account.css"

function Updateacc({ history }) {
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    password: "",
    password2: "",
    tel: "",
    address: "",
    avatar: "",
    error: {},
  });
const [confirmationInput,setConfirmationInput] = useState({confirm:""})

const[mod,setMod]=useState(false)
  
  const[btn,setBtn]=useState(false)

  useEffect(() => {
    if (!localStorage.token) history.push("/login");
    M.Modal.init(document.querySelectorAll(".modal"));
    
    M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))
  });
  useEffect(() => {
    if (errors.msg){ 
      M.toast({ html: errors.msg, classes: "red" });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
      setBtn(false)
    }
    

    
   

  });
  useEffect(()=>{if(errors.success){
      onSubmit()
    }},[errors.success])
  useEffect(() => {
    if (localStorage.token) dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    if (errors) {
      setUser({ ...user, error: errors })
     setBtn(false) 
    };
  }, [errors]);

  const onChange = (e) => {
    if (e.target.id == "avatar")
      setUser({ ...user, [e.target.id]: e.target.files[0] });
    else setUser({ ...user, [e.target.id]: e.target.value });
  };
const onChangeConfirm=(e)=>{
  setConfirmationInput({...confirmationInput,[e.target.id]:e.target.value})
}
  const confirmation=()=>{
    setBtn(true)
dispatch(confirmPassword(confirmationInput))
  }
  const onSubmit = async () => {
    // e.preventDefault();
    await setBtn(true)
    const updateduser = {
      password: user.password,
      password2: user.password2,
      tel: user.tel,
      address: user.address,
      avatar: user.avatar,
    };

    const data = new FormData();
    data.append("file", updateduser.avatar);
    data.append("upload_preset", "events-website");
    data.append("cloud_name", "med");

    const send = await fetch(
      "https://api.cloudinary.com/v1_1/med/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const res = await send.json();
    updateduser.avatar &&
      res.error &&
      M.toast({ html: res.error.message, classes: "red" })&&setBtn(false)
    console.log(res);
    !res.error && (updateduser.avatar = res.url);
    console.log(updateduser);
    dispatch(updateUser(updateduser, history));
  };

  return (
    <>
    <Navbar/>
      <div className="container" style={{marginTop:"20px"}}>
        {/* <div
          className="row"
          style={{ display: "flex", justifyContent: "center", fontSize: 30 }}
        >
          <img src="coco2.png" alt="COCO PARTY" width="250px" />
          
        </div> */}

        <div className="row" style={{backgroundColor:"white",filter:mod&&"brightness(30%)"}}>
          <div className="col s8 offset-s2">
            {/* <Link
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
            </Link> */}
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>My account</b>
              </h4>
            </div>
            <form encType="multipart/form-data">
              <div className="input-field file-field col s12 ">
                <div className="btn-small" >
                  <span>File</span>
                  <input
                    type="file" accept=".JPEG, .JPG, .GIF, .PNG"
                    id="avatar"
                    name="avatar"
                    onChange={onChange}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    placeholder="Select image for your profile"
                    type="text"
                  />
                </div>
              </div>
              {auth.user.fname && (
                <div className="input-field col s12">
                  <input
                    disabled
                    value={auth.user.fname}
                    id="first_name"
                    type="text"
                  />
                  <label htmlFor="first_name" className="active green-text">
                    First Name
                  </label>
                </div>
              )}
              {auth.user.lname && (
                <div className="input-field col s12">
                  <input
                    disabled
                    value={auth.user.lname}
                    id="last_name"
                    type="text"
                  />
                  <label htmlFor="last_name" className="active green-text">
                    Last Name
                  </label>
                </div>
              )}
              {auth.user.email && (
                <div className="input-field col s12">
                  <input
                    disabled
                    value={auth.user.email}
                    id="email"
                    type="text"
                  />
                  <label htmlFor="email" className="active green-text">
                    Email
                  </label>
                </div>
              )}

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
                <span className={user.error.tel ? "red-text" : "green-text"}>
                  {user.error.tel ||
                    (auth.user.tel && "Your Number is " + auth.user.tel)}
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
                <span
                  className={user.error.address ? "red-text" : "green-text"}
                >
                  {user.error.address ||
                    (auth.user.address &&
                      "Your address is " + auth.user.address)}
                </span>
              </div>
              <div className="col s12" style={{ display:"flex",justifyContent:"center",alignItems:"center" }}>
                <button
                  style={{
                    width: "120px",
                    borderRadius: "5px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                    height: "40px",
                  }}
                  disabled={btn}
                  type="button"
                  className="btn "
                  // data-target="modal1"
                  onClick={()=>setMod(!mod)}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          {auth.user.avatar && (
            <div className="col s2" style={{transform: "translateY(10px)"}}>
              <img
                src={auth.user.avatar}
                alt="avatar"
                height="100%"
                width="100%"
                className="circle materialboxed"
                
                
              />
            </div>
          )}
        </div>
        <div  className="custom_mod" style={{display:mod?"initial":"none",padding:"5px"}}>
          <div className="modal-content">
            {/* <h4>Account Update</h4>
            <p>Are you sure you want to update your profile?</p> */}
            <h5>Please enter your password</h5>
           
              <div className="input-field col s12" style={{marginTop:"20px"}}>
                <input
                  onChange={onChangeConfirm}
                  value={confirmationInput.confirm}
                  id="confirm"
                  type="password"
                />
                <label htmlFor="confirm">Confirm password</label>
                
              </div>
              
          </div>
          <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:20}}>
            <a
              href="#!"
              className=" btn"
              onClick={()=>{
                confirmation()
              setMod(!mod)
              }
            }
            >
              Agree
            </a>
            <a
              href="#!"
              className="  btn"
              onClick={()=>setMod(!mod)}
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Updateacc;
