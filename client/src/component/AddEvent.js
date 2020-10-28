import React, { useState,useEffect,useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addEvent, editEvent } from "../actions/evntAction";
import M from "materialize-css";
import { GET_ERRORS } from "../actions/types";
import "../addevent.css"
import resize from "../outils/resize";
import { logoutUser } from "../actions/authaction";
import Events from "./Events";
import verif_date from "../outils/verif_date";


const AddEvent = ({ toggle,action,setAction }) => {

const dispatch = useDispatch()
const errors = useSelector((state) => state.errors);
const auth = useSelector((state)=>state.auth)
const location = useLocation()

  const [events, setEvents] = useState({
    title: action.type=="add"?"":action.payload.title,
    address:action.type=="add"?"":action.payload.address ,
    description:action.type=="add"?"":action.payload.description ,
    start: action.type=="add"?"":action.payload.start,
    end: action.type=="add"?"":action.payload.end,
    nb_participant:action.type=="add"?"":action.payload.nb_participant ,
    image: action.type=="add"?"":action.payload.image,
    tags:[],
    time_start:"",
    time_end:"",
    error: {},
  });
  const[btn,setBtn]=useState(false)
  
  const chip_input =useRef()

  useEffect(() => {
    
     if (errors.msg){ 
      M.toast({ html: "Please insert all field", classes: "red" });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
      setBtn(false)
    }
    if(errors.success){
    toggle()
    M.toast({ html: action.type=="add"?"Event successfully added check your list":"Event successfully updated", classes: "green" });
    setAction({type:"add",payload:{}})
    return ()=>{ dispatch({
      type: GET_ERRORS,
      payload: {},
    })}}
    // M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'))
    M.updateTextFields()
    if(action.type=="add")
    M.Chips.init(document.querySelectorAll('.chips'),{
      placeholder:"Optional: Press enter to add tags (3 Max)",
      limit:3,
    })
    if(action.type=="edit")
    M.Chips.init(document.querySelectorAll('.chips'),{
      placeholder:"Optional: Press enter to add tags (3 Max)",
      limit:3,
      data:action.payload.tags.map(el=>{return {tag:el}})
    })
    
    
  });

 useEffect(()=>{
  M.Timepicker.init(document.querySelectorAll('.timepicker'),{twelveHour:false,showClearBtn:true});
 },[])

const onChange_tags=(e)=>{
setEvents({...events,[e.target.id]:[...[e.target.id],{tag:e.target.value}]})
}
  const onChange = (e) => {
    if (e.target.id == "image")
      setEvents({ ...events, [e.target.id]: e.target.files[0] });
    else 
    setEvents({ ...events, [e.target.id]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if(!(verif_date(events.time_start)&&verif_date(events.time_end)))
     return M.toast({ html: "Invalid time format", classes: "red" });

    await setBtn(true)
    const newEvent = {
      title: events.title,
      address: events.address,
      description: events.description,
      start: events.start+"T"+events.time_start,
      end: events.end+'T'+events.time_end,
      nb_participant: events.nb_participant,
      image: events.image,
      tags:(chip_input.current.innerText).replace(/\W/gi,"").split("close").slice(0,(chip_input.current.innerText).replace(/\W/gi,"").toLowerCase().split("close").length-1)
    };
console.log(newEvent)
    const data = new FormData();
    data.append("file", newEvent.image);
    data.append("upload_preset", "events-website");
    data.append("cloud_name", "med");

    const send = await fetch(
      "https://api.cloudinary.com/v1_1/med/image/upload/",
      {
        method: "post",
        body: data,
      }
    );
    const res = await send.json();
    console.log(res)
    // newEvent.image &&
      res.error && M.toast({ html: "Please insert a valid image", classes: "red" })&& setBtn(false)
     
      !res.error && (newEvent.image = resize(res.url));
      console.log(newEvent);
   if(action.type=="add")
   
   !res.error&&dispatch(addEvent({...newEvent,id_organizer:auth.user._id}));
      else{
        !res.error &&dispatch(editEvent(action.payload._id,newEvent))
     
      }
  //     console.log(events);
      
   
  };

  return (
   
      <div className="col s12">
        <div className="row">
          <div
            className="col s12 row"
            style={{
              textAlign: "center",
              marginTop:15
            }}
          >
            <b>
              <span
                style={{
                  width: "100%",
                  color: "#006064",
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
            <div className=" col s12 l6">
              <div className="input-field col s8">
              <input
                onChange={onChange}
                value={events.start}
                id="start"
                type="date"
              />
              <label htmlFor="date" className="active">Event start date</label>
            </div>
            <div className="input-field col s4">
            <input type="text" className="timepicker" placeholder="Time" value={events.time_start}
            id='time_start'
            onChange={(e)=>setEvents({...events,[e.target.id]:e.target.value})}
            onBlur={(e)=>setEvents({...events,[e.target.id]:e.target.value})}
            />
              </div>
              </div>
              <div className=" col s12 l6">
              <div className="input-field col s8">
              <input
                onChange={onChange}
                value={events.end}
                id="end"
                type="date"
              />
              <label htmlFor="date" className="active">Event end date</label>
            </div>
            <div className="input-field col s4">
            <input type="text" className="timepicker" placeholder="Time"
            value={events.time_end}
            id='time_end'
            onChange={(e)=>setEvents({...events,[e.target.id]:e.target.value})}
            onBlur={(e)=>setEvents({...events,[e.target.id]:e.target.value})}
            
            />
              </div>
              </div>
            <div className="input-field file-field col s12 l6 ">
              <div className="btn-small">
                <span>File</span>
                <input type="file" accept=".JPEG, .JPG, .GIF, .PNG" id="image" onChange={onChange} name="image" />
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

            {/* <div
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
            </div> */}
            <div className="col s12">
            <div className="chips" ref={chip_input}>
    <input className="custom-class" id="tags"  />
  </div>


    
            </div>
            <div className="col s12" style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
              <div >
                <button
                  style={{
                    width: "120px",
                    borderRadius: "5px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                    height: "40px",
                  }}
                  // disabled={btn}
                  type="submit"
                  className={!btn?"btn  hoverable":"btn  hoverable disabled"} 
                  
                >
                  {action.type=="add"?"ADD":"Edit"}
                </button>
              </div>
              <div >
                <button
                  style={{
                    width: "120px",
                    borderRadius: "5px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                    height: "40px",
                  }}
                  type="button"
                  className="btn  hoverable "
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
          <div className='col s12 container '>
            <h6>* Please note that a admin validation is required (for any <b> new event</b> or <b>modification</b> of a exstance one).</h6> 
            </div>
        </div>
      </div>
    
  );
};

export default AddEvent;
