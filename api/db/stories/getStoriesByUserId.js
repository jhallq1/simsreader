'use strict';

module.exports = {
  getStoriesByUserId: function(user, db) {
    return db.query("SELECT * FROM `stories` WHERE `user_id` = ?", user.id)
    .then(function(res) {
      if (res[0] && res[0].user_id === user.id) {
        return res;
      } else {
        return {
          log: "info",
          send: true,
          msg: "User has not created any stories",
          stories: []
        };
      }
    })
    .catch(function(error) {
      throw error;
    });
  }
};
