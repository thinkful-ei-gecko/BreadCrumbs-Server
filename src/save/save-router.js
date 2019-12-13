const express = require('express');
const path = require('path');
const { requireAuth } = require('../middleware/jwt-auth');
const SaveService = require('../save/save-service');

const saveRouter = express.Router();
const jsonParser = express.json();

saveRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    
    const db = req.app.get('db');
    const id = req.user.id;
    SaveService.getSavedArticles(db, id)
      .then(savedArticles => res.json(savedArticles))
      .catch(next);
  })
  .post(requireAuth,jsonParser, (req, res, next) => {
    const{
      article_id,
      user_id
    } = req.body;
    const userArticle = {article_id,user_id};
    const db = req.app.get('db');

    SaveService.insertSavedArticle(db, article_id,user_id)
      .then(articles => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl))
          .json(articles);
      })
    
      .catch(next);
  });

saveRouter
  .use(requireAuth)
  .route('/:id')
  .delete((req, res, next) => {
    const db = req.app.get('db');
    const id = req.params.id;
    const user_id=req.user.id;
    SaveService.deleteSavedArticle(db, id,user_id)
      .then(articlesAfterDelete => {
        res.status(201)
          .json(articlesAfterDelete);
      })
      .catch(next);
  });


module.exports = saveRouter;