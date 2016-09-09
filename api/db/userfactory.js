/* jslint node: true */
/* jshint esversion: 6 */

'use strict';

const getDbUserByEmail = require('./user/getUserByEmail.js'),
      getDbUserByUsername = require('./user/getUserByUsername.js');

let getUserByEmail = function (email) {
  let db = require('./db.conn.js').conn();
  return getDbUserByEmail.getUserByEmail(email, db)
  .then(function(res) {
    if (res && res.length && res[0].email) {
      return res[0];
    }
    throw 'Account not found';
  })
  .catch(function(err) {
    throw err;
  });
};

let getUserByUsername = function (username) {
  let db = require('./db.conn.js').conn();
  return getDbUserByUsername.getUserByUsername(username, db)
  .then(function(res) {
    if (res && res.length && res[0].username) {
      return res[0];
    }
    throw 'Account not found';
  })
  .catch(function(err) {
    throw err;
  });
};

module.exports = {
  getUserByEmail: getUserByEmail,
  getUserByUsername: getUserByUsername
};
