const VoteService = {
  
  getArticleById(db, article_id) {
    return db
      .from('article')
      .select(
        '*'
      )
      .where('article.id', article_id)
      .first();
  },

  updateArticleVoteCount(db, article_id, voteValue) {
    return db
      .from('article')
      .where('article.id', article_id)
      .update({vote_count: voteValue})
    },
}

module.exports = VoteService;