'use strict';

let db,
    response = {},
    path;

module.exports = {
  deletePagesByChapterId: function (chapter_id, db) {
    return db.query("DELETE FROM pages WHERE chapter_id = ?", chapter_id)
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
