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
  let vote_id;

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
      vote_id = vote[0].id
  

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

      return vote
      // console.log(oldVoteType)
      // console.log(newVoteCount)
      // console.log(newVoteType)

      // VoteService.updateVoteCount(db, user_id, article_id, newVoteCount)
      // .then()
      
      // VoteService.updateVoteType(db, user_id, article_id, newVoteType)
      // .then(data => {
      //   res.status(200).json(data)
      // })
    })


    .then(vote => {
      VoteService.updateVoteType(db, vote_id, newVoteType)
      return vote
    })
    .then(vote => {
      VoteService.updateVoteCount(db, article_id, newVoteCount)
      return vote
    })
    .then(res => 
      VoteService.getVoteData(db, user_id, article_id)
      
    )
   
    


    // console.log(oldVoteType)
    // console.log(vote[0].vote_type)
    // console.log(newVoteCount)
    // console.log(vote[0].vote_count)
    // console.log(newVoteType)
    // console.log(req.body.vote_type)

    


  .catch(next)
})


voteRouter
.all(requireAuth)
.route('/test')
.patch(jsonParser, (req, res, next) => {
  //const { user_id, article_id, vote_type } = req.body
  const db = req.app.get('db')
  let user_id = 'a2424f48-132a-435c-8488-d1fc00d7afef'
  let article_id = 'a1385155-5a02-4f8a-bfdc-e3a5379dbea0'
  let newVoteCount = 999
  VoteService.updateVoteCount(db, user_id, article_id, newVoteCount)
  .then(update => {
    res.status(200).json(update)
  })
  console.log(user_id)
  console.log(article_id)
  console.log(newVoteCount)
  return 

})


module.exports = voteRouter;
