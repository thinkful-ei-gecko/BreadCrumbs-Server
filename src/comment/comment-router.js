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

commentRouter
  .use(requireAuth)
  .route('/')
  .get((req, res, next) => {
    const db = req.app.get('db');
    const id = req.user.id;
    CommentService.getUserComments(db, id)
      .then(comments => res.status(200).json(comments.map(serializeComment)))
      .catch(next);
  })
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

commentRouter
  .use(requireAuth)
  .route('/:commentId')
  .all((req, res, next) => {
    const db = req.app.get('db');
    const id = req.params.commentId;
    CommentService.getcommentById(db, id)
      .then(comment => {
        if(!comment) {
          return res.status(404).json({error: {message: 'comment does not exist'}});
        }
        res.comment = comment;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.status(200).json(res.comment);
  })
  .delete((req, res, next) => {
    const db = req.app.get('db');
    const id = req.params.commentId;

    CommentService.deletecomment(db, id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });
commentRouter.route('/:article_id/comments/')
  .all(requireAuth)
  .get((req, res, next) => {
    CommentService.getCommentsForArticle(
      req.app.get('db'),
      req.params.article_id
    )
      .then(comments => {
        res.json(comments);
      })
      .catch(next);
  });

module.exports = commentRouter;