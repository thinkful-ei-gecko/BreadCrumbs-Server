const VoteService = {
  
  getVote(db, article_id) {
    return db
      .from('article_vote')
      .returning(
        '*'
      )
      .where('article_vote.article_id', article_id);
  },

  updateArticleVoteCount(db, article_id, voteValue) {
    return db
      .from('article')
      .where('article.id', article_id)
      .update({vote_count: voteValue})
    },
}

module.exports = VoteService;