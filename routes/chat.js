const express = require("express")
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')
const Chat = require('../models/Chat')
const authMiddleware = require("../middleware/authMiddleware");
var Pusher = require('pusher');
require("dotenv").config();

var pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: 'eu',
  useTLS: true,
});