const ArticleService = {

  getAllDbArticles(db) {
    return db
      .select('*')
      .from('article');
  },
  insertArticle(db, savedArticle,user_id) {
    console.log(user_id)
    return db
      .insert(savedArticle)
      .into('article')
      .returning('*')
      .then(()=>ArticleService.getAllDbArticles(db));
  },
 
  deleteSavedArticle(db, id,user_id) {
    return db
      .from('save')
      .where({ id })
      .delete()
      .then(()=>ArticleService.getSavedArticles(db,user_id))
  },
  getSavedArticles(db, user_id) {
    return db
      .select('*','save.id')
      .from('save')
      .fullOuterJoin('article','save.article_id', '=', 'article.id')
      .where('save.user_id', user_id);
      
  },

  insertSavedArticle(db, article_id,user_id) {
    return db
      .insert({article_id:article_id,user_id:user_id})
      .into('save')
      .returning('*')
      .then();
  },
};

module.exports = ArticleService;