const mongoose = require("mongoose");
const schema = mongoose.Schema;
const NotifSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  notiftype: {
    type: String,
  },
 
state:[],


});
module.exports = mongoose.model("notification", NotifSchema);
