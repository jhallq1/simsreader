'use strict';

module.exports = function (user, story_id, chapter_id, db) {
  return db.query(`SELECT p.id, p.chapter_id, p.caption, p.path FROM pages AS p JOIN chapters AS c ON c.id = p.chapter_id WHERE c.id = ${chapter_id} ORDER BY p.id`)
  .then(function(res) {
    if (res.length && res[0].chapter_id == chapter_id) {
      return res;
    } else {
      return 0;
    }
  })
  .catch(function(error) {
    throw error;
  });
};
