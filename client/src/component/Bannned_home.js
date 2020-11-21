import React, { useEffect } from "react";
import { GET_ERRORS } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import "../Bannned_home.css";
import eventClosing from "../outils/eventClosing";
import { useHistory } from "react-router-dom";
import { formatDuration } from "date-fns/esm";

function Bannned_home(props) {
  const dispatch = useDispatch();
  const history = useHistory()
  var bandata= props.location.userBan
  
  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }, []);

  return (
    <>
    {bandata===undefined ? history.push({pathname:"/"}):   
    
    <div className="ban">
      <div className="scene">
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <span className="bg-403">403</span>
        <div className="text">
          <span className="hero-text"></span>
          <span className="msg">
            Your <span>account</span> get baned.
            <p />Reson:{bandata.reason}
            <p />Duration:{bandata.duration==-1?" Permanent": " " + bandata.duration + " days"}
            <p />{bandata.duration!=-1 && "Until: "+(eventClosing(bandata.created_at,bandata.duration)).split('.')[0].replace("T"," ")}
          </span>
          <span className="support">
            <span>unexpected?</span>
            <a href="/contact">contact support</a>
          </span>
        </div>
        <div className="lock"></div>
      </div>
    </div>
   }
    </>
  );
}

export default Bannned_home;
