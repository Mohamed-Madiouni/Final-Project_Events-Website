import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import get_month from "../outils/get_month"
import historyevent from "../outils/history"
import {closeEvent,getEventOrganizer, deleteEvent} from "../actions/evntAction";
import { getCurrentUser } from "../actions/authaction";
import AddEvent from "./AddEvent";
 import "../organizer.css";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";
import { Link } from "react-router-dom";

function Organizer_events({ history }) {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState({ type: "add", payload: {} });
  const [deleteid,setDeleteid]= useState("")
  const [closedid,setClosedid]= useState("")
  const toggle = () => setModal(!modal);
 
 
  useEffect(() => {
    if (localStorage.token) {
      dispatch(getCurrentUser());
    }
  },[]);
  useEffect(() => {
    dispatch(getEventOrganizer());
  }, []);
  useEffect(() => {
    if (!localStorage.token) history.push("/");
  });
  return (
      <>
    <div className="col s12">
        <Link
              to="/dashboard"
              className="btn-flat waves-effect"
              onClick={() =>
                dispatch({
                  type: GET_ERRORS,
                  payload: {},
                })
              }
            >
              <i className="material-icons left">keyboard_backspace</i> Back to
              dashboard
            </Link>
            </div>
      {events.events &&
        events.events.map((el) => {
          return (
            <div className="col s12 row"key={el._id} style={{minHeight:"350px"}}>
              <div className="col s12 m6" style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                <div
                  className="card small sticky-action"
                  style={{
                    width: 300,
                  }}
                >
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={el.image} />

                    <div className="date right">
                      <div className="day">{el.date.split("-")[2]}</div>
                      <div className="month">
                        {get_month(Number(el.date.split("-")[1]))}
                      </div>
                    </div>
                  </div>
                  <div
                    className="card-content "
                    style={{ padding: "0px 10px 0px 24px" }}
                  >
                    <span className="card-title  grey-text text-darken-4">
                      <b>{el.title}</b>
                    </span>
                    <p className="red-text">{el.address}</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          margin: 10,
                          marginLeft: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className=" tiny material-icons"
                          style={{ margin: 10, transform: "translateY(1.4px)" }}
                        >
                          history
                        </i>

                        {historyevent(el.created_at)}
                      </span>
                      <span
                        style={{
                          margin: 10,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className=" tiny material-icons"
                          style={{ margin: 10 }}
                        >
                          person
                        </i>

                        {el.nb_participant}
                      </span>
                    </div>
                  </div>
                  <div
                    className="card-action"
                    style={{
                      padding: "10px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <Link
                      to="/events"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      Plus de details
                      <i className="material-icons ">arrow_forward</i>
                    </Link> */}
                    <span
                      className={
                        el.state == "Available"
                          ? "right green-text"
                          : "right gray-text text-darken-3"
                      }
                    >
                      {" "}
                      {el.state}
                    </span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      <b>{el.title}</b>
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{el.description}</p>
                    <div
                      className="right"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {" "}
                      <a
                        className="btn-floating waves-effect waves-light cadetblue"
                        onClick={() => {
                          setAction({ type: "edit", payload: el });
                          toggle();
                        }}
                        title="edit"
                      >
                        <i className="material-icons ">edit</i>
                      </a>
                      <button
                        className="btn-floating waves-effect waves-light cadetblue modal-trigger"
                        title="delete"
                        data-target="modal1"
                        onClick={() => setDeleteid(el._id)}
                      >
                        <i className="material-icons ">delete</i>{" "}
                      </button>
                      <button
                        className="btn-floating waves-effect waves-light cadetblue modal-trigger"
                        title="close"
                        data-target="modal2"
                        onClick={() => setClosedid(el._id)}
                      >
                        <i className="material-icons ">block</i>{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s12 m6" style={{overflowY:"scroll",height:"350px"}}>
              <ul class="collection">
    <li class="collection-item avatar">
      <img src="images/yuna.jpg" alt="" class="circle"/>
      <span class="title">Title</span>
      <p>First Line <br/>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle">folder</i>
      <span class="title">Title</span>
      <p>First Line <br/>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle green">insert_chart</i>
      <span class="title">Title</span>
      <p>First Line <br/>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle red">play_arrow</i>
      <span class="title">Title</span>
      <p>First Line <br/>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle red">play_arrow</i>
      <span class="title">Title</span>
      <p>First Line <br/>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle red">play_arrow</i>
      <span class="title">Title</span>
      <p>First Line <br/>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
    <li class="collection-item avatar">
      <i class="material-icons circle red">play_arrow</i>
      <span class="title">Title</span>
      <p>First Line <br/>
         Second Line
      </p>
      <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
    </li>
  </ul>
            
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Organizer_events;
