'use strict';

module.exports = function(db) {
  return db.query(`SELECT s.id, s.title, s.description, s.views, s.age_restricted FROM stories AS s INNER JOIN chapters AS c ON s.ID = c.story_id WHERE c.published = 1 GROUP BY s.id`)
  .then(function(res) {
    if (res && res.length) {
      return res;
    }
  })
  .catch(function(error) {
    throw error;
  });
};
