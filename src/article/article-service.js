const ArticleService = {

    getOvenArticles(db) {
      return db
        .from('article')
        .leftJoin('bake', 'bake.article_id', '=', 'article.id')
        //.select('*')
        .select('article.id', 'article.vote_count', 'article.author', 'article.title', 'article.description', 'article.source_name', 'article.url', 'article.url_to_image', 'article.publish_at', 'article.content', 'article.posted_at', 'bake.date_baked', 'bake.user_id')
        //.where('bake.article_id', 'article.id')
        .orderBy('article.vote_count', 'desc');
    },
    // getUserArticles(db, user_id) {
    //   return db
    //     .from('article')
    //     .select('*')
    //     .where('article.user_id', user_id);
    // },
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