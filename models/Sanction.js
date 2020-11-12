const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
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
