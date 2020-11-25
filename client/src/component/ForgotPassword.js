import React, { useState } from "react";
import axios from "axios";


const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        const body = {
            email,
        };
        axios({
            url: "/auth/forgot",
            data: body,
            method: "post",
        }).then(res => {
            setEmailSent(true);
        })
    }

    let body;
    if (emailSent) {
        body = (
            <span>An email with reset instructions is on its way</span>
        );
    } else {
        body = (
            <div >
                <div className="modal-header">
            <h5 className="modal-title center">Reset password</h5>
          </div>
            <div>
            <form onSubmit={submitHandler}>
                <div style={{width:"50%", marginLeft:"25%"}}>
                    <input
                        name="email"
                        placeholder="email"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                     </div>
                     <div>           
        <div className="modal-footer" style={{display:"flex", alignContent:"center", justifyContent:"center"}}>
        <button type="button" className="btn btn-danger" style={{margin:5}}>Get reset link</button>
        <button type="button" className="btn btn-danger modal-close"  style={{margin:5}}>Close</button></div></div> </form>
      </div></div>
        );
    }

    return (
        body
    );
};

export default ForgotPassword;