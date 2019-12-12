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


articleRouter
  .route('/oven')
  .all(requireAuth)
  .get((req, res, next) => {
    //console.log(req.user)
    const db = req.app.get('db');
    ArticleService.getAllDbArticles(db)
      .then(articles => res.status(200).json(articles.map(serializeArticle)))
      .catch(next);
  });

articleRouter
  .all(requireAuth)
  .route('/')
  .get((req, res, next) => {
    
    const db = req.app.get('db');
    const id = req.user.id;
    ArticleService.getUserArticles(db, id)
      .then(articles => res.status(200).json(articles.map(serializeArticle)))
      .catch(next);
  })
  .post(requireAuth,jsonParser, (req, res, next) => {
    // console.log('####',req.user.id)
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

articleRouter
  .route('/savedarticles')
  .all(requireAuth)
  .get((req, res, next) => {
    
    const db = req.app.get('db');
    const id = req.user.id;
    ArticleService.getSavedArticles(db, id)
      .then(savedArticles => res.json(savedArticles))
      .catch(next);
  })
  .post(requireAuth,jsonParser, (req, res, next) => {
    console.log('*****')
    const{
      article_id,
      user_id
    } = req.body;
    const userArticle = {article_id,user_id}
    const db = req.app.get('db');

    ArticleService.insertSavedArticle(db, article_id,user_id)
      .then(articles => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl))
          .json(articles);
      })
    
      .catch(next);
  });

articleRouter
  .use(requireAuth)
  .route('/savedarticles/:id')
  .delete((req, res, next) => {
    console.log(req.user.id)
    const db = req.app.get('db');
    const id = req.params.id;
    const user_id=req.user.id;
    ArticleService.deleteSavedArticle(db, id,user_id)
      .then(articlesAfterDelete => {
        res.status(201)
          .json(articlesAfterDelete);
      })
      .catch(next);
  });


module.exports = articleRouter;