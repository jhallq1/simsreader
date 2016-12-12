'use strict';

module.exports = {
  insertComment: function(userID, chapterID, comment, db) {
    return db.query("INSERT INTO comments SET ?", {user_id: userID, chapter_id: chapterID, text: comment.text, rating: comment.rating})
    .then(function(response) {
      if (response && response.affectedRows === 1) {
        return response.insertId;
      }
    })
    .catch(function(error) {
      throw {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  }
};
