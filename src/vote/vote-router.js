const express = require('express');
const { requireAuth } = require("../middleware/jwt-auth");
const VoteService = require('./vote-service');
const ArticleService = require('../article/article-service');

const voteRouter = express.Router();
const jsonParser = express.json();

voteRouter
.all(requireAuth)
.route('/')
.patch(jsonParser, (req, res, next) => {
  const { user_id, article_id, vote_type } = req.body
  const db = req.app.get('db')

  let oldVoteType;
  let newVoteCount;
  let newVoteType;

  // console.log(oldVoteType)
  // console.log(vote[0].vote_type)
  // console.log(newVoteCount)
  // console.log(vote[0].vote_count)
  // console.log(newVoteType)
  // console.log(req.body.vote_type)

  VoteService.getVoteData(db, user_id, article_id)
    .then(vote => {
      oldVoteType = vote[0].vote_type
      newVoteCount = vote[0].vote_count
      newVoteType = req.body.vote_type
      console.log(oldVoteType)

      // console.log(oldVoteType)
      // console.log(vote[0].vote_type)
      // console.log(newVoteCount)
      // console.log(vote[0].vote_count)
      // console.log(newVoteType)
      // console.log(req.body.vote_type)
  

      if(oldVoteType === null) {
        if(newVoteType === true) {
          newVoteCount++
        }
        if(vote_type === false) {
          newVoteCount--
        }
      }
      if(oldVoteType === true) {
        if(newVoteType === false) {
          newVoteCount-2
        }
        if(newVoteType === true) {
          return res.status(404).json({error: {message: 'User already voted'}})
        }
      }
      if(oldVoteType === false) {
        if(newVoteType === true) {
          newVoteCount+2
        }
        if(newVoteType === false) {
          return res.status(404).json({error: {message: 'User already voted'}})
        }
      }  
      
      // console.log(oldVoteType)
      // console.log(newVoteCount)
      // console.log(newVoteType)

      // VoteService.updateVoteCount(db, user_id, article_id, newVoteCount)
      // .then()
      VoteService.updateVoteType(db, user_id, article_id, newVoteType)
      .then(data => {
        console.log(data)
        res.status(200).json(data)
      })

    })
   
    


    // console.log(oldVoteType)
    // console.log(vote[0].vote_type)
    // console.log(newVoteCount)
    // console.log(vote[0].vote_count)
    // console.log(newVoteType)
    // console.log(req.body.vote_type)

    


  .catch(next)
})

module.exports = voteRouter;
