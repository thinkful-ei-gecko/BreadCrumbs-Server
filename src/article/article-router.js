const express = require('express');
const path = require('path');
const xss = require('xss');
const ArticleService = require('./article-service');
const { requireAuth } = require('../middleware/jwt-auth');

const articleRouter = express.Router();
const jsonParser = express.json();

const serializeArticle = article => ({
  id: article.id,
  user_id: article.user_id,
  date_baked: xss(article.date_baked),
  vote_count: xss(article.vote_count),
  author: xss(article.author),
  title: xss(article.title),
  description: xss(article.description),
  source_name: xss(article.source_name),
  url: xss(article.url),
  url_to_image: xss(article.url_to_image),
  publish_at: xss(article.publish_at),
  content: xss(article.content),
});

// const serializeArticle = article => ({
//   id: article.id,
//   user_id: article.user_id,
//   date_baked: xss(article.date_baked),
//   date_saved:xss(article.date_baked),
//   vote_count: xss(article.vote_count),
//   author: xss(article.author),
//   title: xss(article.title),
//   description: xss(article.description),
//   source_name: xss(article.source_name),
//   url: xss(article.url),
//   url_to_image: xss(article.url_to_image),
//   publish_at: xss(article.publish_at),
//   content: xss(article.content),
// });

articleRouter
  .route('/oven')
  .get((req, res, next) => {
    const db = req.app.get('db')
    ArticleService.getOvenArticles(db)
      .then(articles => res.status(200).json(articles.map(serializeArticle)))
      .catch(next)
  })

articleRouter
  .use(requireAuth)
  .route('/')
  .get((req, res, next) => {
    const db = req.app.get('db')
    const id = req.user.id
    ArticleService.getUserArticles(db, id)
      .then(articles => res.status(200).json(articles.map(serializeArticle)))
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const {
      user_id,
      vote_count,
      author,
      title,
      description,
      source_name,
      url,
      url_to_image,
      publish_at,
      content
    } = req.body

    const savedArticle = {
      user_id,
      vote_count,
      author,
      title,
      description,
      source_name,
      url,
      url_to_image,
      publish_at,
      content
    }

    const db = req.app.get('db')

    ArticleService.insertArticle(db, savedArticle)
      .then(article => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${article.id}`))
          .json(serializeArticle(article))
      })
      .catch(next)
  });

  articleRouter
    .use(requireAuth)
    .route('/:articleId')
    .all((req, res, next) => {
      const db = req.app.get('db')
      const id = req.params.articleId
      ArticleService.getArticleById(db, id)
        .then(article => {
          if(!article) {
            return res.status(404).json({error: {message: 'Article does not exist'}})
          }
          res.article = article
          next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.status(200).json(res.article)
    })
    .delete((req, res, next) => {
      const db = req.app.get('db')
      const id = req.params.articleId

      ArticleService.deleteArticle(db, id)
        .then(() => {
          
        })
        .catch(next)
    });


  module.exports = articleRouter;