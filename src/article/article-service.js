const ArticleService = {

  getAllDbArticles(db) {
    return db
      .select('*')
      .from('article')
      .orderBy('vote_count', 'desc');
  },
  insertArticle(db, savedArticle,user_id) {
    return db
      .insert(savedArticle)
      .into('article')
      .returning('*')
      .then(()=>ArticleService.getAllDbArticles(db))
      
  },
 
};

module.exports = ArticleService;