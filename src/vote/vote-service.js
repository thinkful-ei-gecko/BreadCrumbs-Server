const VoteService = {
  insertArticleVote(db,article_id,user_id){
    console.log('inside insertArticle',article_id,user_id)
    return db
      .insert({'article_id':article_id,'user_id':user_id})
      .into('article_vote')
      .returning('*')
      
  },


  getVoteData(db, user_id, article_id) {
    return db
      .from('article')
      .innerJoin('article_vote', 'article.id', '=', 'article_vote.article_id')
      .select('*')
      // .select('article_vote.user_id', 'article_vote.article_id', 'article.vote_count', 'article_vote.vote_type')
      .where({
        'article_vote.user_id': user_id,
        'article.id': article_id
      });  
  },

  updateVoteType(db, vote_id,newVoteType) {
    // console.log('inside updateVotetype',newVoteType)
    return db('article_vote') 
      // .from('article_vote') 
      .where({id: vote_id})
      .update({vote_type: newVoteType})
      .then();   
  },

  updateVoteCount(db, article_id, newVoteCount) {
    console.log('inside updateVoteCount',newVoteCount)
    return db('article')
      .where({id: article_id})
      .update({vote_count: newVoteCount})
      .then();
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
  
};

module.exports = VoteService;