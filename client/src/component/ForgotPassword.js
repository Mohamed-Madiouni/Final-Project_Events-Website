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
            <form onSubmit={submitHandler}>
                <div>
                    <input
                        name="email"
                        placeholder="email"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                     </div>
                     <div>
                    <button>Get reset link</button>
                </div>
            </form>
        );
    }

    return (
        body
    );
};

export default ForgotPassword;