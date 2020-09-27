import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../actions/authaction";
import { GET_ERRORS } from "../actions/types";
import { getCurrentUser } from "../actions/authaction";
import M from "materialize-css"


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

  const form = useRef();

  useEffect(() => {
    if (!localStorage.token) history.push("/");
    M.Modal.init(document.querySelectorAll('.modal'))
    
  });
  useEffect(()=>{
    if(errors.msg)
    M.toast({html: errors.msg,classes:"red"})
  },[errors.msg])
  useEffect(() => {
    if (localStorage.token) dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    if (errors) setUser({ ...user, error: errors });
  }, [errors]);

  const onChange = (e) => {
    if (e.target.id == "avatar")
      setUser({ ...user, [e.target.id]: e.target.files[0] });
    else setUser({ ...user, [e.target.id]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
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

    !res.error&&(updateduser.avatar = res.url);
    console.log(updateduser);
    dispatch(updateUser(updateduser, history));
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
          <form encType="multipart/form-data">
            <div className="input-field file-field col s12 ">
              <div className="btn">
                <span>File</span>
                <input
                  type="file"
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
                <label htmlFor="first_name" className="active">
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
                <label htmlFor="last_name" className="active">
                  Last Name
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
              <span className={user.error.address ? "red-text" : "green-text"}>
                {user.error.address ||
                  (auth.user.address && "Your address is " + auth.user.address)}
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
                type="button"
                className="btn btn-large modal-trigger"
                data-target="modal1"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="modal1" className="modal">
    <div className="modal-content">
      <h4>Account Update</h4>
      <p>Are you sure you want to update your profile?</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={onSubmit}>Agree</a>
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
    </div>
  </div>
    </div>
  );
}

export default Updateacc;
