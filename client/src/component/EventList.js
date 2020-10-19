import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent, getEvents, validateEvent, invalidateEvent} from "../actions/adminaction";
import { getCurrentUser } from "../actions/authaction";
import { useHistory } from "react-router-dom";
import get_month from "../outils/get_month";
import historyevent from "../outils/history";
import "../events.css";
import M from "materialize-css";
import eventClosing from "../outils/eventClosing";
import {endEvent, fullEvent, openEvent} from "../actions/evntAction";

const EventList = () => {
  const dispatch = useDispatch();
  const allevents = useSelector((state) => state.admin.events);
  let auth = useSelector((state) => state.auth);
  let allusers=useSelector(state=>state.admin.users)
  const history = useHistory();
  const [deleteid, setDeleteid] = useState("");
  const [validateid, setValidateid] = useState("");
  const [quickSearch, setQuickSearch] = useState({
    title: "",
    state: "",
    tags: "",
    address: "",
    description: "",
    id_organizer: "",
  });

  useEffect(() => {
    dispatch(getEvents());
    
    localStorage.token && dispatch(getCurrentUser());
  }, []);
  useEffect(() => {
    M.Slider.init(document.querySelectorAll(".slider"), {
      height: 40,
      indicators: false,
    });
    M.updateTextFields();
  });

//check if events full
useEffect(()=>{
  for(let i=0;i<allevents.length;i++){
    if( allevents[i].participant.length==allevents[i].nb_participant&&allevents[i].state!="Ended")
    dispatch(fullEvent(allevents[i]._id))
  }
},[]) 
//check if events ended
useEffect(()=>{
  for(let i=0;i<allevents.length;i++){
    if( new Date(eventClosing(allevents[i].date,allevents[i].duration))<new Date())
    dispatch(endEvent(allevents[i]._id))
  }
},[])
//open full events
useEffect(()=>{
  for(let i=0;i<allevents.length;i++){
    if( allevents[i].participant.length!=allevents[i].nb_participant&&allevents[i].state=="Full")
    dispatch(openEvent(allevents[i]._id))
  }
},[])


  let events = allevents.filter((el) => {
    return (
      el.title.toLowerCase().includes(quickSearch.title.toLowerCase()) &&
      el.state.toLowerCase().includes(quickSearch.state.toLowerCase()) &&
      el.address.toLowerCase().includes(quickSearch.address.toLowerCase()) &&
      el.description.toLowerCase().includes(quickSearch.description.toLowerCase()) &&
      // el.id_organizer.toLowerCase().includes(quickSearch.id_organizer.toLowerCase()) 
     (allusers.find(elm=>elm._id==el.id_organizer).fname.toLowerCase().includes(quickSearch.id_organizer.toLowerCase())||
      allusers.find(elm=>elm._id==el.id_organizer).lname.toLowerCase().includes(quickSearch.id_organizer.toLowerCase())||
      (allusers.find(elm=>elm._id==el.id_organizer).fname.toLowerCase() +' '+allusers.find(elm=>elm._id==el.id_organizer).lname.toLowerCase()).includes(quickSearch.id_organizer.toLowerCase())
      )
      
      &&
      (quickSearch.tags != ""
        ? el.tags.find((e) =>
            e.toLowerCase().includes(quickSearch.tags.toLowerCase())
          )
        : true)
    );
  });

  const onChange = (e) => {
    setQuickSearch({ ...quickSearch, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <div>
        <h5>
          <b>Manage Events</b>
        </h5>
      </div>

      <div
        className="col s8 offset-s2"
        style={{ marginTop: "20px", fontSize: 15, fontWeight: 800 }}
      >
        <form>
          <div className="input-field col s4 m5">
            <input
              placeholder="Event title search"
              id="title"
              type="text"
              value={quickSearch.title}
              onChange={onChange}
            />
            <label forhtml="title">Event title</label>
          </div>
          <div className="input-field col s4 m3">
            <select
              id="state"
              value={quickSearch.state}
              onChange={onChange}
              style={{
                display: "initial",
                marginTop: 4,
                borderRadius: 5,
                outline: "none",
              }}
            >
              <option value="">State</option>
              <option value="Available" className="green-text">
                Available
              </option>
              <option value="Closed" className="gray-text">
                Closed
              </option>
              <option value="Ended" className="gray-text">
                Ended
              </option>
            </select>
            <label className="active">Event state</label>
          </div>
          <div className="input-field col s4 m4">
            <input
              placeholder="Tags search"
              id="tags"
              type="text"
              value={quickSearch.tags}
              onChange={onChange}
            />
            <label forhtml="title">Event tags</label>
          </div>

          <div className="input-field col s4 m4">
            <input
              placeholder="Address search"
              id="address"
              type="text"
              value={quickSearch.address}
              onChange={onChange}
            />
            <label forhtml="address">Event address</label>
          </div>

          <div className="input-field col s4 m4">
            <input
              placeholder="Description search"
              id="description"
              type="text"
              value={quickSearch.description}
              onChange={onChange}
            />
            <label forhtml="description">Event description</label>
          </div>

          <div className="input-field col s4 m4">
            <input
              placeholder="Organizer search"
              id="id_organizer"
              type="text"
              value={quickSearch.id_organizer}
              onChange={onChange}
            />
            <label forhtml="id_organizer">Event organizer</label>
          </div>



        </form>
      </div>
      {(quickSearch.title != "" ||
        quickSearch.state != "" ||
        quickSearch.tags != "" ||
        quickSearch.address != "" ||
        quickSearch.description != "" ||
        quickSearch.id_organizer != "") && (
        <div className="row" style={{ marginLeft: 10 }}>
          {" "}
          <h5>
            {" "}
            <b>{events.length + " result(s) found"}</b>{" "}
          </h5>
        </div>
      )}
      <div className="row">
        {events &&
          events
            .slice(0)
            .reverse()
            .map((el) => {
              return (
                <div
                  className="col s12 m6 l4 xl3"
                  key={el._id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="card small sticky-action"
                    style={{
                      width: 335,
                      height: 490,
                      
                    }}
                    // key={el._id}
                  >
                    <div
                      className="card-image "
                      style={{ height: "55%", cursor: "pointer" }}
                    >
                      <img className="activator" src={el.image} height="100%" />

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
                          fontSize: 13,
                          width: "100%",
                        }}
                      >
                        <span
                          style={{
                            margin: 10,
                            marginLeft: 0,
                            marginRight: 0,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className=" tiny material-icons"
                            style={{ margin: 10, marginTop: 8 }}
                          >
                            history
                          </i>

                          {historyevent(el.created_at)}
                        </span>
                        <span
                          style={{
                            marginLeft: 110,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className=" tiny material-icons"
                            style={{ margin: 10, marginTop: 8 }}
                          >
                            person
                          </i>

                          {el.participant.length + "/" + el.nb_participant}
                        </span>
                      </div>
                    </div>

                    {el.tags.length != 0 && (
                      <span>
                        {el.tags.map((el, i) => (
                          <span key={i}>
                            {" "}
                            <span class="chip">{el}</span>{" "}
                          </span>
                        ))}
                      </span>
                    )}
                    <div
                      className="card-action"
                      style={{
                        padding: "10px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        style={{
                          width: "100px",
                          height: "40px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                        }}
                        type="button"
                        className="btn btn-medium modal-trigger"
                        data-target="modal1"
                        onClick={() => setDeleteid(el._id)}
                      >
                        Delete
                      </button>


                      {el.valid === false ? (
                      <button
                        style={{
                          width: "100px",
                          height: "40px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                        }}
                        type="button"
                        className="btn btn-medium modal-trigger"
                        data-target="modal2"
                        onClick={() => setValidateid(el._id)}
                      >
                        Validate
                      </button>
                      ) : (
                        <button
                        style={{
                          width: "100px",
                          height: "40px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                        }}
                        type="button"
                        className="btn btn-medium modal-trigger"
                        data-target="modal3"
                        onClick={() => setValidateid(el._id)}
                      >
                        Invalidate
                      </button>
                       )}



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
                      <p
                        style={{
                          display: "flex",
                          alignItems: "left",
                        }}
                      >
                        {el.description}
                      </p>
                    </div>
                    <div id="modal1" className="modal">
                      <div className="modal-content">
                        <h4>Event delete</h4>
                        <p>Are you sure you want to delete this event?</p>
                      </div>
                      <div className="modal-footer">
                        <a
                          href="#!"
                          className="modal-close waves-effect waves-green btn-flat"
                          onClick={() => dispatch(deleteEvent(deleteid))}
                        >
                          Agree
                        </a>
                        <a
                          href="#!"
                          className="modal-close waves-effect waves-green btn-flat"
                        >
                          Cancel
                        </a>
                      </div>
                    </div>


                    <div id="modal2" className="modal">
                      <div className="modal-content">
                        <h4>Event Validate</h4>
                        <p>Are you sure you want to validate this event?</p>
                      </div>
                      <div className="modal-footer">
                        <a
                          href="#!"
                          className="modal-close waves-effect waves-green btn-flat"
                          onClick={() => dispatch(validateEvent(validateid))}
                        >
                          Agree
                        </a>
                        <a
                          href="#!"
                          className="modal-close waves-effect waves-green btn-flat"
                        >
                          Cancel
                        </a>
                      </div>
                    </div>

                    <div id="modal3" className="modal">
                      <div className="modal-content">
                        <h4>Event invalidate</h4>
                        <p>Are you sure you want to invalidate this event?</p>
                      </div>
                      <div className="modal-footer">
                        <a
                          href="#!"
                          className="modal-close waves-effect waves-green btn-flat"
                          onClick={() => dispatch(invalidateEvent(validateid))}
                        >
                          Agree
                        </a>
                        <a
                          href="#!"
                          className="modal-close waves-effect waves-green btn-flat"
                        >
                          Cancel
                        </a>
                      </div>
                    </div>


                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
export default EventList;
