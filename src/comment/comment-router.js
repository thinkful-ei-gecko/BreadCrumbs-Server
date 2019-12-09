const path = require('path');
const express = require('express');
const xss = require('xss');
const CommentService = require('./comment-service');

const commentRouter = express.Router();
const jsonParser = express.json();

const serializeComment = comment => ({
  id: comment.id,
  user_id: comment.user_id,
  article_id: comment.article_id,
  date_commented: comment.date_commented,
  comment: xss(comment.comment)
})

commentRouter
  .route('/')
  .get((req, res, next) => {
    const db = req.app.get('db')
    CommentService.getAllComments(db)
      .then(comments => {
        res.json(comments.map(serializeComment))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    
  })