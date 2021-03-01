require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateUpdateInput = require("../validation/update");
const authMiddleware = require("../middleware/authMiddleware");
// const nodemailer = require('nodemailer');
const nodemailer = require ('nodemailer')
var Pusher = require('pusher');
require("dotenv").config();

var pusher = new Pusher({
  appId:"1092374",
  key: "16ca3006a08827062073",
  secret: "d68755f8ef8b5528389a",
  cluster: 'eu',
  useTLS: true,
});


//handle registration
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hash,
        tel:req.body.tel,
        address:req.body.address,
        role:req.body.role
      });
      newUser
        .save()
        .then((user) => {
        // Transporter.sendMail({
        // to:user.email,
        // from:"eventcoco63@gmail.com",
        // subject:"signup success",
        // html:"<h1>wrlcome to CocoEvent</h1>"
        // })
        // res.json(user)})
          const payload = {
            id: user.id,
            fname: user.fname,
            lname:user.lname,
            email:user.email,
          }
  
          jwt.sign(payload, process.env.ACCES_TOKEN_SECRET,{expiresIn:"24h"},(err, token) => {
           
            let Transporter = nodemailer.createTransport({
             
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
      
      let mailOptions={
        from: "mailer.cocoevent@gmail.com",
        to: `${user.fname}<${user.email}>`,
        subject: `Activating your account - Coco event`,
        html: `Welcome <b>${user.fname}</b>, your Coco event account has been created. <br/>
        To confirm your registration, please click on the following link:<br/>
        <br/>
        http://localhost:3000/user/confirm_account?token=${token}`
        
      }
      Transporter.sendMail(mailOptions,(error,info)=>{
        if (error) console.log(error)
        else
        res.json({msg:info.response});
    })
          
  })
          })
        
        
        .catch((err) => console.log(err));
    }
  });
});


//reactivation
router.post("/reactivation", (req, res) => {
  const payload = {
    fname: req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
  }

  jwt.sign(payload, process.env.ACCES_TOKEN_SECRET,{expiresIn:"24h"},(err, token) => {
   
    let Transporter = nodemailer.createTransport({
     
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

let mailOptions={
from: "mailer.cocoevent@gmail.com",
to: `${req.body.fname}<${req.body.email}>`,
subject: `Activating your account - Coco event`,
html: `Welcome <b>${req.body.fname}</b>, your Coco event account has been created. <br/>
To confirm your registration, please click on the following link:<br/>
<br/>
http://localhost:3000/user/confirm_account?token=${token}`

}
Transporter.sendMail(mailOptions,(error,info)=>{
if (error) res.json(error)
else
res.send({reactive:"ok"});
})

  })
})

//handle confirm password

router.post("/confirmation",authMiddleware,(req,res)=>{

  User.findById(req.userId).then((user)=>{

    bcrypt.compare(req.body.confirm,user.password,(err,match)=>{
if (!match)
res.status(400).json({ msg: "Password incorrect !" })
else
res.send({success:"ok"})
})
    
})
})


//handle active user

router.put("/activation",(req,res)=>{

  User.findOneAndUpdate({email:req.body.email},{$set:{active:true}}).then((user)=>{

   
if (!user)
res.status(400).json({ msg: "user not found" })
else
res.send({active:"ok"})
})
    
})


//handle update account
router.put("/update",authMiddleware, (req, res) => {
  const { errors, isValid } = validateUpdateInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
	} else {
    User.findById(req.userId).then((user) => {
  
      bcrypt.compare(req.body.password,user.password).then((isMatch) => {
        if (isMatch) 
          return res.status(400).json({ password: "Must enter a new password" })
const modUser ={}
      if(req.body.password){
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(req.body.password, salt);
      modUser.password = hash
      }
    
      
      req.body.tel&&(modUser.tel=req.body.tel)
      req.body.address&& (modUser.address=req.body.address)
      req.body.avatar&&(modUser.avatar= req.body.avatar)
	    req.body.note&& (modUser.note=req.body.note)
	User.findByIdAndUpdate(req.userId,{$set: modUser })
	.then((user) => res.json(user))
  .catch((err) => console.log(err));
})
  
});
  }
})

// GET USERS
router.get("/",authMiddleware, (req, res) => {
  User.findById(req.userId)
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err.message);
      return res.status(403).json({"not_allowed":err.message})
    });
});

//handle login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(404).json({ email: "Email not found" });
      }

   
    //  if (user.banned===true) {
    //    return res.status(403).json({ banned_banned: "account banned" });
    //  }  
    if(!user.active)
    {
      return res.status(403).json({ active: "account inactive" });
    }    

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          fname: user.fname,
          lname:user.lname,
          role:user.role,
        
        };

        jwt.sign(payload, process.env.ACCES_TOKEN_SECRET, (err, token) => {
          user.online=true
          user.save()
          pusher.trigger('channel2', 'log', {
            'message': 'hello world'
          });  
          res.json({
            token: token,
          });
        });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });

  });

});


//handle log out
router.put("/logout",authMiddleware, (req, res) => {

User.findByIdAndUpdate(req.userId,{$set:{online:req.body.online}})
.then(user=>{
  pusher.trigger('channel2', 'log', {
    'message': 'hello world'
  });  
  res.send("logout")})


})

// get myevents
router.get('/all/events',authMiddleware,(req,res)=>{
  User.findById(req.userId) 
  .populate("events")
  .exec((err,users)=>{
if(err) 

return res.status(422).json({error:err.message})

res.status(200).send(users)

  })
})
        
//add follower
router.put('/add/follow',authMiddleware,(req,res)=>{
User.findByIdAndUpdate(req.userId,{$push:{follow:req.body.follow}})
.then(user=>{
  // console.log(user)
  res.status(202).send({follow:"succefully"})})
.catch(err=>res.status(500).send(err.message))


})
//remove follower
router.put('/remove/follow',authMiddleware,(req,res)=>{
  User.findByIdAndUpdate(req.userId,{$pull:{follow:req.body.follow}})
  .then(user=>{
    // console.log(user)
    res.status(202).send({unfollow:"succefully"})})
  .catch(err=>res.status(500).send(err.message))
  
  
  })

//block user
router.put("/add/block",authMiddleware, (req, res) => {

  User.findByIdAndUpdate(req.userId,{$push:{blocked:req.body.blocked}})
  .then(user=>{
    pusher.trigger('block', 'log', {
      'message': 'hello world'
    });  
    res.send("blocked")})
  
  
  })

  //unblock user
router.put("/remove/block",authMiddleware, (req, res) => {

  User.findByIdAndUpdate(req.userId,{$pull:{blocked:req.body.blocked}})
  .then(user=>{
    pusher.trigger('block', 'log', {
      'message': 'hello world'
    });  
    res.send("unblocked")})
  
  
  })


module.exports = router;
