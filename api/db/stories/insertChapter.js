'use strict';

module.exports = {
  insertChapter: function (story_id, chapter_title, db) {
    return db.query("INSERT INTO chapters SET ?", {story_id: story_id, title: chapter_title})
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
