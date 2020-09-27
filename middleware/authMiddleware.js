const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

  let token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "You are not authorized!" });
  }

  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, payload) => {
    if (err) {
      throw err;
    }

    req.userId = payload.id;
    
    next();
  });
};
