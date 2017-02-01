'use strict';

module.exports = function(story_id, db) {
  return db.query("SELECT * FROM `stories` WHERE `id` = ?", story_id)
  .then(function(res) {
    if (res[0] && res[0].id == story_id) {
      return res[0];
    }
  })
  .catch(function(error) {
    throw error;
  });
};
