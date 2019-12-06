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
    // .select('article.id', 'article.vote_count', 'article.author', 'article.title', 'article.description', 'article.source_name', 'article.url', 'article.url_to_image', 'article.publish_at', 'article.content', 'article.posted_at', 'save.date_saved', 'save.user_id')
    //.where('save.user_id', id)
    .orderBy('save.date_saved', 'desc');
  }
}
module.exports = SaveService