import React from "react";
import { Button } from "./Button";
import "../AboutSection.css";

function AboutSection() {
  return (
    <div className="hero-container">
      <h1 className="title">COCO PARTY</h1>
      <p>
        Welcome to the number 1 event website in the WORLD <br /> We consider
        our self as a family, and as a family we welcome you to be part of our
        universe.
        <br />
        <span className=" black-text">
          You can check our last available events here below.
        </span>
      </p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
        {/* <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
      </div>
    </div>
  );
}

export default AboutSection;
