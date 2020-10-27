import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../home.css";
import { getCurrentUser } from "../actions/authaction";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";
import { closeEvent, getEvent, endEvent } from "../actions/evntAction";
import { useHistory } from "react-router-dom";
import { GET_ERRORS } from "../actions/types";
import Footer from "./Footer"
//import AboutSection from "./AboutSection";
function Home() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const allevents = useSelector((state) => state.events.allEvents);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getCurrentUser());
    }
  }, []);
  useEffect(()=>{
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    M.Modal.init(document.querySelectorAll(".modal"))
  },[])
  useEffect(() => {
    M.Parallax.init(document.querySelectorAll(".parallax"));
    M.Slider.init(document.querySelectorAll(".slider"), { height: 500 });
    
//     window.addEventListener("resize",()=>{
//       let w=document.querySelector(".App_center").style.width-document.querySelector(".parallax-container").style.width
// console.log(w)
//     })
  });
  

  //check if events ended
  useEffect(() => {
    dispatch(getEvent());
    for (let i = 0; i < allevents.length; i++) {
      if (
        new Date(eventClosing(allevents[i].date, allevents[i].duration)) <
        new Date()
      )
        dispatch(endEvent(allevents[i]._id));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="parallax-container">
      {allevents && (
        <div className="slider" >
          <ul className="slides">
            {allevents &&
              allevents
              .filter(el=>el.state=="Available")
                .slice(-6)
                .reverse()
                .map((el) => {
                  return (
                    <li key={el._id} >
                      <img src={el.image} style={{filter:"blur(1.5px)"}} width="100%" height="100%" />
                      <div
                        className="caption left-align"
                        style={{
                          width: "55%",
                          left: "5%",
                          //  background:"rgba(214, 211, 211,0.5)",
                          //  opacity:0.03
                          textShadow: "0 2px black",
                        }}
                      >
                        <h3>{el.title}</h3>
                        <h5
                          className="light white-text text-lighten-3"
                          style={{
                            lineHeight: "38px",
                          }}
                        >
                          {el.description}
                        </h5>
                        <button
                          className="btn-small grey lighten-5 black-text"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            opacity: 0.7,
                            borderRadius: 5,
                          }}
                          onClick={() => history.push("/events")}
                        >
                          Show all{" "}
                          <i className="material-icons" style={{ paddingLeft: 4 }}>
                            forward
                          </i>
                         </button>
                      </div>

                      {/* <span
                        className={
                          el.state == "Available"
                            ? " green-text"
                            : " gray-text text-darken-3"
                        }
                        style={{
                          position: "absolute",
                          right: "40px",
                          top: "30px",
                          fontSize: "30px",
                          textShadow: "0 2px black",
                        }}
                      >
                        {el.state}
                      </span> */}
                    </li>
                  );
                })}
          </ul>
        </div>
      )}
        {/* <div className="parallax">
          <img src="festival_home.jpg" alt="Home" className="responsive-img" />
        </div> */}
      </div>
      
      <div className="section white">
        <div className="row container">
          <h2 className="header">COCO PARTY</h2>
          <p
            className="grey-text text-darken-2 "
            style={{
              lineHeight: "38px",
            }}
          >
            Welcome to the number 1 event website in the WORLD <br /> We
            consider our self as a family, and as a family we welcome you to be
            part of our universe.
            <br />
            <span className=" black-text">
              You can check our last available events here below.
            </span>
          </p>
          <h4>
            <b># BLACK LIVES MATTER</b>
          </h4>
        </div>
      </div>
      
      <Footer/>
    </>
  );
}

export default Home;
