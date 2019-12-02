const ArticleService = {

    getAllArticles(db) {
      return db
        .select('*')
        .from('article');
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