const express = require('express');
const path = require('path');
const xss = require('xss');
const CommentService = require('./comment-service');
const { requireAuth } = require('../middleware/jwt-auth');

const commentRouter = express.Router();
const jsonParser = express.json();

const serializeComment = comment => ({
  id: comment.id,
  user_id: comment.user_id,
  vote_count:comment.vote_count,
  mold_count: xss(comment.mold_count),
  date_commented: xss(comment.date_commented),
  comment: xss(comment.comment),
  article_id: xss(comment.article_id),
});


commentRouter.route('/:article_id')
  .all(requireAuth)
  .get((req, res, next) => {
    CommentService.getCommentsForArticle(
      req.app.get('db'),
      req.params.article_id
    )
      .then(comments => {
        res.status(200).json(comments);
      })
      .catch(next);
  });

commentRouter
  .all(requireAuth)
  .route('/')
  .post(requireAuth,jsonParser, (req, res, next) => {
    const {
      user_id,
      comment,
      article_id
    } = req.body;

    const newcomment = {
      user_id,
      comment,
      article_id
    };

    const db = req.app.get('db');

    CommentService.insertComment(db, newcomment)
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${comment.id}`))
          .json(serializeComment(comment));
      })
      .catch(next);
  });




module.exports = commentRouter;