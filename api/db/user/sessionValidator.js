'use strict';

module.exports = {
  sessionValidator: function(user, sid, db) {
    return db.query("SELECT * FROM `sessions` WHERE `session_id` = ?", sid)
    .then(function(res) {
      if(res[0] && res[0].session_id === sid) {
        return JSON.parse(res[0].data);
      }
    })
    .then(function(res) {
      return user.id == res.user.id;
    })
    .catch(function(error) {
      throw "Invalid session";
    });
  }
};
