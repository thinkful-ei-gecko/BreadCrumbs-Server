const CommentService = {

  insertComment(db, user_id, comment, article_id) {
    return db
      .insert({ 'user_id':user_id, 'comment':comment, 'article_id':article_id })
      .into('comment')
      .where({ 'comment.article_id':article_id })
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