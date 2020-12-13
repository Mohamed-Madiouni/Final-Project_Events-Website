import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../home.css";
import { getCurrentUser } from "../actions/authaction";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";
import { closeEvent, getEvent, endEvent } from "../actions/evntAction";
import { Link, useHistory } from "react-router-dom";
import { GET_ERRORS } from "../actions/types";
import ReactReadMoreReadLess from "react-read-more-read-less";
import "../bootstrap.scss"
// import"../bootstrap-theme.min.css"
// import "../light-box.css"
import Footer from "./Footer"
// import ContactModel from "./ContactModel"
//import AboutSection from "./AboutSection";
import { logoutUser } from "../actions/authaction";




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

    // M.Slider.init(document.querySelectorAll(".slider"), { height: 500 });


    
//     window.addEventListener("resize",()=>{
//       let w=document.querySelector(".App_center").style.width-document.querySelector(".parallax-container").style.width
// console.log(w)
//     })
  });
  
  // useEffect(()=>{
  //   M.Slider.init(document.querySelectorAll(".slider"), { height: 500 });
  // },[])

  //check if events ended
  useEffect(() => {
    dispatch(getEvent());
    for (let i = 0; i < allevents.length; i++) {
      if (
         new Date(allevents[i].end)<new Date()
      )
        dispatch(endEvent(allevents[i]._id));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="use-bootstrap">
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
                      
                      <img src={el.image} style={{filter:"blur(0.5px)",backgroundPosition: "bottom"}} width="100%" height="100%" />
                      <div
                        className="caption left-align"
                        style={{
                      
                          left: "10%",
                          position:"absolute",
                          //  background:"rgba(214, 211, 211,0.5)",
                          //  opacity:0.03
                          textShadow: "0 2px black",
                        }}
                      >
                        <h3>{el.title}</h3>
                        <p   style={{
                            lineHeight: "38px",
                            paddingRight:"50%",
                            textAlign:"left",

                          }}>
                        <ReactReadMoreReadLess
                          className="light white-text text-lighten-3"
                        
                           charLimit={200}
                           ellipsis={"..."}
                           readMoreText={"Read more ▼"}
                           readLessText={"Read less ▲"}
                           readMoreStyle={{whiteSpace: "nowrap", textDecoration: "none",fontSize:20,borderBottom:"1px solid white", cursor:"pointer"}}
                           readLessStyle={{whiteSpace: "nowrap", textDecoration: "none",fontSize:20,borderBottom:"1px solid white",cursor:"pointer"}}
                        >
                          {el.description}
                        </ReactReadMoreReadLess></p>
                        <button
                          className="btn-small grey lighten-5 black-text"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            opacity: 0.7,
                            
                            borderRadius: 5,
                            marginTop: 20
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
      <div className="more-about-us">
        <div className="container" style={{minHeight: "100vh"}}>
            <div className="col-md-5 col-md-offset-8">
                <div className="content">
                <h2 className="header">COCO Event</h2>
                    <span className="span-home"># BLACK LIVES MATTER</span>
                    <p className="p-home">Welcome to the number 1 event website in the WORLD <br /> We
            consider our self as a family, and as a family we welcome you to be
            part of our universe. 
                    <br/></p>
                    <div className="simple-btn">
                        <Link className="a-home" to="/events" style={{textDecoration: "none",color: "#fff"

}}>You can check our last available events here {"->"}
</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </div>
      
      
      {/* <ContactModel/> */}
    </>
  );
}

export default Home;
