const CommentService = {
  getAllComments(db) {
    return db
      .select('*')
      .from('comment')
  },
  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('comment')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getCommentById(db, id) {
    return db
      .from('comment')
      .select('*')
      .where('id', id)
      .first()
  },
  deleteComment(db, id) {
    return db('comment')
      .where({ id })
      .delete()
  },
  updateComment(db, id, updateFields) {
    return db('comment')
      .where({ id })
      .update(updateFields)
  }
};

module.exports = CommentService;