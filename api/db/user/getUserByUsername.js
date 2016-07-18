/* jslint node: true */
/* jshint esversion: 6 */

const db = require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js');

module.exports = {
  getUserByUsername: function(username) {
    return new Promise(function(resolve, reject) {
      return db.conn.query("SELECT * FROM `members` WHERE `username` = ?", username, function(err, res) {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      });
    })
    .catch(function(err) {
      throw err;
    });
  }
};
