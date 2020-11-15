const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: "/user_icon.png",
  },
  events: [{ type: mongoose.Types.ObjectId, ref: "event" }],
  cancelation :[{
    type:mongoose.Types.ObjectId
  }],
  banned:{
    type: Boolean,
    required: true,
    default: false
  },
  alerted_date:{
    type:Date
  },
  likes:[String],
  dislikes:[String],
  reports:[String],
  follow:[{type: mongoose.Types.ObjectId, ref: "user" }],
  online:{
    type:Boolean,
    default:false
  },
  note: {
    type: String,
    required: true,
    default: "Hi it's me"
  },
  blocked:[]
});

module.exports = mongoose.model("user", userSchema);
