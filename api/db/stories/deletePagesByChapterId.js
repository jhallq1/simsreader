'use strict';

let db,
    chapter_id,
    response = {};

module.exports = {
  deletePagesByChapterId: function (chapter_id, db) {
    return db.query("DELETE FROM pages WHERE chapter_id = ?", chapter_id)
    .then(function(res) {
      if (res) return res.affectedRows;
    })
    .catch(function(error) {
      response = {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };

      return response;
    });
  }
};
