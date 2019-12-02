const express = require('express');
const { requireAuth } = require("../middleware/jwt-auth");
const VoteService = require('./vote-service')

const voteRouter = express.Router();
const jsonParser = express.json();

// voteRouter
//   .use(requireAuth)
//   .route('/')