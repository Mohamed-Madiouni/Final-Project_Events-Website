const express = require("express")
const nodemailer = require ('nodemailer')
const router = express.Router()
const validateContactInput= require("../validation/contact");
require("dotenv").config();
// const transport = {
//     //all of the configuration for making a site send an email.
  
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.THE_EMAIL,
//       pass: process.env.THE_PASSWORD
//     }
//   };
//   const transporter = nodemailer.createTransport(transport);
//   transporter.verify((error, success) => {
//     if(error) {
//       //if error happened code ends here
//       console.error(error)
//     } else {
//       //this means success
//       console.log('users ready to mail myself')
//     }
//   });
//   router.post('/contactus', (req,res, next) => {
//     //make mailable object
    
// //         from: data.email,
// //   to: "eventcoco63@gmail.com",
// //   subject: `Message from ${req.body.name}`,
// //   text: message,
// //   html: `<h3>Information</h3>
// //   <ul>
// //   <li> Name: ${req.body.name}</li>
// //   <li> Phone: ${req.body.phone}</li>
// //   <li> Email: ${req.body.email}</li>
// //   </ul>
// //   <h3>Message</h3>
// //   <p>${req.body.message}</p>`
// const mail = {
//       from: process.env.THE_EMAIL,
//       to: 'messaouiamani13@gmail.com',
//       subject: req.body.subject,
//       text: `
//       from:
//       ${req.body.name} 

//       contact: ${req.body.email}

//       message: 

//       ${req.body.text}`
// }
// //error handling goes here. 
// transporter.sendMail(mail, (err,data) => {
//     if(err) {
//       res.json({
//         status: 'fail'
//       })
//     } else {
//       res.json({
//         status: 'success'
//       })
//     }
//   })
// next()
// //still inside the .post request the next line should be });
//   });




router.post('/contactus',(req,res)=>{
    const data =req.body

    // console.log(data)
    const { errors, isValid } = validateContactInput(req.body)
  //   console.log();
  // console.log("errors",errors,isValid)
  // console.log(req.body)
    if (!isValid) {
      return res.status(400).json(errors);
    }



    const Transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
          user:'mailer.cocoevent@gmail.com',
          pass:process.env.pass
        },
        tls:{
            rejectUnauthorized:false
        }
    })

const mailOptions={
  from: `${data.name}<${data.email}>`,
  to: "mailer.cocoevent@gmail.com",
  subject: `Message from ${data.name}`,
  html: `<h3>New message</h3>
  <ul>
  <li> Email: ${data.email}</li>
  <li> Name: ${data.name}</li>
  <li> Phone: ${data.phone}</li>
  </ul>
  <p>${data.message}</p>`
}
Transporter.sendMail(mailOptions,(error,info)=>{
if (error){
    res.send(error)
}else{
    res.send({msg:'Email has been sent...'})
}
})

})
module.exports= router