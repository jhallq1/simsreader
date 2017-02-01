'use strict';

module.exports = function(story_id, db) {
  return db.query("UPDATE stories SET views = views + 1 WHERE id = ?", story_id)
  .catch(function(error) {
    throw error;
  });
};
