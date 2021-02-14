import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GET_ERRORS } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import { contactUs } from "../actions/authaction";
import "../../node_modules/intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import "../tel.scss";
import M from "materialize-css";
// import { GoogleComponent } from 'react-google-location'

import "../ContactUs.css";

const ContactUs = () => {
  const errors = useSelector((state) => state.errors);

  const dispatch = useDispatch();
  // const [maps, setMaps] = useState({
  //   latitude: null,
  //   longitude: null,
  //   userAddress : null,
  // })
  // const getLocation=(e)=>{getLocation.bind(e)
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(getCoordinates);
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }
  // const getCoordinates =(position)=>{
  //   console.log(position)
  //   // setMaps({

  //   // })
  // }
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    sent: false,
    error: {},
  });
  //         const API_KEY = AIzaSyBox6R6kPi4jfyWFJiMBES526Iqa8s1DlE;
  // const [place, setplace] = useState(null)
  //const [sent, setSent] = useState(false)
  // const handleSubmit = (e) => {
  //    e.preventDefault()
  //     //destructure from inputs
  //    const {name,email,phone,message} = inputs
  //    axios.post('/contact/contactus', {
  //       //make an object to be handled from req.body on the backend.
  //      email,
  //      name,
  //     phone,
  //       //change the name to represent text on the backend.
  //       text: message
  //    })
  //   }

  useEffect(() => {
    if (errors.contact) {
      inputs.name === "" &&
        M.toast({
          html: "Your message has been sended, thanks for your interest",
          classes: "green",
        });

      setInputs({ ...inputs, name: "", email: "", phone: "", message: "" });
      inputs.name === "" &&
        dispatch({
          type: GET_ERRORS,
          payload: {},
        });
    }
  });

  useEffect(() => {
    let input = document.querySelector("#phone");
    intlTelInput(input, {
      initialCountry: "tn",
      preferredCountries: ["fr", "us"],
      separateDialCode: true,
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
  }, []);

  useEffect(() => M.updateTextFields());

  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }, []);
  useEffect(() => {
    if (errors) setInputs({ ...inputs, error: errors });
  }, [errors]);

  const change = (e) => {
    return setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let input = document.querySelector("#phone");
    let iti = intlTelInput(input, {
      initialCountry: "tn",
      preferredCountries: ["fr", "us"],
      separateDialCode: true,
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    let data = {
      name: inputs.name,
      email: inputs.email,
      phone: iti.getNumber(),
      message: inputs.message,
    };
    dispatch(contactUs(data));

    //   axios.post("/contact/contactus",data)
    //   .then(res=>{
    //   //  setInputs({
    //   //    sent:true
    //   //  }),
    //     resetContact()
    //  })
    //  .catch(()=>{
    //     console.log('message not sent')
    // })}

    // setTimeout(()=>{
    // setInputs({
    //     sent:false
    // })
    // },3000)
  };

  // const {
  //   buttonLabel,
  //   className
  // } = props;

  // const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal);

  return (
    <>
      <Navbar />
      <section
        id="PageCoverHeader"
        data-vc-full-width="true"
        data-vc-full-width-init="true"
        className="vc_section contact-us vc_custom_1489707920794 vc_section-has-fill"
      >
        <div className="vc_row wpb_row vc_row-fluid">
          <div className="wpb_column vc_column_container vc_col-sm-12">
            <div className="vc_column-inner">
              <div className="wpb_wrapper">
                <div className="wpb_text_column wpb_content_element  page-header">
                  <div className="wpb_wrapper div-wpb">
                    <h1 className="h1-contact">
                      <span className="span-contact span-1">Contact Us</span>
                    </h1>
                    <hr />
                    <h3 className="h3-contact">
                      <span className="span-contact">
                        Eager to learn more about CocoEvent or simply want to
                        say hello? Get in touch and we’ll be happy to answer all
                        your questions.
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="jumbotron jumbotron-simple-new jumbotron-simple-new-dark">
  <div className="exp1 container">
    <div className="row-3 text-center">
      <div className="col-md-12 col-md-offset-1">
        <h1 className="title-1">Contact Us </h1>
        <p className="parg">Contact us! We're hear to help.</p>
      </div>
    </div>
  </div>
</div>   */}
      <div
        className=" row vc_row wpb_row vc_row-fluid section-header featured"
        style={{ marginTop: "90px" }}
      >
        <div className="wpb_column vc_column_container col s12">
          <div className="vc_column-inner">
            <div className="wpb_text_column wpb_content_element ">
              <div className=" wpb_wrapper">
                <h2 className="h2-contact">Give us a shout</h2>
                <p
                  className="p-contact"
                  style={{ marginRight: "70px", fontSize: "20px" }}
                >
                  If you’ve got any questions, please fill out the form below
                  and we promise to get back to you with lightning speed! You
                  may also take a look at our Help Center where you can find
                  answers of common questions that we receive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper animated bounceInLeft">
        <form
          id="FormContainer"
          className=" contact_us"
          style={{ marginTop: "40px" }}
          onSubmit={handleSubmit}
        >
          <div className="content-1 container">
            <div className=" cont-1">
              <div className="row-3 align-items-center">
                <div role="form">
                  <div className="col">
                    <div className="input-field">
                      <input
                        // className="form-control input-lg"
                        id="name"
                        type="text"
                        // placeholder="User Name"
                        value={inputs.name}
                        onChange={change}
                      />
                      <label htmlFor="name"> name </label>
                      <span className={inputs.error.name && "red-text"}>
                        {inputs.error.name}
                      </span>
                    </div>
                    <div className="input-field">
                      <input
                        // className="form-control input-lg"
                        id="email"
                        type="email"
                        // placeholder="Email"
                        value={inputs.email}
                        onChange={change}
                        required
                      />
                      <label htmlFor="email"> email </label>

                      <span className={inputs.error.email && "red-text"}>
                        {inputs.error.email}
                      </span>
                    </div>
                    <div className="input-field">
                      <input
                        style={{ width: "-moz-available" }}
                        //  className="form-control input-lg"
                        id="phone"
                        type="tel"
                        //  placeholder="Cell Phone"
                        value={inputs.phone}
                        onChange={change}
                      />
                      <label htmlFor="phone" className="active">
                        {" "}
                        phone{" "}
                      </label>
                      <div style={{ marginTop: 8 }}>
                        <span className={inputs.error.phone && "red-text"}>
                          {inputs.error.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-field ">
                      <textarea
                        className="form-control"
                        id="message"
                        rows="5"
                        placeholder="Your Message"
                        value={inputs.message}
                        onChange={change}
                      ></textarea>
                      <span className={inputs.error.message && "red-text"}>
                        {inputs.error.message}
                      </span>
                    </div>
                    <div className="form-group">
                      <button className="btn">Contact Us</button>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Modal title
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">...</div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div id="modal1" className="modal">
  <div className="modal-content">
    <h4>Modal Header</h4>
    <p>A bunch of text</p>
  </div>
  <div className="modal-footer">
    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
  </div>
</div> */}

                      {/* onClick={toggle}>{buttonLabel}Contact Us</button>
                     <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
       <ModalBody>
       Yor message has been sent...
        </ModalBody>
     </Modal> */}
                      <div>
                        {/* { window.location.hash ==== '#success' &&
        <div id="success">
          <p>Your message has been sent!</p>
        </div>
      }
      { window.location.hash ==== '#error' &&
        <div id="error">
          <p>An error occured while submitting the form.</p>
        </div>
      } */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* <div >
         <GoogleComponent
         
          apiKey={API_KEY}
          language={'en'}
          country={'country:in|country:us'}
          coordinates={true}
          locationBoxStyle={'custom-style'}
          locationListStyle={'custom-style-list'}
          onChange={(e) => { setplace({ place: e }) }} />
      </div> */}
      </div>
      <div>
        {/* <button onClick={getLocation}>cordinates</button>
    <p>Latitude:{maps.latitude}</p>
    <p>longitude:{maps.longitude}</p>
    <p>Address:{maps.userAddress}</p> */}
        <section id="Location" className="vc_section">
          <div
            className="vc_row wpb_row vc_row-fluid section-header featured"
            style={{ marginTop: "70px" }}
          >
            <div className="wpb_column vc_column_container vc_col-sm-12">
              <div className="vc_column-inner">
                <div className="wpb_wrapper">
                  <div className="wpb_text_column wpb_content_element ">
                    <div className="wpb_wrapper ">
                      <h2 className="h2-contact">Location</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="map-canvas" className="vc_row wpb_row vc_row-fluid">
            <div className="wpb_column vc_column_container vc_col-sm-12">
              <div className="vc_row wpb_row vc_inner vc_row-fluid map-container">
                <div className="vc_column-inner">
                  <div className="wpb_wrapper">
                    <p>
                      <iframe
                        className="iframe"
                        style={{ border: 0, width: "100%" }}
                        height="450"
                        frameBorder="0"
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBSZLoDPxvY96AxQbxFDlhXxiTS5JxgeDc&q=GoMyCode,tunis+sousse"
                        allowFullScreen
                      ></iframe>
                    </p>
                  </div>
                  <div className="wpb_text_column wpb_content_element  address-container">
                    <div className="wpb_wrapper">
                      <h4 className="h4-title">
                        <i
                          style={{ marginRight: "15px" }}
                          className="fa fa-phone"
                        ></i>
                        Phone Number
                      </h4>
                      <p className="p-contact">+21655333333</p>
                      <h4 className="h4-title">
                        <i
                          style={{ marginRight: "15px" }}
                          className="fa fa-envelope"
                        ></i>
                        Adress E-mail
                      </h4>
                      <p className="p-contact">eventcoco63@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <Footer/> */}
    </>
  );
};

export default ContactUs;
