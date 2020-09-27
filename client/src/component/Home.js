import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../home.css";
import Searchevents from "./Searchevents";
import { getCurrentUser } from "../actions/authaction";
import { useDispatch } from "react-redux";
import M from "materialize-css";
function Home() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getCurrentUser());
    }
  }, [localStorage.token]);
  useEffect(() => {
    M.Parallax.init(document.querySelectorAll(".parallax"));
  });

  return (
    <>
      <Navbar navsearch={setSearch} />
      <div className="parallax-container">
        <div className="parallax">
          <img src="festival_home.jpg" alt="Home" className="responsive-img" />
        </div>
      </div>
      <div className="section white">
        <div className="row container">
          <h2 className="header">COCO PARTY</h2>
          <p className="grey-text text-darken-3 lighten-3" style={{
            lineHeight:"38px"
          }}>
            Welcome to the number 1 event website in the WORLD <br /> We
            consider our self as a family, and as a family we welcome you to be
            part of our universe.
            <br />
            <span className="black-text text-darken-3 lighten-3">You can check our last events here below.</span> 
          </p>
          <h4>
            <b># BLACK LIVES MATTER</b>
          </h4>
        </div>
      </div>
      {/* <div class="parallax-container">
      <div class="parallax"><img src="festival_home.jpg"/></div>
    </div> */}

      {/* <div
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
      </div> */}
      {search && (
        <div className="home_search">
          <Searchevents formsearch={setSearch} />
        </div>
      )}
    </>
  );
}

export default Home;
