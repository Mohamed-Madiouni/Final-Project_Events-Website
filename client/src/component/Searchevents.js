import React, { useState } from "react";

function Searchevents({ formsearch }) {
  const [eventsearch, setEventsearch] = useState({
    title: "",
    address: "",
    description: "",
  });
  const onChange = (e) => {
    setEventsearch({ ...eventsearch, [e.target.id]: e.target.value });
  };
  async function onSubmit(e) {
    e.preventDefault();
    await console.log(eventsearch);
    setEventsearch({
      title: "",
      address: "",
      description: "",
    });
    formsearch(false);
  }
  return (
    <>
      <div className="row">
        <form className="col s12" onSubmit={onSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                // placeholder="Event title"
                id="title"
                type="text"
                className="validate"
                onChange={onChange}
                value={eventsearch.title}
              />

              <label
                htmlFor="title"
                style={{
                  color: "white",
                }}
              >
                Event Title
              </label>
            </div>
            <div className="input-field col s6">
              <input
                // placeholder="Tap the event address"
                id="address"
                type="text"
                className="validate"
                onChange={onChange}
                value={eventsearch.address}
              />

              <label
                htmlFor="address"
                style={{
                  color: "white",
                }}
              >
                Event Address
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                // placeholder="Tap the event description"
                id="description"
                type="text"
                className="validate"
                onChange={onChange}
                value={eventsearch.description}
              />

              <label
                htmlFor="description"
                style={{
                  color: "white",
                }}
              >
                Event Description
              </label>
            </div>
          </div>
          <div>
            <button
              style={{
                borderRadius: "5px",
                    letterSpacing: "1.5px",
                    color:"white",
                    
                
              }}
              type="submit"
              className="btn waves-effect waves-light hoverable"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Searchevents;
