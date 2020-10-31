import React,{useState,useEffect} from 'react';
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from "axios";
import { GET_ERRORS } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import { contactUs } from "../actions/authaction";
// import { GoogleComponent } from 'react-google-location'

import "../ContactUs.css"

const ContactUs = () => {
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: '', 
        email: '', 
        phone: '',
        message: '',
        sent: false,
        error: {},})
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

useEffect(()=>{
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
},[])
useEffect(() => {
  if (errors) setInputs({ ...inputs, error: errors });
}, [errors]);

const change=(e)=>{
return setInputs({...inputs,[e.target.id]:e.target.value})
}


const handleSubmit=(e)=>{
  e.preventDefault();

  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
  let data={
    name:inputs.name,
    email:inputs.email,
    phone:inputs.phone,
    message:inputs.message
  }
    dispatch(contactUs(data))
 console.log(data)
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
}
const resetContact=()=>{
    setInputs({
     name:'',
     email:'',
     phone:'',
     message:''
    })
    // setTimeout(()=>{
    // setInputs({
    //     sent:false
    // })
    // },3000)
}


  // const {
  //   buttonLabel,
  //   className
  // } = props;

  // const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal);


    return (
        <>
        <Navbar/>
         <div className="jumbotron jumbotron-simple-new jumbotron-simple-new-dark">
  <div className="container">
    <div className="row-3 text-center">
      <div className="col-md-12 col-md-offset-1">
        <h1>Contact Us </h1>
        <p className="parg">Contact us! We're hear to help.</p>
      </div>
    </div>
  </div>
</div>  
<div className=" row vc_row wpb_row vc_row-fluid section-header featured"
style={{marginLeft:"50px",marginTop:"20px"}}>
              <div className="wpb_column vc_column_container col 12">
                <div className="vc_column-inner">
                  <div className="wb_wrapper">
                    <div className="wpb_text_column wpb_content_element ">
                      <div className=" wpb_wrapper">
                        <h2>Give us a shout</h2>
                        <p>If you’ve got any questions, please fill out the form below and we promise to get back to you with lightning speed! You may also take a look at our Help Center where you can find answers of common questions that we receive.</p>
                        
                        </div></div></div></div></div></div>
<div className="wrapper animated bounceInLeft">
    <form className=" contact_us text-center"
 
    method="POST" 
    action="/contact/contactus"
     onSubmit={handleSubmit}>
        <div className="content-1">
            <div className="container cont-1">                
                <div className="row-3 align-items-center">
                    <div role="form" >
                        <div className="col">
                            <div className="input-field">
                                <input 
                                // className="form-control input-lg"
                                 id="name" 
                                 type="text"
                                  // placeholder="User Name"
                                  value={inputs.name}  
                                  onChange={change}/>
                               <label htmlFor="name"> name </label>
                               <span className={inputs.error.name && "red-text"}>
                               {inputs.error.name}</span>
                            </div>
                            <div className="input-field">
                                <input 
                                // className="form-control input-lg" 
                                id="email"
                                 type="email"
                                  // placeholder="Email"
                                  value={inputs.email}  
                                   onChange={change}
                                   required/>
                                  <label htmlFor="email"> email </label>

                                       <span className={inputs.error.email && "red-text"}>
                {inputs.error.email}</span>
                            </div>
                            <div className="input-field">
                                <input
                                //  className="form-control input-lg"
                                 id="phone"
                                  type="number"
                                  //  placeholder="Cell Phone"
                                   value={inputs.phone}  
                                   onChange={change}
                                   />
                                      <label htmlFor="phone"> phone </label>

                                       <span className={inputs.error.phone && "red-text"}>
                {inputs.error.phone}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-field ">
                                <textarea className="form-control" 
                                id="message" 
                                rows="5"
                                placeholder="Your Message"
                                value={inputs.message}  
                                onChange={change}></textarea>
                                    <span className={inputs.error.message && "red-text"}>
                               {inputs.error.message}</span>
                            </div> 
                            <div className="form-group">
                            <button data-toggle="modal" data-target="#exampleModal" className="btn modal-trigger"
                            
                    >Contact Us</button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
      {/* { window.location.hash === '#success' &&
        <div id="success">
          <p>Your message has been sent!</p>
        </div>
      }
      { window.location.hash === '#error' &&
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
    
<Footer/>
        </>
    );
};

export default ContactUs;