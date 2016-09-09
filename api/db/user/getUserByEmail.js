/* jslint node: true */
/* jshint esversion: 6 */

module.exports = {
  getUserByEmail: function (email, db) {
    return db.query("SELECT * FROM `members` WHERE `email` = ?", email);
  }
};
