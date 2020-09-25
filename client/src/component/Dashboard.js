import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import jwt_decode from "jwt-decode";
import setAuthToken from "../token/authtoken";
import Navbar from "./Navbar";
import Searchevents from "./Searchevents";

function Dashboard({ history }) {
  const [search,setSearch] = useState(false)
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.token) history.push("/");
  });

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <div>
	<Navbar navsearch={setSearch}/>
      <div>
        <div>
          <h4>
            <b>Hey there,</b> {localStorage.token && auth.user.fname}
          </h4>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
            }}
            onClick={onLogoutClick}
            className="btn btn-large"
          >
            Logout
          </button>
        </div>
      </div>
	  { search&&(
      <div className="home_search">
          <Searchevents formsearch={setSearch}/>
      </div>)}
    </div>
  );
}

export default Dashboard;
