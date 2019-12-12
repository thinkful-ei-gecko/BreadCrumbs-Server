const SaveService = {
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
  deleteSavedArticle(db, id,user_id) {
    return db
      .from('save')
      .where({ id })
      .delete()
      .then(()=>SaveService.getSavedArticles(db,user_id))
  },

}
module.exports = SaveService;