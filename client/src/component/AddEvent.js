import React from 'react';
import { Link } from "react-router-dom";
const AddEvent = ({modal,toggle,action,edit,title,discription,date,adress,setTitle,setDiscription,setDate,setAdress,duration,setDuration,Nb_participant,setNb_participant}) => {
    return (
<div className="col s12">
        {modal && (
          <div className="col s8 offset-s2">
            <div className="row">
              <div
                className="col s12"
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
              <form className="col s12" >
                <div className="input-field col s12 m6">
                  <input 
                    id="title"
                    type="text"
                    value={title} 
                    onChange={(e)=>setTitle(e.target.value)}
                  />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="input-field col s12 m6">
                  <input
                   value={adress}  
                   onChange={(e)=>setAdress(e.target.value)} 
                    id="address"
                    type="text"
                  />
                  <label htmlFor="address">Event address</label>
                </div>
                <div className="input-field col s12">
                  <textarea
                    id="description"
                    className="materialize-textarea"
                    value={discription}  
                    onChange={(e)=>setDiscription(e.target.value)}
                  ></textarea>

                  <label htmlFor="description">Event description</label>
                </div>
                <div className="input-field col s12 l6">
                  <input
                    value={date}  
                    onChange={(e)=>setDate(e.target.value)}
                    id="date"
                    type="date"
                  />
                  <label htmlFor="date">Event date</label>
                </div>

                <div className="input-field file-field col s12 l6 ">
                  <div className="btn">
                    <span>File</span>
                    <input type="file" id="image"  />
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
                   
                   value={Nb_participant}  
                   onChange={(e)=>setNb_participant(e.target.value)}
                    id="member"
                    type="number"
                  />
                  <label htmlFor="member">Number of participant </label>
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
                  <label htmlFor="duration">Event duration</label>
                  <select
                    style={{
                      display: "initial",
                      padding: 0,
                    }}
                  
                    id="duration"
                    value={duration}  
                    onChange={(e)=>setDuration(e.target.value)}
                    
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
               
                 <Link to ="/event-list">
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
                      onClick={action}
                    >
                      {edit?"edit Event":"add Event"}
                    </button>
                    </Link> 
                  </div>
                  <div className="col s6 m4">
                     <Link to="/">
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
                      onClick={toggle}
                    >
                      Cancel
                    </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
 );
};


export default AddEvent;