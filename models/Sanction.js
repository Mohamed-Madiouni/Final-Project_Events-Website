const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  }, 
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
  author: {
    type: String,
    required: true,
  }, 
  canceled: {
    type: Boolean,
    default: false
  },
  cancelauthor: {
    type: String,
  }, 
  cancelreason: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  cancelled_at: {
    type: Date,
  },
});

module.exports = mongoose.model("saction", userSchema);
