const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const VoteService = require('./vote-service');
const voteRouter = express.Router();
const jsonParser = express.json();

voteRouter
  .all(requireAuth)
  .route('/')
  .patch(jsonParser, (req, res, next) => {
    const { user_id, article_id, vote_type } = req.body;
    const db = req.app.get('db');

 
    VoteService.checkArticleVote(db,req.body.article_id,req.body.user_id)
      .then(result =>{
        if(result.length === 0 && req.body.vote_type === true){
          VoteService.insertArticleVote(db,article_id,user_id,req.body.vote_type)
            .then(()=>VoteService.incrementVoteCount(db, article_id));
        }
        if(result.length === 0 && req.body.vote_type === false){
          VoteService.insertArticleVote(db,article_id,user_id,req.body.vote_type)
            .then(()=>VoteService.decrementVoteCount(db, article_id));
        }
        
        if(result.length !== 0 && req.body.vote_type === result[0].vote_type){
          res.send();
        }
        if(result.length !== 0 && req.body.vote_type !== result[0].vote_type){
          VoteService.updateVoteType(db, result[0].id, req.body.vote_type)
            .then(()=>{
              if(req.body.vote_type === true){
                VoteService.incrementVoteCount(db, article_id)
              }
              else{
                VoteService.decrementVoteCount(db, article_id)
              }
            });
        }
      })
 

      .then(()=>{return res.status(201).send()})
      .catch(next);
  });

module.exports = voteRouter;