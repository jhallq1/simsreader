'use strict';

module.exports = {
  getChapters: function (story_id, db) {
    return db.query("SELECT * FROM `chapters` WHERE `story_id` = ?", story_id)
    .then(function(res) {
      if (res[0] && res[0].story_id == story_id) {
        return res;
      } else {
        return "This story does not contain any chapters";
      }
    })
    .catch(function(error) {
      throw error;
    });
  }
};
