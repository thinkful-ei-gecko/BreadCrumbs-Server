const ArticleService = {

  getAllDbArticles(db) {
    return db
      .select('*')
      .from('article');
  },
  getUserArticles(db, user_id) {
    return db
      .from('article')
      .select('*')
      .where('article.user_id', user_id)
      .orderBy('vote_count', 'desc');
  },
  getArticleById(db, id) {
    return db
      .select('*')
      .from('article')
      .where({ id })
      .first();
  },
  insertArticle(db, savedArticle,user_id) {
    console.log(user_id)
    return db
      .insert(savedArticle)
      .into('article')
      .returning('*')
      .then(()=>ArticleService.getAllDbArticles(db));
  },
 
  deleteArticle(db, id) {
    return db
      .from('article')
      .where({ id })
      .delete();
  }
};

module.exports = ArticleService;