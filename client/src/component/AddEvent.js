import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addEvent, editEvent } from "../actions/evntAction";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";


const AddEvent = ({ toggle,action,setAction }) => {

const dispatch = useDispatch()
const errors = useSelector((state) => state.errors);
const auth = useSelector((state)=>state.auth)

  const [events, setEvents] = useState({
    title: action.type=="add"?"":action.payload.title,
    address:action.type=="add"?"":action.payload.address ,
    description:action.type=="add"?"":action.payload.description ,
    date: action.type=="add"?"":action.payload.date,
    duration: action.type=="add"?"":action.payload.duration,
    nb_participant:action.type=="add"?"":action.payload.nb_participant ,
    image: action.type=="add"?"":action.payload.image,
    error: {},
  });

  useEffect(() => {
    
     if (errors.msg){ 
      M.toast({ html: "Please insert all field", classes: "red" });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    }
    if(errors.success){
    toggle()
    return ()=>{ dispatch({
      type: GET_ERRORS,
      payload: {},
    })}}
    
  });

  const onChange = (e) => {
    if (e.target.id == "image")
      setEvents({ ...events, [e.target.id]: e.target.files[0] });
    else setEvents({ ...events, [e.target.id]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      title: events.title,
      address: events.address,
      description: events.description,
      date: events.date,
      duration: events.duration,
      nb_participant: events.nb_participant,
      image: events.image,
    };
    console.log(newEvent);

    const data = new FormData();
    data.append("file", newEvent.image);
    data.append("upload_preset", "events-website");
    data.append("cloud_name", "med");

    const send = await fetch(
      "https://api.cloudinary.com/v1_1/med/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const res = await send.json();
    console.log(res)
    // newEvent.image &&
      res.error &&
      M.toast({ html: "Please insert a valid image", classes: "red" });
      !res.error && (newEvent.image = res.url);
      console.log(newEvent);
   if(action.type=="add")
   
   !res.error&&dispatch(addEvent({...newEvent,id_organizer:auth.user._id}));
      else{
        !res.error &&dispatch(editEvent(action.payload._id,newEvent))
      setAction({type:"add",payload:{}})
      }
      console.log(events);
      
   
  };

  return (
    <div className="col s12">
      <div className="col s10 ">
        <div className="row">
          <div
            className="col s12 row"
            style={{
              textAlign: "center",
            }}
          >
            <b>
              <span
                style={{
                  width: "100%",
                  color: "cadetblue",
                }}
              >
                {" "}
                Please enter the event information
              </span>
            </b>
          </div>
          <form className="col s12" onSubmit={onSubmit}>
            <div className="input-field col s12 m6">
              <input
                onChange={onChange}
                value={events.title}
                id="title"
                type="text"
              />
              <label htmlFor="title" className="active">Title</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                onChange={onChange}
                value={events.address}
                id="address"
                type="text"
              />
              <label htmlFor="address" className="active">Event address</label>
            </div>
            <div className="input-field col s12">
              <textarea
                id="description"
                className="materialize-textarea"
                value={events.description}
                onChange={onChange}
              ></textarea>

              <label htmlFor="description" className="active">Event description</label>
            </div>
            <div className="input-field col s12 l6">
              <input
                onChange={onChange}
                value={events.date}
                id="date"
                type="date"
              />
              <label htmlFor="date" className="active">Event date</label>
            </div>

            <div className="input-field file-field col s12 l6 ">
              <div className="btn">
                <span>File</span>
                <input type="file" id="image" onChange={onChange} name="image" />
              </div>
              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
                  placeholder="Select image for your event"
                  type="text"
                />
              </div>
            </div>

            <div className="input-field col s12 l6 ">
              <input
                onChange={onChange}
                value={events.nb_participant}
                id="nb_participant"
                type="number"
              />
              <label htmlFor="nb_participant" className="active">Number of participant </label>
            </div>

            <div
              className="col s12 m6"
              style={{
                position: "relative",
                // marginTop: "1rem",
                marginBottom: "1rem",
                // bottom:"10px"
              }}
            >
              <label htmlFor="duration" className="active">Event duration</label>
              <select
                style={{
                  display: "initial",
                  padding: 0,
                }}
                onChange={onChange}
                id="duration"
                value={events.duration}
              >
                <option value="" defaultValue>
                  {" "}
                  Select the event duration
                </option>
                <option value="1">1 day</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
              </select>
            </div>
            <div className="col s12">
              <div className="col s6 m4 offset-m2">
                <button
                  style={{
                    width: "100%",
                    borderRadius: "3px",
                    // letterSpacing: "1.5px",
                    // marginTop: "1rem",
                    height: "45px",
                  }}
                  type="submit"
                  className="btn waves-effect waves-light hoverable "
                >
                  {action.type=="add"?"ADD":"Edit"}
                </button>
              </div>
              <div className="col s6 m4">
                <button
                  style={{
                    width: "100%",
                    borderRadius: "3px",
                    // letterSpacing: "1.5px",
                    // marginTop: "1rem",
                    height: "45px",
                  }}
                  type="button"
                  className="btn waves-effect waves-light hoverable "
                  onClick={() => {
                    toggle()
                    setAction({type:"add",payload:{}})
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
