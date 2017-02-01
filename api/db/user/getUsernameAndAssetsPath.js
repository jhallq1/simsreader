'use strict';

module.exports = function(id, db) {
  return db.query('SELECT * FROM `members` WHERE `id` = ?', id)
  .then(function(res) {
    if (res && res[0].id == id) {
      return {username: res[0].username, assets_path: res[0].assets_path};
    }
  });
};
