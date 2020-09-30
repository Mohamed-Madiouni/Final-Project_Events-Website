import React, { useState, useDispatch } from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useSelector } from "react-redux";
// import { deleteEvent } from "../actions/adminaction";

const EventList = (event) => {
  const [inp, setInp] = useState("");
 //const dispatch = useDispatch()
 //const deleteEvents = () => {
 //dispatch(deleteEvent(event._id))
// }
  const events = useSelector((state) => state.admin);
  return (
    <div>
      <nav>
        <div id="navbarSupportedContent">
          <div>
            <form className="form-inline my-2 my-lg-0">
              <input
                onChange={(e) => {
                  setInp(e.target.value);
                }}
                type="text"
                name="fname"
                placeholder="search"
              />
            </form>

            {inp == ""
              ? events.events &&
              events.events.map((e, index) => (
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
                        data-target="modal1" /*onClick={deleteEvents}*/>
                        Delete
                      </button>
                    </CardBody>
                  </Card>
                ))
              : events.events
                  .filter((e) => {
                    return e.title && e.title == inp;
                    // e.fname.toLowerCase().includes(inp.toLowerCase())
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
                  ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default EventList;
