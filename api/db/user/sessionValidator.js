'use strict';

module.exports = {
  sessionValidator: function(user, db) {
    return db.query("SELECT * FROM `sessions` WHERE `session_id` = ?", user.session_id)
    .then(function(res) {
      if(res[0] && res[0].session_id === user.session_id) {
        return JSON.parse(res[0].data);
      }
    })
    .then(function(res) {
      return (user.id == res.user.id);
    })
    .catch(function(error) {
      throw "Invalid session";
    });
  }
};
