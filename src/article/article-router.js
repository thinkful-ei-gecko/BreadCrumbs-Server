const express = require('express');
const xss = require('xss');
const ArticleService = require('./article-service');
const { requireAuth } = require("../middleware/jwt-auth");

const articleRouter = express.Router();
const jsonParser = express.json();

const serializeArticle = article => ({
  id: article.id,
  user_id: article.user_id,
  upvote_count: xss(article.upvote_count),
  downvote_count: xss(article.downvote_count),
  author: xss(article.author),
  title: xss(article.title),
  description: xss(article.description),
  source_name: xss(article.source_name),
  url: xss(article.url),
  url_to_image: xss(article.url_to_image),
  publish_at: xss(article.publish_at),
  content: xss(article.content)
});

articleRouter
  .use(requireAuth)
  .route('/')
  .get((req, res, next) => {
    const db = req.app.get('db')
    ArticleService.getAllArticles(db)
      .then(articles => res.status(200).json(articles.map(serializeArticle)))
      .catch(next)
  })


  module.exports = articleRouter;