const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  }, 
  type: {
    type: String,
    default: "Alert"
  },
  duration: {
    type: String,
    default: "1"
  },
  reason: {
    type: String,
    default: "test"
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("saction", userSchema);
