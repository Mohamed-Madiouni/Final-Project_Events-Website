import React, { useState } from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../actions/adminaction";
import { SET_SEARCH, INI_SEARCH } from "../actions/types";

const UserList = () => {
  const search = useSelector((state) => state.admin);  
  const dispatch = useDispatch()  
  const [inp, setInp] = useState({
    fname: "",
    lname: "",
    email: "",
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

  const deleteUsers = (id) => {
  dispatch(deleteUser(id))
  }

  return (
    <>
          <h3>Accounts</h3>
            <form className="col s12" onSubmit={onSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input id="fname" type="text" onChange={onChange} />

                  <label htmlFor="fname">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input id="address" type="text" onChange={onChange} />

                  <label htmlFor="address">Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="email"
                    type="text"
                    className="materialize-textarea "
                    onChange={onChange}
                  ></textarea>

                  <label htmlFor="email">Email</label>
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
                          return (e.fname && e.fname.toLowerCase().includes(inp.fname.toLowerCase())) || (e.email && e.email.toLowerCase().includes(inp.toLowerCase()));
                        })
                        .map((e, index) => (
                          <Card className="card" key={index}>
                            <CardBody>
                              <CardTitle key={e.id}>First Name: {e.fname}</CardTitle>
                              <CardSubtitle>Last Name: {e.lname}</CardSubtitle>
                              <CardText>Email: {e.email}</CardText>
                              <CardText>Address: {e.address}</CardText>
                              <CardText>Role: {e.role}</CardText>
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
export default UserList;
