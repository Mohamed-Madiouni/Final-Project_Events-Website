require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

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
        name: req.body.name,
        email: req.body.email,
        password: hash,
        tel:req.body.tel,
        address:req.body.address
      });
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    }
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
      return res.status(404).json({ OOPS: "Email not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          role:user.role
        };

        jwt.sign(payload, process.env.ACCES_TOKEN_SECRET, (err, token) => {
          res.json({
            success: true,
            token: token,
          });
        });
      } else {
        return res.status(400).json({ ERROR: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
