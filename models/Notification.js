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
  state: {
    type: Boolean,
    required: true,
    default: false,
  },
  counter: {
    type: Number,
    required: true,
    default: 0,
  },
});
module.exports = mongoose.model("notification", NotifSchema);
