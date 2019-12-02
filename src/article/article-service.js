const ArticleService = {

    getUserArticles(db, user_id) {
      return db
        .from('article')
        .select('*')
        .where('article.user_id', user_id);
    },
    getArticleById(db, id) {
      return db
        .select('*')
        .from('article')
        .where({ id })
        .first();
    },
    insertArticle(db, savedArticle) {
      return db
        .insert(savedArticle)
        .into('article')
        .returning('*')
        .then(rows => rows[0]);
    },
    deleteArticle(db, id) {
      return db
        .from('article')
        .where({ id })
        .delete();
    }
};

module.exports = ArticleService;