import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { confirmPassword, updateUser } from "../actions/authaction";
import { GET_ERRORS } from "../actions/types";
import { getCurrentUser } from "../actions/authaction";
import M from "materialize-css";
import Navbar from "./Navbar";
import "../account.css"
import resize from "../outils/resize";
import { logoutUser } from "../actions/authaction";
import Footer from "./Footer";
import "../../node_modules/intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from 'intl-tel-input';
import "../tel.scss"
import eventClosing from "../outils/eventClosing";


function Updateacc({ history }) {
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const sanctions = useSelector((state) => state.auth.sanctions);
  const [user, setUser] = useState({
    password: "",
    password2: "",
    tel: "",
    address: "",
    avatar: "",
    note: "",
    error: {},
  });
const [confirmationInput,setConfirmationInput] = useState({confirm:""})
const [passtype,setpasstype]=useState("password")
  const [passvertype,setpassvertype]=useState("password")
  const [passcontype,setpasscontype]=useState("password")
const[mod,setMod]=useState(false)
  
  const[btn,setBtn]=useState(false)

  let usermail=auth.user.email
  var useralert= (sanctions.filter(el => el.email==usermail && el.type=="alert")).pop()
  var userban= (sanctions.filter(el => el.email==usermail && el.type=="ban")).pop()

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
    if (!localStorage.token) history.push("/login");
    
    
    M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    // M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))
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

    useEffect(() => {
      if (userban && (userban.canceled==false) && (new Date(eventClosing(userban.created_at,userban.duration))>new Date()))
         {
          dispatch(logoutUser());
          history.push("/banned")
         }
    });

  useEffect(()=>{if(errors.success){
      onSubmit()
    }},[errors.success])
  useEffect(() => {
    if (localStorage.token) dispatch(getCurrentUser());
    M.Modal.init(document.querySelectorAll(".modal"));
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
setConfirmationInput({confirm:""})
  }
  const onSubmit = async () => {
    // e.preventDefault();
    setBtn(true)
    let input = document.querySelector("#tel");
    let iti=intlTelInput(input, {
        initialCountry: "tn",
        preferredCountries:["fr","us"],
        separateDialCode:true,
        utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    const updateduser = {
      password: user.password,
      password2: user.password2,
      tel: iti.getNumber(),
      address: user.address,
      avatar: user.avatar,
      note: user.note,
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
    if(updateduser.avatar &&res.error)
    {
      M.toast({ html: res.error.message, classes: "red" })
      setBtn(false)
    }
    
      
    // console.log(res);
    !res.error && (updateduser.avatar = resize(res.url));
    console.log(updateduser);
    dispatch(updateUser(updateduser, history));
  };

  return (
    <>
    <Navbar/>
      <div className="container" style={{marginTop:"20px"}} onClick={(e)=>{
          if(e.target!=document.querySelectorAll(".custom_mod")&&mod)
        {
          setMod(!mod)
        btn&&setBtn(false)
        }
        }}>
        {/* <div
          className="row"
          style={{ display: "flex", justifyContent: "center", fontSize: 30 }}
        >
          <img src="coco2.png" alt="COCO PARTY" width="250px" />
          
        </div> */}

        <div className="row" style={{backgroundColor:"white",filter:mod&&"brightness(30%)"}}>
          <div className="col s8 m7 offset-m2">
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
                  type={passtype}
                  style={{paddingRight: 25,
                   boxSizing: "border-box"}}
                />
                <label htmlFor="password">New Password</label>
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
                <label htmlFor="password2">Confirm New Password</label>
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
                <span className={user.error.tel ? "red-text" : "green-text"}>
                  {user.error.tel ||
                    (auth.user.tel && "Your Number is: " + auth.user.tel)}
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
                <span
                  className={user.error.address ? "red-text" : "green-text"}
                >
                  {user.error.address ||
                    (auth.user.address &&
                      "Your address is: " + auth.user.address)}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={user.note}
                  id="note"
                  type="text"
                />
                <label htmlFor="note">Enter a note to be displayed for other users</label>
                <span
                  className={user.error.note ? "red-text" : "green-text"}
                >
                  {user.error.note ||
                    (auth.user.note &&
                      "Your note is: " + auth.user.note)}
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
                  onClick={()=>{
                    setMod(!mod)
                  setBtn(true)
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          {auth.user.avatar && (
            <div className="col s4 m3 photo" style={{transform: "translateY(10px)",disply:"grid",placeItems:"center"}}>
              <img
                src={auth.user.avatar}
                alt="avatar"
                height="100px"
                width="100px"
                className="circle materialboxed"
                
                
              />
            </div>
          )}
        </div>
        
      </div>
      <div  className="custom_mod" style={{display:mod?"initial":"none",padding:"10px"}}>
          <div className="modal-content">
            {/* <h4>Account Update</h4>
            <p>Are you sure you want to update your profile?</p> */}
            <h5>Please enter your password</h5>
           
              <div className="input-field col s12" style={{marginTop:"20px"}}>
                <input
                  onChange={onChangeConfirm}
                  value={confirmationInput.confirm}
                  id="confirm"
                  type={passcontype}
                  style={{paddingRight: 25,
                   boxSizing: "border-box"}}
                />
                <label htmlFor="confirm">Confirm password</label>
                <span onClick={()=>{
                if(passcontype=="password")
                setpasscontype("text")
                else
               setpasscontype("password")
              }}
              style={{position:"absolute",right:14,top:20,color: "gray"}}
              title={passcontype=="password"?"Show password":"Hide password"}
              > 
              {passcontype=="password"?<i className="far fa-eye"></i>
              :<i className="fas fa-eye-slash"></i>}</span>
              </div>
              
          </div>
          <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:20}}>
            <a
              href="#!"
              className=" btn"
              onClick={()=>{
                confirmation()
              setMod(!mod)
              setpasscontype("password")
              }
            }
            >
              Agree
            </a>
            <a
              href="#!"
              className="  btn"
              onClick={()=>{
                setMod(!mod)
              setBtn(false)
              setpasscontype("password")
              }}
            >
              Cancel
            </a>
          </div>
        </div>
        <Footer/>
    </>
  );
}

export default Updateacc;
