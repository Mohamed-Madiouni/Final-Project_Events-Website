const mongoose = require("mongoose");
require("dotenv").config();

module.exports = ()=> mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false},
  (err) => {
    if (err) throw console.log(err.message) ;
    console.log("database connected....")
  }
);
