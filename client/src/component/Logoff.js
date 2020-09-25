import { useEffect, useState } from "react";
import setAuthToken from "../token/authtoken";
import axios from "axios"

function Logoff({history}) {
  const [userlog, setUserlog] = useState({
    email: "",
    password: "",
    errors: {},
  });


  useEffect(()=>{
    if(localStorage.token)
   history.push("/dashboard")
  
  })
  
   const onSubmit = (e) => {
    e.preventDefault();

    axios
    .post("/user/logoff")
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.removeItem("Token");
      // Set token to Auth header
      setAuthToken(false);
      // history.push("/dashboard")
      
    })
    .catch(err =>{
      setUserlog({...userlog,errors:err.response.data})
          console.log("err",err.response)
        }   
    );
    // setRedirectToReferrer(!redirectToReferrer);
    
  };
  const { errors } = userlog;
// props.login(userData);

}
export default Logoff
