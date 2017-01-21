'use strict';

module.exports = {
  getChapterId: function(story_id, chapter_index, db) {
    return db.query(`SELECT c.id FROM chapters AS c JOIN stories AS s ON s.id = c.story_id WHERE c.story_id = ${story_id} ORDER BY c.id`)
    .then(function(res) {
      if (res.length) {
        return res[chapter_index - 1].id;
      }

      return "Cannot locate story";
    })
    .catch(function(error) {
      throw error;
    });
  }
};
