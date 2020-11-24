import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCH, INI_SEARCH } from "../actions/types";
import "../searchevent.css";
import {useHistory} from "react-router-dom"


function Searchevents() {
  const search = useSelector((state) => state.search);
  const allevents=useSelector(state=>state.events.allEvents)
  const history=useHistory()
  const dispatch = useDispatch();
  const inp =useRef()
  const [eventsearch, setEventsearch] = useState({
    title: "",
    address: "",
    description: "",
  });
  const [errorsearch,setErrorsearch]=useState(false)

  useEffect(()=>{
    if(errorsearch){
    return ()=>{setErrorsearch(false)}
    }
  })
//   useEffect(()=>{
// inp.current.focus()
//   },[])
  const onChange = (e) => {
    setEventsearch({ ...eventsearch, [e.target.id]: e.target.value });
    // let search= allevents.filter(el=>{
    //   return(
    //    el.title.toLowerCase().includes(eventsearch.title.toLowerCase())
    //    &&el.address.toLowerCase().includes(eventsearch.address.toLowerCase())
    //    &&el.description.toLowerCase().includes(eventsearch.description.toLowerCase()))
    //  })
    //  setResultsearch(search.length)
  };
  function onSubmit(e) {
    e.preventDefault();
    
  //  let search= allevents.filter(el=>{
  //    return(
  //     el.title.toLowerCase().includes(eventsearch.title.toLowerCase())
  //     &&el.address.toLowerCase().includes(eventsearch.address.toLowerCase())
  //     &&el.description.toLowerCase().includes(eventsearch.description.toLowerCase()))
  //   })
// console.log(search,search.length)
// if(eventsearch.title||eventsearch.address||eventsearch.description){
dispatch({
      type: INI_SEARCH,
      payload: !search.etat,
    });
history.push(`/search?title=${eventsearch.title}&address=${eventsearch.address}&description=${eventsearch.description}`)
  }
  // else
  // setErrorsearch(true)
  // }
  return (
    <>
      <div
        className="row container search_app"
        style={{
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          position: "relative",
          
        }}
      >
        <i
          className="material-icons"
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 100,
            right: 80,
          }}
          onClick={() =>
            dispatch({
              type: INI_SEARCH,
              payload: !search.etat,
            })
          }
        >
          close
        </i>
        <div className="col s10 ">
          {!search.search ? (
            <div className="col s12">
              <input
              ref={inp}
                type="text"
                onChange={onChange}
                onKeyDown={(e)=> { 
                  if (e.key === "Enter") 
                 {
                  dispatch({
                    type: INI_SEARCH,
                    payload: !search.etat,
                  });
              history.push(`/search?title=${eventsearch.title}&address=${eventsearch.address}&description=${eventsearch.description}`)
                }
                 }
                }
                className="inp"
                placeholder="Search events"
                id="title"
                value={eventsearch.title}
                autoFocus
              />
              <i
                className="fa fa-search"
                style={{
                  fontSize: "21px",
                  position: "absolute",
                  transform: "translate(-30px,12.5px)",
                }}
              ></i>
            </div>
          ) : (
            <form className="col s12" onSubmit={onSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input id="title" type="text" value={eventsearch.title} onChange={onChange}  autoFocus/>

                  <label htmlFor="title" className="active">Event Title</label>
                </div>
                <div className="input-field col s6">
                  <input id="address" type="text" value={eventsearch.address} onChange={onChange} />

                  <label htmlFor="address" className="active">Event Address</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="description"
                    type="text"
                    className="materialize-textarea "
                    onChange={onChange}
                    value={eventsearch.description}
                  ></textarea>

                  <label htmlFor="description" className="active">Event Description</label>
                </div>
              </div>
          <span className="col s12 red-text">{errorsearch&& "At least one field required" }</span>
              <div
                className="col s12"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    borderRadius: "5px",
                    letterSpacing: "1.5px",

                    margin: 10,
                  }}
                  type="submit"
                  className="btn waves-effect waves-light hoverable"
                >
                  Search
                </button>
                <button
                  style={{
                    borderRadius: "5px",
                    letterSpacing: "1.5px",

                    margin: 10,
                  }}
                  type="button"
                  className="btn waves-effect waves-light hoverable"
                  onClick={() =>
                    dispatch({
                      type: SET_SEARCH,
                      payload: !search.search,
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="col s2">
          <p>
            <label>
              <input
                type="checkbox"
                onChange={() =>
                  dispatch({
                    type: SET_SEARCH,
                    payload: !search.search,
                  })
                }
                checked={search.search}
              />
              <span></span>
            </label>
          </p>
        </div>
      </div>
    </>
  );
}

export default Searchevents;
