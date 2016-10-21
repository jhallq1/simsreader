'use strict';

module.exports = {
  getUserId: function(email, db) {
    return db.query("SELECT * FROM `members` WHERE `email` = ?", email)
    .then(function(res) {
      if (res[0] && res[0].email === email) {
        return res[0].id;
      } else {
        return "Cannot find email";
      }
    })
    .catch(function(error) {
      throw error;
    });
  }
};
