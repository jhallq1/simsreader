'use strict';

module.exports = {
  getStoryId: function(story_title, user_id, db) {
    return db.query("SELECT id FROM `stories` WHERE `title` = ? AND `user_id` = ?", [story_title, user_id])
    .then(function(res) {
      if (res.length) {
        return res[0].id;
      } else {
        return "Cannot locate story";
      }
    })
    .catch(function(error) {
      throw error;
    });
  }
};
