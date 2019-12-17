const express = require('express');
const path = require('path');
const xss = require('xss');
const ArticleService = require('./article-service');
const { requireAuth } = require('../middleware/jwt-auth');

const articleRouter = express.Router();
const jsonParser = express.json();

const serializeArticle = article => ({
  id: article.id,
  vote_count:article.vote_count,
  author: xss(article.author),
  title: xss(article.title),
  description: xss(article.description),
  source_name: xss(article.source_name),
  url: xss(article.url),
  url_to_image: xss(article.url_to_image),
  posted_at:article.posted_at,
  publish_at: article.publish_at,
  content: xss(article.content),
});

//Getting articles from the database
articleRouter
  .route('/oven')
  .all(requireAuth)
  .get((req, res, next) => {
    const db = req.app.get('db');
    ArticleService.getAllDbArticles(db)
      .then(articles => res.status(200).json(articles.map(serializeArticle)))
      .catch(next);
  });
//Saving articles into the database
articleRouter
  .all(requireAuth)
  .route('/')
  .post(requireAuth,jsonParser, (req, res, next) => {
    const {
      author,
      title,
      description,
      source_name,
      url,
      url_to_image,
      publish_at,
      content
    } = req.body;
    
    const savedArticle = {
      author,
      title,
      description,
      source_name,
      url,
      url_to_image,
      publish_at,
      content
    };

    const db = req.app.get('db');

    ArticleService.insertArticle(db, savedArticle,req.user.id)
      .then(articles => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl))
          .json(articles.map(serializeArticle));
      })
      .catch(next);
  });




module.exports = articleRouter;