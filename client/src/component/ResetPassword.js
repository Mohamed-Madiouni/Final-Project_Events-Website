import React, { useState } from "react";
import axios from "axios";


const ResetPassword = (props) => {

    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        const body = {
            password,
            id: props.match.params.id
        };
        axios({
            url: "/auth/reset",
            data: body,
            method: "patch"
        }).then(() => {
            props.history.push("/login");
        })
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="New Password"
                />
            </div>
            <div>
                <button>Save</button>
            </div>
        </form>
    );
};

export default ResetPassword;

