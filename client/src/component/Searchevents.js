import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCH, INI_SEARCH } from "../actions/types";
import "../searchevent.css";
function Searchevents() {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [eventsearch, setEventsearch] = useState({
    title: "",
    address: "",
    description: "",
  });
  const onChange = (e) => {
    setEventsearch({ ...eventsearch, [e.target.id]: e.target.value });
  };
  function onSubmit(e) {
    e.preventDefault();
    console.log(eventsearch);
    dispatch({
      type: INI_SEARCH,
      payload: !search.etat,
    });
  }
  return (
    <>
      <div
        className="row container search_app"
        style={{
          height: "90vh",
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
            top: 150,
            right: 100,
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
                type="text"
                onChange={onChange}
                className="inp"
                placeholder="Search events"
                id="title"
              />
              <i
                className="fa fa-search"
                style={{
                  fontSize: "25px",
                  position: "absolute",
                  transform: "translate(-30px,12.5px)",
                }}
              ></i>
            </div>
          ) : (
            <form className="col s12" onSubmit={onSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input id="title" type="text" onChange={onChange} />

                  <label htmlFor="title">Event Title</label>
                </div>
                <div className="input-field col s6">
                  <input id="address" type="text" onChange={onChange} />

                  <label htmlFor="address">Event Address</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="description"
                    type="text"
                    className="materialize-textarea "
                    onChange={onChange}
                  ></textarea>

                  <label htmlFor="description">Event Description</label>
                </div>
              </div>
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
