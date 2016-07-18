/* jslint node: true */
/* jshint esversion: 6 */

const db = require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js');

module.exports = {
  getUserByEmail: function(email) {
    return new Promise(function(resolve, reject) {
      return db.conn.query("SELECT * FROM `members` WHERE `email` = ?", email, function(err, res) {
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
