'use strict';

module.exports = function(chapter_id, db) {
  return db.query("SELECT * FROM `pages` WHERE `chapter_id` = ?", chapter_id)
  .then(function(res) {
    if (res && res[0].chapter_id == chapter_id) {
      return res[0].path;
    }
  });
};
