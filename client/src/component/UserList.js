import React, { useState, useDispatch } from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useSelector } from "react-redux";

const UserList = (user) => {
  const [inp, setInp] = useState("");
 // const dispatch = useDispatch()
 // const deleteUsers = () => {
 // dispatch(deleteUsers(user._id))
//}
  const users = useSelector((state) => state.admin);
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
              ? users.users &&
                users.users.map((e, index) => (
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
                        data-target="modal1" /* onClick={deleteUsers}*/
                      >
                        Delete
                      </button>
                    </CardBody>
                  </Card>
                ))
              : users.users
                  .filter((e) => {
                    return e.fname && e.fname == inp;
                    // e.fname.toLowerCase().includes(inp.toLowerCase())
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
                  ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserList;
