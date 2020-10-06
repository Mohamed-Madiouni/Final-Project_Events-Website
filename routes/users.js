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
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    }
  });
});

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

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          fname: user.fname,
          lname:user.lname,
          role:user.role,
        
        };

        jwt.sign(payload, process.env.ACCES_TOKEN_SECRET, (err, token) => {
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

module.exports = router;
