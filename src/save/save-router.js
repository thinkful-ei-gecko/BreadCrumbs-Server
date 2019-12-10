const express = require('express');
const path = require('path');
const xss = require('xss');
const { requireAuth } = require("../middleware/jwt-auth");
const SaveService = require('../save/save-service');

const saveRouter = express.Router();
const jsonParser = express.json();

const serializeArticle = article => ({
  id: article.id,
  user_id: article.user_id,
  date_saved:xss(article.date_saved),
  vote_count: article.vote_count,
  author: xss(article.author),
  title: xss(article.title),
  description: xss(article.description),
  source_name: xss(article.source_name),
  url: xss(article.url),
  url_to_image: xss(article.url_to_image),
  publish_at: xss(article.publish_at),
  content: xss(article.content),
});

saveRouter
  .use(requireAuth)
  .route('/')
  .get((req, res, next) => {
    const db = req.app.get('db')
    const id = req.user.id
    console.log(id)
    SaveService.getSaveArticles(db, id)
      .then(save => res.status(200).json(save.map(serializeArticle)))
      .catch(next)
  })

module.exports = saveRouter;