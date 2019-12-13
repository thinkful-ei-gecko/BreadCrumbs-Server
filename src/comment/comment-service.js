const CommentService = {

  insertComment(db, newComment) {
    return db
      .insert({'article_id':newComment.article_id,'user_id':newComment.user_id,'comment':newComment.comment})
      .into('comment')
      .where({'comment.article_id':article_id})
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getCommentsForArticle(db, article_id) {
    return db
      .select('comment.id','comment.comment','comment.date_commented','comment.article_id','user.username','user.name','user.id')
      .from('comment')
      .leftJoin('user','comment.user_id', '=', 'user.id')
      .where({
        'comment.article_id':article_id
      })
      .groupBy('comment.id','user.id')
      .orderBy('comment.date_commented');
  },


};

module.exports = CommentService;