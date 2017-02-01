'use strict';

module.exports = function(db) {
  return db.query("SELECT * FROM `stories`")
  .then(function(res) {
    if (res && res.length) {
      return res;
    }
  })
  .catch(function(error) {
    throw error;
  });
};
