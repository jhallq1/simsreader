'use strict';

module.exports = {
  insertChapter: function (storyID, chapter, db) {
    return db.query("INSERT INTO chapters SET ?", {story_id: storyID, title: chapter.title})
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
