/* jslint node: true */
/* jshint esversion: 6 */

module.exports = {
  getUserByUsername: function(username, db) {
    return db.query("SELECT * FROM `members` WHERE `username` = ?", username);
  }
};
