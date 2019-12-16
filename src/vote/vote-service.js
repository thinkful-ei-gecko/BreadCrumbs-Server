const VoteService = {
  checkArticleVote(db,article_id,user_id){
    return db
      .from('article_vote')
      .select('*')
      .where({
        'article_vote.article_id':article_id,
        'article_vote.user_id':user_id
      });
  },

  insertArticleVote(db,article_id,user_id,vote_type){
    return db
      .insert({'article_id':article_id,'user_id':user_id,'vote_type':vote_type})
      .into('article_vote')
      .returning('*')
      
  },

  updateVoteType(db, vote_id,newVoteType) {
    return db('article_vote') 
      .where({id: vote_id})
      .update({vote_type: newVoteType})
      .then();   
  },

  incrementVoteCount(db, article_id) {
    return db('article')
      .where({id: article_id})
      .increment('vote_count', 1)
      .then();
  },

  decrementVoteCount(db, article_id) {
    return db('article')
      .where({id: article_id})
      .decrement('vote_count', 1)
      .then();
  },
};

module.exports = VoteService;