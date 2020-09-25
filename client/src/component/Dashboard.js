import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authaction";
import jwt_decode from "jwt-decode";
import setAuthToken from "../token/authtoken";

import Navbar from "./Navbar";
import Searchevents from "./Searchevents";

import Organizer from "./Organizer";
import M from "materialize-css"




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

        <Organizer/>
       
      </div>
	  { search&&(
      <div className="home_search">
          <Searchevents formsearch={setSearch}/>
      </div>)}
    </div>
  );
}

export default Dashboard;
