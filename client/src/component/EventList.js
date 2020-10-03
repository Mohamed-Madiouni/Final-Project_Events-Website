import React, { useState } from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent } from "../actions/adminaction";
import { SET_SEARCH, INI_SEARCH } from "../actions/types";
const EventList = () => {
  const search = useSelector((state) => state.admin); 
  const dispatch = useDispatch()  
  const [inp, setInp] = useState({
    title: "",
    address: "",
    description: "",
  });

  const onChange = (e) => {
    setInp({ ...inp, [e.target.id]: e.target.value });
  };

  function onSubmit(e) {
    e.preventDefault();
    console.log(inp);
    // dispatch({
    //   type: INI_SEARCH,
    //   payload: !search.etat,
    // });
  }

  const deleteEvents = (id) => {
  dispatch(deleteEvent(id))
  }
  
  return (
    <>
           <h2>Events</h2>
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
                  onClick={() => 
                    {
                      search.search.filter((e) => {
                          return (e.title && e.title.toLowerCase().includes(inp.title.toLowerCase())) || (e.title && e.title.toLowerCase().includes(inp.toLowerCase()));
                        })
                        .map((e, index) => (
                          <Card className="card" key={index}>
                            <CardBody>
                            <CardTitle key={e.id}>Title: {e.title}</CardTitle>
                            <CardSubtitle>Date: {e.date}</CardSubtitle>
                            <CardText>Address: {e.Address}</CardText>
                            <CardText>Duration: {e.duration}</CardText>
                            <CardText>Nb participant: {e.Nb_participant}</CardText>
                            <CardText>Discription: {e.discription}</CardText>
                              <button
                                style={{
                                  width: "150px",
                                  borderRadius: "3px",
                                  letterSpacing: "1.5px",
                                  marginTop: "1rem",
                                }}
                                type="button"
                                className="btn btn-large modal-trigger"
                                data-target="modal1"
                              >
                                Delete
                              </button>
                            </CardBody>
                          </Card>
                        ))
                      }}
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
    </>
  );
}
export default EventList;
