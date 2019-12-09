const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const VoteService = require('./vote-service');

const voteRouter = express.Router();
const jsonParser = express.json();

voteRouter
  .all(requireAuth)
  .route('/')
  .patch(jsonParser, (req, res, next) => {
    console.log(req.body.vote_type)
    console.log(req.body.user_id)
    console.log(req.body.article_id)
    const { user_id, article_id, vote_type } = req.body;
    const db = req.app.get('db');

    let oldVoteType;
    let newVoteCount;
    let newVoteType;
    let vote_id;

    VoteService.insertArticleVote(db,article_id,user_id)
      .then(()=>VoteService.getVoteData(db, user_id, article_id))
      .then(vote => {
        console.log(vote)
        oldVoteType = vote[0].vote_type;
        newVoteCount = vote[0].vote_count;
        newVoteType = req.body.vote_type;
        vote_id = vote[0].id;
  
        if(oldVoteType === null) {
          if(newVoteType === true) {
            newVoteCount++;
          }
          if(vote_type === false) {
            newVoteCount--;
          }
        }
        if(oldVoteType === true) {
          if(newVoteType === false) {
            newVoteCount=newVoteCount-2;
          }
          if(newVoteType === true) {
            newvotecount++;
            // return res.status(404).json({error: {message: 'User already voted'}});
          }
        }
        if(oldVoteType === false) {
          if(newVoteType === true) {
            newVoteCount=newVoteCount+2;
          }
          if(newVoteType === false) {
            newvotecount--;
            // return res.status(404).json({error: {message: 'User already voted'}});
          }
        }  
        
        // console.log('oldVoteType',oldVoteType)
        // console.log('newVoteCount',newVoteCount)
        // console.log('newVoteType',newVoteType)

        VoteService.updateVoteType(db, vote_id, newVoteType)
        VoteService.updateVoteCount(db, article_id, newVoteCount)      
      })

      .then(() => 
        VoteService.getVoteData(db, user_id, article_id))
      .then(newVote=>console.log('++++++',newVote))
  

      .catch(next);
  });

module.exports = voteRouter;