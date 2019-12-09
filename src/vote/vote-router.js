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
    let voteValue;
    const db = req.app.get('db')
    let voteStatus = VoteService.getVote(db, article_id)
      .then(res => res.json())
    ArticleService.getUserArticles(db, user_id)
      .then(articles => articles.filter(art => {
        art.id === article_id
      if(voteStatus.vote_type === null) {
          if(vote_type === 'up') {
            voteValue = art.vote_count + 1
            VoteService.updateArticleVoteCount(db, article_id, voteValue)
              .then(() => {
                res.status(204).end()
              })
          }
          if(vote_type === 'down') {
            voteValue = art.vote_count -1
            VoteService.updateArticleVoteCount(db, article_id, voteValue)
              .then(() => {
                res.status(204).end()
              })
          }
      }
    }))
      return res.status(404).json({error: {message: 'User already voted'}})
    
    .catch(next)
  })

module.exports = voteRouter;