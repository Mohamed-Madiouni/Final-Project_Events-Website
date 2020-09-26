import React, {useEffect,useState } from "react";
import Navbar from "./Navbar";
import "../home.css";
import Searchevents from "./Searchevents";
import { getCurrentUser } from "../actions/authaction";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch=useDispatch()
  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getCurrentUser());
    }
  }, [localStorage.token]);

  return (
    <>
      <Navbar navsearch={setSearch} />
      <div
        style={{
          position: "relative",
          height: "500px",
          width: "100%",
          filter: search && "blur(8px)",
          marginTop: 10,
        }}
      >
        <img src="festival_home.jpg" alt="Home" width="100%" height="100%"/>
        <div className="home_app">
          <h2>COCO PARTY</h2>
          <p
            style={{
              fontSize: "20px",
            }}
          >
            Welcome to the number 1 event website in the WORLD
          </p>
        </div>
      </div>
      {search && (
        <div className="home_search">
          <Searchevents formsearch={setSearch} />
        </div>
      )}
    </>
  );
}

export default Home;
