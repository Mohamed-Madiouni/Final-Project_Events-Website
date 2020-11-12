const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  type: {
    type: String,
    defauly: "Alert"
  },
  duration: {
    type: String,
    defauly: "1"
  },
  reason: {
    type: String,
    defauly: "test"
  },
  email: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("saction", userSchema);
