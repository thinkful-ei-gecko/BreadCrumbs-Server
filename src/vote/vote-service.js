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
      .where({
        'article_vote.user_id': user_id,
        'article.id': article_id
      });  
  },

  updateVoteType(db, vote_id,newVoteType) {
    return db('article_vote') 
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
};

module.exports = VoteService;