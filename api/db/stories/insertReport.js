'use strict';

module.exports = function(story_id, chapter_id, comment_id, flags, explanation, db) {
  return db.query("INSERT INTO reports SET ?", {story_id: story_id, chapter_id: chapter_id, comment_id: comment_id, flags: flags.toString(), explanation: explanation})
  .then(function(res) {
    if (res.affectedRows === 1) {
      return res.insertId;
    }
  })
  .catch(function(error) {
    throw error;
  });
};
