const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const SaveService = {

getSaveArticles(db, id) {
  return db
    .from('save')
    .where('save.user_id', id)
    .leftJoin('article', 'save.article_id', '=', 'article.id')
    .select('*')
    .orderBy('save.date_saved', 'desc');
  }
}
module.exports = SaveService