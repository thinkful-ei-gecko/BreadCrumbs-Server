const VoteService = {
  


  getVoteData(db, user_id, article_id) {
    return db
      .from('article')
      .innerJoin('article_vote', 'article.id', '=', 'article_vote.article_id')
      .select('*')
      // .select('article_vote.user_id', 'article_vote.article_id', 'article.vote_count', 'article_vote.vote_type')
      .where({
        'article_vote.user_id': user_id,
        'article.id': article_id
      })  
    },

  updateVoteType(db, vote_id, newVoteType) {
    return db
      .from('article_vote') 
      .where({ 'id': vote_id })
      .update('article.vote_type', newVoteType)    
    },

  updateVoteCount(db, user_id, article_id, newVoteCount) {
    return db
      .from('article')
      .where({  'article.id': article_id })
      .update('article_vote.vote_count', newVoteCount)
    },

  //  updateVoteData(db, user_id, article_id, newVoteType, newVoteCount){
  //    await db
  //   this.updateVoteType(db, user_id, article_id, newVoteType);
  //   return await this.updateVoteCount(db, user_id, article_id, newVoteCount);

  //  }


  

  // updateVoteData(db, user_id, article_id, newVoteCount, newVoteType) {
  //   return db
  //     .from('article_vote')
  //     .where({
  //       'article_vote.user_id': user_id,
  //       'article.id': article_id
  //     })
  //     .leftJoin('article', 'article_vote.article_id', '=', 'article.id')
  //     .update({
  //       'article.vote_count': newVoteCount,
  //       'article_save.vote_type': newVoteType
  //     })
  //   },
  
}

module.exports = VoteService;