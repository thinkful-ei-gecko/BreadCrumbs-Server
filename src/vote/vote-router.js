const express = require('express');
const { requireAuth } = require("../middleware/jwt-auth");
const VoteService = require('./vote-service')

const voteRouter = express.Router();
const jsonParser = express.json();

voteRouter
  .use(requireAuth)
  .route('/')
  .patch(jsonParser, (req, res, next) => {
    const { user_id, article_id, vote_type } = req.body
    let voteValue;
    const db = req.app.get('db')
    VoteService.getArticleById(db, article_id)
      .then(article => {
        // if(vote_type !== null) {
        //   return res.status(404).json({error: {message: 'User already voted'}})
        // }
        if(vote_type === 'up') {
          voteValue = article.vote_count + 1
          VoteService.updateArticleVoteCount(db, article_id, voteValue)
            .then(() => {
              res.status(204).end()
            })
        }
        if(vote_type === 'down') {
          voteValue = article.vote_count -1
          VoteService.updateArticleVoteCount(db, article_id, voteValue)
            .then(() => {
              res.status(204).end()
            })
        }
      })
      .catch(next)
  })

module.exports = voteRouter;