const ArticleService = {

    getAllArticles(db) {
      return db
        .select('*')
        .from('article');
    },
    
}

module.exports = ArticleService;