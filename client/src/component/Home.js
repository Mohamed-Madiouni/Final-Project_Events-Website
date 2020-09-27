import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../home.css";
import Searchevents from "./Searchevents";
import { getCurrentUser } from "../actions/authaction";
import { useDispatch,useSelector } from "react-redux";
import M from "materialize-css";
function Home() {
  const dispatch = useDispatch();
  const auth  = useSelector(state =>state.auth)
  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getCurrentUser());
    }
  }, [localStorage.token]);
  useEffect(() => {
    M.Parallax.init(document.querySelectorAll(".parallax"));
    M.Slider.init(document.querySelectorAll(".slider"), { height: 500 });
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
          <p
            className="grey-text text-darken-3 lighten-3"
            style={{
              lineHeight: "38px",
            }}
          >
            Welcome to the number 1 event website in the WORLD <br /> We
            consider our self as a family, and as a family we welcome you to be
            part of our universe.
            <br />
            <span className="black-text text-darken-3 lighten-3">
              You can check our last events here below.
            </span>
          </p>
          <h4>
            <b># BLACK LIVES MATTER</b>
          </h4>
        </div>
      </div>
      <div className="slider">
        <ul className="slides">
          <li>
            <img src="tiesto-concert.jpg" />
            <div
              className="caption left-align"
              style={{
                width: "50%",
              }}
            >
              <h3>Tiesto concert in Djerba</h3>
              <h5
                className="light white-text text-lighten-3"
                style={{
                  lineHeight: "38px",
                }}
              >
                What a night was yesterday in then most epic and exciting
                concert in Djerba,
                <br />
                Plus de 30.000 people was there !
              </h5>
            </div>
          </li>
          <li>
            <img src="bouchnak.jpg" />
            <div
              className="caption left-align"
              style={{
                width: "50%",
              }}
            >
              <h3>The maestro Lotfi Bouchnak </h3>
              <h5
                className="light gray-text text-lighten-3"
                style={{
                  lineHeight: "38px",
                }}
              >
                A beautiful night with magicical music that will rest in our
                mind generation after generation
              </h5>
            </div>
          </li>
          
        </ul>
      </div>
     
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
